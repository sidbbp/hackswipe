import React, { createContext, useState } from 'react';

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [savedEvents, setSavedEvents] = useState([]);

  const saveEvent = (event) => {
    setSavedEvents((prev) => {
      if (prev.find(e => e.id === event.id)) return prev; // avoid duplicates
      return [...prev, event];
    });
  };

  return (
    <EventsContext.Provider value={{ savedEvents, saveEvent }}>
      {children}
    </EventsContext.Provider>
  );
};
