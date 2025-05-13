import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get these from your Supabase dashboard
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Set up supabase client with AsyncStorage for React Native
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper functions for database interactions

export const fetchHackathonsNearby = async (latitude, longitude, radius = 50) => {
  try {
    // In a real implementation, you would use PostGIS or a similar
    // spatial database to calculate distances. For simplicity, we'll
    // just fetch all hackathons and filter them client-side.
    const { data, error } = await supabase
      .from('hackathons')
      .select('*');
    
    if (error) throw error;
    
    // Filter hackathons by distance (using haversine formula in the client)
    // This is not optimal for large datasets, but works for demo purposes
    const nearbyHackathons = data.filter(hackathon => {
      const distance = calculateDistance(
        latitude,
        longitude,
        hackathon.latitude,
        hackathon.longitude
      );
      
      // Add distance to the hackathon object
      hackathon.distance = Math.round(distance);
      
      // Return true if within radius
      return distance <= radius;
    });
    
    return nearbyHackathons;
  } catch (error) {
    console.error('Error fetching nearby hackathons:', error);
    return [];
  }
};

export const joinHackathon = async (userId, hackathonId, joinType, teamName = null, teamMembers = []) => {
  try {
    // Check if the user has already joined this hackathon
    const { data: existingJoin, error: checkError } = await supabase
      .from('user_hackathons')
      .select('*')
      .eq('user_id', userId)
      .eq('hackathon_id', hackathonId)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is expected
      throw checkError;
    }
    
    if (existingJoin) {
      // User has already joined this hackathon
      return { success: false, message: 'You have already joined this hackathon' };
    }
    
    // Insert the new join record
    const { data, error } = await supabase
      .from('user_hackathons')
      .insert([
        {
          user_id: userId,
          hackathon_id: hackathonId,
          join_type: joinType, // 'solo' or 'team'
          team_name: teamName,
          team_members: teamMembers,
          joined_at: new Date().toISOString(),
        }
      ]);
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error joining hackathon:', error);
    return { success: false, message: error.message };
  }
};

export const fetchUserEvents = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_hackathons')
      .select(`
        *,
        hackathons:hackathon_id(*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    
    // Process the data to separate upcoming and past events
    const now = new Date();
    
    const upcomingEvents = data.filter(event => 
      new Date(event.hackathons.end_date) >= now
    ).sort((a, b) => new Date(a.hackathons.start_date) - new Date(b.hackathons.start_date));
    
    const pastEvents = data.filter(event => 
      new Date(event.hackathons.end_date) < now
    ).sort((a, b) => new Date(b.hackathons.end_date) - new Date(a.hackathons.end_date));
    
    return { upcomingEvents, pastEvents };
  } catch (error) {
    console.error('Error fetching user events:', error);
    return { upcomingEvents: [], pastEvents: [] };
  }
};

export const fetchFreelanceGigs = async () => {
  try {
    const { data, error } = await supabase
      .from('freelance_gigs')
      .select('*');
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching freelance gigs:', error);
    return [];
  }
};

export const fetchDevelopers = async () => {
  try {
    const { data, error } = await supabase
      .from('developers')
      .select('*');
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching developers:', error);
    return [];
  }
};

// Helper function to calculate distance between two coordinates using the Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI/180);
};
