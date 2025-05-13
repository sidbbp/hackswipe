import * as Calendar from 'expo-calendar';
import { Platform, Alert } from 'react-native';

/**
 * Check if the app has permission to access the device's calendar
 * @returns {Promise<boolean>} True if permission is granted, false otherwise
 */
export const checkCalendarPermission = async () => {
  try {
    const { status } = await Calendar.getCalendarPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error checking calendar permission:', error);
    return false;
  }
};

/**
 * Request permission to access the device's calendar
 * @returns {Promise<boolean>} True if permission is granted, false otherwise
 */
export const requestCalendarPermission = async () => {
  try {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Calendar Permission Required',
        'HackSwipe needs access to your calendar to add hackathon events. Please enable calendar access in your device settings.',
        [{ text: 'OK' }]
      );
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error requesting calendar permission:', error);
    return false;
  }
};

/**
 * Get the default calendar ID for the device
 * @returns {Promise<string>} Calendar ID
 */
export const getDefaultCalendarId = async () => {
  try {
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    
    // Find the default calendar for events
    const defaultCalendar = calendars.find(
      cal => 
        (Platform.OS === 'ios' && cal.source && cal.source.name === 'Default') ||
        (Platform.OS === 'android' && cal.accessLevel === Calendar.CalendarAccessLevel.OWNER)
    );
    
    if (!defaultCalendar) {
      // Use the first available calendar if no default is found
      return calendars[0]?.id;
    }
    
    return defaultCalendar.id;
  } catch (error) {
    console.error('Error getting default calendar:', error);
    throw error;
  }
};

/**
 * Add an event to the device's calendar
 * @param {Object} eventDetails - Event details
 * @param {string} eventDetails.title - Event title
 * @param {Date} eventDetails.startDate - Event start date
 * @param {Date} eventDetails.endDate - Event end date
 * @param {string} eventDetails.location - Event location
 * @param {string} eventDetails.notes - Event notes
 * @returns {Promise<Object>} Result object with success status and event ID or error
 */
export const addEventToCalendar = async (eventDetails) => {
  try {
    // First check if we have permission
    const hasPermission = await checkCalendarPermission();
    
    if (!hasPermission) {
      // Request permission
      const permissionResult = await requestCalendarPermission();
      
      if (!permissionResult) {
        return { 
          success: false, 
          error: 'Calendar permission denied' 
        };
      }
    }
    
    // Get the default calendar ID
    const calendarId = await getDefaultCalendarId();
    
    if (!calendarId) {
      return { 
        success: false, 
        error: 'No calendar available' 
      };
    }
    
    // Create the event
    const eventId = await Calendar.createEventAsync(calendarId, {
      title: eventDetails.title,
      startDate: eventDetails.startDate,
      endDate: eventDetails.endDate,
      location: eventDetails.location,
      notes: eventDetails.notes,
      timeZone: 'UTC',
      alarms: [{ relativeOffset: -60 }], // 1 hour before
    });
    
    return { success: true, eventId };
  } catch (error) {
    console.error('Error adding event to calendar:', error);
    return {
      success: false,
      error: error.message || 'Failed to add event to calendar'
    };
  }
};
