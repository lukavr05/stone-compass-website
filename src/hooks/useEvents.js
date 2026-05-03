import { useState } from "react";

const defaultEvents = [
  {
    id: "1",
    title: "Far East Festival 2025",
    date: "2026-05-30",
    time: "21:00",
    doors: "19:00",
    venue: "TBA",
    location: "London, UK",
    ticketUrl: "https://bit.ly/3QXkKeP",
    featured: true,
  },
];

export function useEvents() {
  const [events, setEvents] = useState(defaultEvents);

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
      prev.map((event) => (event.id === id ? { ...event, ...updates } : event)),
    );
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const featuredEvent =
    events.length > 0 ? events.find((e) => e.featured) || events[0] : null;

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    featuredEvent,
  };
}

export default useEvents;
