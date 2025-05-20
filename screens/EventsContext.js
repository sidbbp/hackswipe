import React, { createContext, useState } from 'react';
import supabase from '../supabase';

export const EventsContext = createContext();

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const EventsProvider = ({ children }) => {
  const [savedEvents, setSavedEvents] = useState([]);

  const saveEvent = async (event) => {
    const userId = generateUUID(); // Replace with actual user UUID from auth

    // Flatten hackathons object if present
    const hack = event.hackathons || {};
    const eventToInsert = {
      id: event.id,
      name: hack.name || event.name,
      start_date: hack.start_date || event.start_date,
      location: hack.location || event.location,
      imageUrl: hack.imageUrl || event.imageUrl,
      team_name: event.team_name,
      join_type: event.join_type,
      user_id: userId,
    };

    console.log('Inserting event with user_id:', userId);
    console.log('Saving event:', eventToInsert);

    let added = false;
    try {
      const { data, error } = await supabase
        .from('saved_events')
        .insert([eventToInsert])
        .select();

      if (error) {
        console.error('Error saving event to Supabase:', error);
      } else if (data && data.length > 0) {
        setSavedEvents(prev => Array.isArray(prev) ? [...prev, data[0]] : [data[0]]);
        added = true;
      }
    } catch (err) {
      console.error('Unexpected error saving event:', err);
    }

    // If not added from Supabase, add locally
    if (!added) {
      setSavedEvents(prev => Array.isArray(prev) ? [...prev, eventToInsert] : [eventToInsert]);
    }
  };

  return (
    <EventsContext.Provider value={{ savedEvents, setSavedEvents, saveEvent }}>
      {children}
    </EventsContext.Provider>
  );
};
