import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use the secrets directly - these are injected through environment variables
// You'll need to provide your Supabase URL and key from your dashboard
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

// Mock data for development
const mockHackathons = [
  {
    id: 1,
    name: 'TechCrunch Disrupt Hackathon',
    date: 'June 10-12, 2025',
    start_date: '2025-06-10',
    end_date: '2025-06-12',
    location: 'San Francisco, CA',
    latitude: 37.7749,
    longitude: -122.4194,
    imageUrl: 'https://placehold.co/600x400/4F46E5/FFFFFF',
    description: 'Join the TechCrunch Disrupt Hackathon and build innovative solutions in just 48 hours. Connect with developers, designers, and entrepreneurs from around the world.',
    prizes: ['$10,000 Grand Prize', 'Business Mentorship', 'AWS Credits'],
    technologies: ['AI/ML', 'Blockchain', 'IoT', 'Web3', 'Cloud'],
    participants: 320,
    teamsFormed: 68,
    deadline: 'May 25, 2025',
    registration_deadline: '2025-05-25'
  },
  {
    id: 2,
    name: 'Google I/O Hackathon',
    date: 'July 5-7, 2025',
    start_date: '2025-07-05',
    end_date: '2025-07-07',
    location: 'Mountain View, CA',
    latitude: 37.3861,
    longitude: -122.0839,
    imageUrl: 'https://placehold.co/600x400/34A853/FFFFFF',
    description: 'Build with the latest Google technologies in this exciting event. Showcase your skills and win amazing prizes.',
    prizes: ['Google Devices', 'Cloud Credits', 'Trip to HQ'],
    technologies: ['Android', 'Flutter', 'Firebase', 'TensorFlow', 'Chrome'],
    participants: 250,
    teamsFormed: 55,
    deadline: 'June 20, 2025',
    registration_deadline: '2025-06-20'
  }
];

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Using mock data only.');
}

// Set up supabase client with AsyncStorage for React Native
export const supabase = createClient(supabaseUrl || 'https://example.com', supabaseAnonKey || 'fallback-key', {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  // Disable realtime for React Native to avoid ws/http errors
  realtime: { enabled: false },
});

// Helper functions for database interactions
export const fetchHackathonsNearby = async (latitude, longitude, radius = 50) => {
  try {
    // If we don't have valid Supabase credentials, return mock data
    if (!supabaseUrl || !supabaseAnonKey) {
      return mockHackathons.map(hackathon => {
        const distance = calculateDistance(
          latitude,
          longitude,
          hackathon.latitude,
          hackathon.longitude
        );
        return { ...hackathon, distance: Math.round(distance) };
      }).filter(hackathon => hackathon.distance <= radius);
    }
    
    // Try to fetch from Supabase
    try {
      const { data, error } = await supabase
        .from('hackathons')
        .select('*');
        
      if (error) {
        // If table doesn't exist, return mock data
        if (error.code === '42P01') {
          console.log('Hackathons table does not exist, using mock data');
          return mockHackathons.map(hackathon => {
            const distance = calculateDistance(
              latitude,
              longitude,
              hackathon.latitude,
              hackathon.longitude
            );
            return { ...hackathon, distance: Math.round(distance) };
          }).filter(hackathon => hackathon.distance <= radius);
        }
        throw error;
      }
      
      // If no data returned, use mock data
      if (!data || data.length === 0) {
        console.log('No hackathons found in database, using mock data');
        return mockHackathons.map(hackathon => {
          const distance = calculateDistance(
            latitude,
            longitude,
            hackathon.latitude,
            hackathon.longitude
          );
          return { ...hackathon, distance: Math.round(distance) };
        }).filter(hackathon => hackathon.distance <= radius);
      }
      
      // Filter by distance
      return data
        .filter(hackathon => {
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
        })
        .sort((a, b) => a.distance - b.distance);
    } catch (dbError) {
      console.error('Database error:', dbError);
      return mockHackathons.map(hackathon => {
        const distance = calculateDistance(
          latitude,
          longitude,
          hackathon.latitude,
          hackathon.longitude
        );
        return { ...hackathon, distance: Math.round(distance) };
      }).filter(hackathon => hackathon.distance <= radius);
    }
  } catch (error) {
    console.error('Error fetching nearby hackathons:', error);
    return mockHackathons.map(hackathon => {
      const distance = calculateDistance(
        latitude,
        longitude,
        hackathon.latitude,
        hackathon.longitude
      );
      return { ...hackathon, distance: Math.round(distance) };
    }).filter(hackathon => hackathon.distance <= radius);
  }
};

