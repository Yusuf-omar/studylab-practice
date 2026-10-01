"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PracticeItem } from "@/src/data/practice-items";
import { loadPracticeItems } from "@/src/data/practice-data";

type RequestStatus = "loading" | "error" | "success";

type PracticeListProps = {
  requestItems?: () => Promise<PracticeItem[]>;
};
export function PracticeList({
  requestItems = loadPracticeItems,
}: PracticeListProps) {
  const [status, setStatus] = useState<RequestStatus>("loading");
  const [items, setItems] = useState<PracticeItem[]>([]);
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return items;

    return items.filter((item) =>
      `${item.title} ${item.description}`.toLowerCase().includes(normalized),
    );
  }, [items, query]);

  const loadItems = useCallback(async () => {
    setStatus("loading");

    try {
      const nextItems = await requestItems();
      setItems(nextItems);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [requestItems]);

  useEffect(() => {
    let cancelled = false;

    const request = async () => {
      try {
        const nextItems = await requestItems();

        if (cancelled) return;

        setItems(nextItems);
        setStatus("success");
      } catch {
        if (cancelled) return;

        setStatus("error");
      }
    };

    void request();

    return () => {
      cancelled = true;
    };
  }, [requestItems]);

  return (
    <div>
      {status === "loading" && <p role="status">Loading practice items...</p>}

      {status === "error" && (
        <div>
          <p role="alert">Failed to load practice items.</p>
          <button type="button" onClick={() => void loadItems()}>
            Retry
          </button>
        </div>
      )}

      {status === "success" && (
        <>
          <div className="filter">
            <label htmlFor="practice-filter">Filter the backlog</label>
            <input
              id="practice-filter"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “accessible”"
              type="search"
              value={query}
            />
          </div>

          {filteredItems.length ? (
            <ul className="practice-list" aria-live="polite">
              {filteredItems.map((item) => (
                <li className="practice-card" key={item.id}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <span className="status">{item.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty" role="status">
              No practice items match that filter.
            </p>
          )}
        </>
      )}
    </div>
  );
}
