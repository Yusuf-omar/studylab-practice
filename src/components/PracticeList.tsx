"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [showRetry, setShowRetry] = useState(false);
  const focusAfterRetry = useRef(false);
  const filterRef = useRef<HTMLInputElement>(null);
  const requestVersion = useRef(0);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return items;

    return items.filter((item) =>
      `${item.title} ${item.description}`.toLowerCase().includes(normalized),
    );
  }, [items, query]);

  const loadItems = useCallback(
    async (isRetry = false) => {
      const version = ++requestVersion.current;
      if (isRetry) {
        focusAfterRetry.current = true;
      }

      try {
        const nextItems = await requestItems();

        if (version !== requestVersion.current) return;

        setItems(nextItems);
        setStatus("success");
      } catch {
        if (version !== requestVersion.current) return;

        setStatus("error");
        setShowRetry(true);
        focusAfterRetry.current = false;
      }
    },
    [requestItems],
  );

  useEffect(() => {
    let cancelled = false;
    const version = ++requestVersion.current;

    async function fetchItems() {
      try {
        const nextItems = await requestItems();

        if (cancelled || version !== requestVersion.current) return;

        setItems(nextItems);
        setStatus("success");
      } catch {
        if (cancelled || version !== requestVersion.current) return;

        setStatus("error");
        setShowRetry(true);
        focusAfterRetry.current = false;
      }
    }

    void fetchItems();

    return () => {
      cancelled = true;
      requestVersion.current += 1;
    };
  }, [requestItems]);

  useEffect(() => {
    if (status !== "success" || !focusAfterRetry.current) return;

    filterRef.current?.focus();
    focusAfterRetry.current = false;
  }, [status]);

  return (
    <div>
      {status === "loading" && <p role="status">Loading practice items...</p>}

      {status === "error" && <p role="alert">Failed to load practice items.</p>}

      {showRetry && status !== "success" && (
        <button
          type="button"
          aria-disabled={status === "loading"}
          onClick={() => {
            if (status !== "loading") {
              setStatus("loading");
              void loadItems(true);
            }
          }}
        >
          Retry
        </button>
      )}

      {status === "success" && (
        <>
          <div className="filter">
            <label htmlFor="practice-filter">Filter the backlog</label>
            <input
              ref={filterRef}
              id="practice-filter"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try accessible"
              type="search"
              value={query}
            />
          </div>

          {items.length === 0 ? (
            <p className="empty" role="status">
              No practice items are available.
            </p>
          ) : filteredItems.length > 0 ? (
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