// Mock data for other features
const mockUserEvents = {
  upcomingEvents: [
    {
      id: 1,
      user_id: 'user-123',
      hackathon_id: 1,
      join_type: 'team',
      team_name: 'CodeCrusaders',
      joined_at: '2025-05-01T00:00:00Z',
      hackathons: {
        id: 1,
        name: 'TechCrunch Disrupt Hackathon',
        start_date: '2025-06-10',
        end_date: '2025-06-12',
        location: 'San Francisco, CA',
        imageUrl: 'https://placehold.co/600x400/4F46E5/FFFFFF'
      }
    },
    {
      id: 2,
      user_id: 'user-123',
      hackathon_id: 2,
      join_type: 'solo',
      joined_at: '2025-05-05T00:00:00Z',
      hackathons: {
        id: 2,
        name: 'Google I/O Hackathon',
        start_date: '2025-07-05',
        end_date: '2025-07-07',
        location: 'Mountain View, CA',
        imageUrl: 'https://placehold.co/600x400/34A853/FFFFFF'
      }
    }
  ],
  pastEvents: [
    {
      id: 3,
      user_id: 'user-123',
      hackathon_id: 3,
      join_type: 'team',
      team_name: 'WebWizards',
      joined_at: '2025-01-15T00:00:00Z',
      hackathons: {
        id: 3,
        name: 'AWS Community Day Hackathon',
        start_date: '2025-02-15',
        end_date: '2025-02-17',
        location: 'Seattle, WA',
        imageUrl: 'https://placehold.co/600x400/FF9900/FFFFFF'
      }
    }
  ]
};

const mockFreelanceGigs = [
  {
    id: 1,
    title: 'React Native Developer for Fitness App',
    company: 'FitTech Innovations',
    remote: true,
    skills: ['React Native', 'Firebase', 'UI/UX'],
    compensation: '$50-70/hr',
    deadline: '2025-06-15',
    description: 'Looking for an experienced React Native developer to help build a fitness tracking app with social features. The ideal candidate has experience with health/fitness apps and integrating wearable device APIs.',
    contact_email: 'jobs@fittechinnovations.com'
  },
  {
    id: 2,
    title: 'Full Stack Developer for E-commerce Platform',
    company: 'ShopSmart',
    remote: true,
    skills: ['React', 'Node.js', 'Express', 'MongoDB'],
    compensation: '$60-80/hr',
    deadline: '2025-06-10',
    description: 'ShopSmart is looking for a full stack developer to help enhance our e-commerce platform. You\'ll be working on new features, optimizations, and fixing bugs in our shopping cart and payment processing systems.',
    contact_email: 'careers@shopsmart.io'
  }
];

const mockDevelopers = [
  {
    id: 1,
    name: 'Jordan Smith',
    role: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'MongoDB'],
    experience: 'Senior',
    hourly_rate: '$65',
    availability: 'Available',
    location: 'Seattle, WA',
    bio: 'Full stack developer with 7+ years of experience building web and mobile applications. Passionate about clean code and user-centric design.'
  },
  {
    id: 2,
    name: 'Alex Johnson',
    role: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'CSS3'],
    experience: 'Mid-level',
    hourly_rate: '$50',
    availability: 'Available',
    location: 'Remote',
    bio: 'Frontend specialist with a focus on building beautiful, responsive interfaces. Former designer turned developer with an eye for detail.'
  },
  {
    id: 3,
    name: 'Taylor Williams',
    role: 'Mobile Developer',
    skills: ['React Native', 'Swift', 'Kotlin'],
    experience: 'Senior',
    hourly_rate: '$70',
    availability: 'Available in 2 weeks',
    location: 'Austin, TX',
    bio: 'Mobile app developer with experience shipping multiple top-rated apps. Proficient in both native and cross-platform development.'
  }
];

