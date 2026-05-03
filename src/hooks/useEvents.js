import { useState, useEffect } from 'react';

const STORAGE_KEY = 'stone-compass-events';

const defaultEvents = [];

export function useEvents() {
  const [events, setEvents] = useState(() => {
    if (typeof window === 'undefined') return defaultEvents;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultEvents;
      }
    }
    return defaultEvents;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  const updateEvent = (id, updates) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...updates } : event
      )
    );
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const featuredEvent = events.length > 0 ? events.find((e) => e.featured) || events[0] : null;

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    featuredEvent,
  };
}

export default useEvents;