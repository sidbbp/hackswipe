import { useState } from 'react';
import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';

export const useCalendar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCalendarPermission = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Calendar permission denied');
        return false;
      }
      
      return true;
    } catch (err) {
      console.error('Error requesting calendar permission:', err);
      setError('Failed to request calendar permission');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getDefaultCalendarId = async () => {
    try {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      
      // Find default calendar based on platform
      if (Platform.OS === 'ios') {
        const defaultCalendar = calendars.find(cal => cal.isPrimary) || calendars[0];
        return defaultCalendar?.id;
      } else if (Platform.OS === 'android') {
        const defaultCalendar = calendars.find(cal => cal.isPrimary && cal.allowsModifications) || 
                               calendars.find(cal => cal.allowsModifications) ||
                               calendars[0];
        return defaultCalendar?.id;
      } else {
        // Web platform
        return null; // Web will use a different approach
      }
    } catch (err) {
      console.error('Error getting calendars:', err);
      setError('Failed to get calendars');
      return null;
    }
  };

  const addEventToCalendar = async (hackathonDetails) => {
    setLoading(true);
    setError(null);
    
    try {
      // For web platform
      if (Platform.OS === 'web') {
        if ('google' in window && window.google.calendar) {
          // This is just a placeholder for web calendar API
          // In a real app, you would use the Google Calendar API or similar
          console.log('Would add to web calendar:', hackathonDetails);
          return true;
        } else {
          // Fallback to generating an iCalendar file for download
          console.log('Would generate iCal file for:', hackathonDetails);
          return true;
        }
      }
      // For mobile platforms
      else {
        const hasPermission = await getCalendarPermission();
        
        if (!hasPermission) {
          return false;
        }
        
        const calendarId = await getDefaultCalendarId();
        
        if (!calendarId) {
          setError('No calendar available');
          return false;
        }
        
        const eventDetails = {
          title: hackathonDetails.name,
          startDate: new Date(hackathonDetails.startDate),
          endDate: new Date(hackathonDetails.endDate),
          location: hackathonDetails.location,
          notes: `HackSwipe event: ${hackathonDetails.name}`,
          timeZone: 'America/Los_Angeles',
        };
        
        const eventId = await Calendar.createEventAsync(calendarId, eventDetails);
        return !!eventId;
      }
    } catch (err) {
      console.error('Error adding event to calendar:', err);
      setError('Failed to add event to calendar');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addEventToCalendar, getCalendarPermission, loading, error };
};