export const joinHackathon = async (userId, hackathonId, joinType, teamName = null, teamMembers = []) => {
  try {
    // If we don't have Supabase credentials, return mock response
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('No Supabase credentials, returning mock join response');
      return { 
        success: true, 
        data: {
          id: Math.floor(Math.random() * 1000),
          user_id: userId,
          hackathon_id: hackathonId,
          join_type: joinType,
          team_name: teamName,
          team_members: teamMembers,
          joined_at: new Date().toISOString()
        }
      };
    }
    
    try {
      // Check if the user has already joined this hackathon
      const { data: existingJoin, error: checkError } = await supabase
        .from('user_hackathons')
        .select('*')
        .eq('user_id', userId)
        .eq('hackathon_id', hackathonId)
        .single();
      
      // Handle table doesn't exist error
      if (checkError && checkError.code === '42P01') {
        console.log('user_hackathons table does not exist, returning mock join response');
        return { 
          success: true, 
          data: {
            id: Math.floor(Math.random() * 1000),
            user_id: userId,
            hackathon_id: hackathonId,
            join_type: joinType,
            team_name: teamName,
            team_members: teamMembers,
            joined_at: new Date().toISOString()
          }
        };
      }
      
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
    } catch (dbError) {
      console.error('Database error in joinHackathon:', dbError);
      return { 
        success: true, 
        data: {
          id: Math.floor(Math.random() * 1000),
          user_id: userId,
          hackathon_id: hackathonId,
          join_type: joinType,
          team_name: teamName,
          team_members: teamMembers,
          joined_at: new Date().toISOString()
        }
      };
    }
  } catch (error) {
    console.error('Error joining hackathon:', error);
    return { success: false, message: error.message };
  }
};

export const fetchUserEvents = async (userId) => {
  try {
    // If we don't have Supabase credentials, return mock data
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('No Supabase credentials, returning mock user events');
      return mockUserEvents;
    }
    
    try {
      const { data, error } = await supabase
        .from('user_hackathons')
        .select(`
          *,
          hackathons:hackathon_id(*)
        `)
        .eq('user_id', userId);
      
      // Handle table doesn't exist error
      if (error) {
        if (error.code === '42P01' || error.code === 'PGRST200') {
          console.log('Table error in fetchUserEvents, returning mock data:', error);
          return mockUserEvents;
        }
        throw error;
      }
      
      // If no data returned, use mock data
      if (!data || data.length === 0) {
        console.log('No user events found in database, using mock data');
        return mockUserEvents;
      }
      
      // Process the data to separate upcoming and past events
      const now = new Date();
      
      const upcomingEvents = data.filter(event => 
        new Date(event.hackathons.end_date) >= now
      ).sort((a, b) => new Date(a.hackathons.start_date) - new Date(b.hackathons.start_date));
      
      const pastEvents = data.filter(event => 
        new Date(event.hackathons.end_date) < now
      ).sort((a, b) => new Date(b.hackathons.end_date) - new Date(a.hackathons.end_date));
      
      return { upcomingEvents, pastEvents };
    } catch (dbError) {
      console.error('Database error in fetchUserEvents:', dbError);
      return mockUserEvents;
    }
  } catch (error) {
    console.error('Error fetching user events:', error);
    return mockUserEvents;
  }
};

export const fetchFreelanceGigs = async () => {
  try {
    // If we don't have Supabase credentials, return mock data
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('No Supabase credentials, returning mock freelance gigs');
      return mockFreelanceGigs;
    }
    
    try {
      const { data, error } = await supabase
        .from('freelance_gigs')
        .select('*');
      
      // Handle table doesn't exist error
      if (error) {
        if (error.code === '42P01') {
          console.log('freelance_gigs table does not exist, returning mock data');
          return mockFreelanceGigs;
        }
        throw error;
      }
      
      // If no data returned, use mock data
      if (!data || data.length === 0) {
        console.log('No freelance gigs found in database, using mock data');
        return mockFreelanceGigs;
      }
      
      return data;
    } catch (dbError) {
      console.error('Database error in fetchFreelanceGigs:', dbError);
      return mockFreelanceGigs;
    }
  } catch (error) {
    console.error('Error fetching freelance gigs:', error);
    return mockFreelanceGigs;
  }
};

export const fetchDevelopers = async () => {
  try {
    // If we don't have Supabase credentials, return mock data
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('No Supabase credentials, returning mock developers');
      return mockDevelopers;
    }
    
    try {
      const { data, error } = await supabase
        .from('developers')
        .select('*');
      
      // Handle table doesn't exist error
      if (error) {
        if (error.code === '42P01') {
          console.log('developers table does not exist, returning mock data');
          return mockDevelopers;
        }
        throw error;
      }
      
      // If no data returned, use mock data
      if (!data || data.length === 0) {
        console.log('No developers found in database, using mock data');
        return mockDevelopers;
      }
      
      return data;
    } catch (dbError) {
      console.error('Database error in fetchDevelopers:', dbError);
      return mockDevelopers;
    }
  } catch (error) {
    console.error('Error fetching developers:', error);
    return mockDevelopers;
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
