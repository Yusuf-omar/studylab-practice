"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { loadPracticeItems } from "@/src/data/practice-data";
import type { PracticeItem, PracticeStatus } from "@/src/data/practice-items";

type LoadStatus = "idle" | "loading" | "success" | "error";

export function PracticeList({
  initialItems,
}: {
  initialItems: PracticeItem[];
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | PracticeStatus>(
    "all",
  );
  const [items, setItems] = useState(initialItems);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const refreshButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    loadPracticeItems()
      .then((loadedItems) => {
        setItems(loadedItems);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  const refresh = () => {
    refreshButtonRef.current?.focus();
    setStatus("loading");
    loadPracticeItems()
      .then((loadedItems) => {
        setItems(loadedItems);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  };
  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const matchesQuery = (item: PracticeItem) =>
      `${item.title} ${item.description}`.toLowerCase().includes(normalized);

    const matchesStatus = (item: PracticeItem) =>
      statusFilter === "all" || item.status === statusFilter;
    return items.filter((item) => matchesQuery(item) && matchesStatus(item));
  }, [items, query, statusFilter]);
  return (
    <div>
      <div className="filter">
        <label htmlFor="practice-filter">Filter the backlog</label>

        <input
          id="practice-filter"
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Try "accessible"'
          type="search"
          value={query}
        />
        <label htmlFor="practice-status">Filter by status</label>
        <select
          id="practice-status"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as "all" | PracticeStatus)
          }
        >
          <option value="all">All statuses</option>
          <option value="ready">Ready</option>
          <option value="in-progress">In progress</option>
          <option value="review">Review</option>
        </select>
      </div>
      <button ref={refreshButtonRef} type="button" onClick={refresh}>
        Refresh
      </button>
      {status === "loading" && <p role="status">Loading practice items...</p>}
      {status === "error" && <p role="alert">Could not load practice items.</p>}
      {filteredItems.length > 0 && (
        <ul className="practice-list" aria-live="polite">
          {filteredItems.map((item) => (
            <li className="practice-card" key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <span className="status">{item.status}</span>
            </li>
          ))}
        </ul>
      )}
      {status === "success" && filteredItems.length === 0 && (
        <p className="empty" role="status">
          No practice items match that filter.
        </p>
      )}
    </div>
  );
}
