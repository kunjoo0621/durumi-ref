"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "durumi-ref-bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setBookmarks(new Set(JSON.parse(saved)));
    } catch {}
  }, []);

  const toggle = useCallback((url: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isBookmarked = useCallback((url: string) => bookmarks.has(url), [bookmarks]);

  return { bookmarks, toggle, isBookmarked };
}
