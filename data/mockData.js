// Mock data for testing the app

export const mockHackathons = [
  {
    id: '1',
    name: 'TechCrunch Disrupt Hackathon',
    location: 'San Francisco, CA',
    latitude: 37.7749,
    longitude: -122.4194,
    tags: ['AI', 'Machine Learning', 'Web3'],
    start_date: '2023-09-15',
    end_date: '2023-09-17',
    application_deadline: '2023-09-01',
    max_team_size: 4,
    distance: 0, // Will be calculated based on user location
  },
  {
    id: '2',
    name: 'Google Cloud Next Hackathon',
    location: 'Mountain View, CA',
    latitude: 37.3861,
    longitude: -122.0839,
    tags: ['Cloud', 'AI', 'Mobile'],
    start_date: '2023-10-05',
    end_date: '2023-10-07',
    application_deadline: '2023-09-20',
    max_team_size: 5,
    distance: 0,
  },
  {
    id: '3',
    name: 'HackSF: Climate Tech',
    location: 'San Francisco, CA',
    latitude: 37.7749,
    longitude: -122.4194,
    tags: ['Sustainability', 'Climate Change', 'IoT'],
    start_date: '2023-09-25',
    end_date: '2023-09-26',
    application_deadline: '2023-09-15',
    max_team_size: 3,
    distance: 0,
  },
  {
    id: '4',
    name: 'HealthTech Innovate',
    location: 'Palo Alto, CA',
    latitude: 37.4419,
    longitude: -122.1430,
    tags: ['Health', 'AI', 'Data Science'],
    start_date: '2023-10-15',
    end_date: '2023-10-16',
    application_deadline: '2023-10-01',
    max_team_size: 4,
    distance: 0,
  },
  {
    id: '5',
    name: 'FinTech Revolution',
    location: 'San Jose, CA',
    latitude: 37.3382,
    longitude: -121.8863,
    tags: ['FinTech', 'Blockchain', 'Web3'],
    start_date: '2023-11-04',
    end_date: '2023-11-06',
    application_deadline: '2023-10-20',
    max_team_size: 4,
    distance: 0,
  },
  {
    id: '6',
    name: 'EdTech Innovate',
    location: 'Berkeley, CA',
    latitude: 37.8715,
    longitude: -122.2730,
    tags: ['Education', 'Mobile', 'AI'],
    start_date: '2023-11-18',
    end_date: '2023-11-19',
    application_deadline: '2023-11-05',
    max_team_size: 3,
    distance: 0,
  },
  {
    id: '7',
    name: 'AR/VR Future',
    location: 'Oakland, CA',
    latitude: 37.8044,
    longitude: -122.2711,
    tags: ['AR', 'VR', 'Gaming'],
    start_date: '2023-12-02',
    end_date: '2023-12-03',
    application_deadline: '2023-11-20',
    max_team_size: 4,
    distance: 0,
  },
  {
    id: '8',
    name: 'Web3 Summit Hackathon',
    location: 'San Francisco, CA',
    latitude: 37.7749,
    longitude: -122.4194,
    tags: ['Blockchain', 'Crypto', 'Web3'],
    start_date: '2023-12-15',
    end_date: '2023-12-17',
    application_deadline: '2023-12-01',
    max_team_size: 5,
    distance: 0,
  },
];

export const mockUserEvents = {
  upcomingEvents: [
    {
      id: '101',
      user_id: '123e4567-e89b-12d3-a456-426614174000',
      hackathon_id: '2',
      join_type: 'team',
      team_name: 'Code Ninjas',
      team_members: [
        'teammate1@example.com',
        'teammate2@example.com',
      ],
      joined_at: '2023-08-15T10:30:00Z',
      hackathons: {
        id: '2',
        name: 'Google Cloud Next Hackathon',
        location: 'Mountain View, CA',
        tags: ['Cloud', 'AI', 'Mobile'],
        start_date: '2023-10-05',
        end_date: '2023-10-07',
        application_deadline: '2023-09-20',
        max_team_size: 5,
      }
    },
    {
      id: '102',
      user_id: '123e4567-e89b-12d3-a456-426614174000',
      hackathon_id: '5',
      join_type: 'solo',
      team_name: null,
      team_members: [],
      joined_at: '2023-08-20T14:45:00Z',
      hackathons: {
        id: '5',
        name: 'FinTech Revolution',
        location: 'San Jose, CA',
        tags: ['FinTech', 'Blockchain', 'Web3'],
        start_date: '2023-11-04',
        end_date: '2023-11-06',
        application_deadline: '2023-10-20',
        max_team_size: 4,
      }
    }
  ],
  pastEvents: [
    {
      id: '103',
      user_id: '123e4567-e89b-12d3-a456-426614174000',
      hackathon_id: '9',
      join_type: 'team',
      team_name: 'Data Wizards',
      team_members: [
        'friend1@example.com',
        'friend2@example.com',
        'friend3@example.com',
      ],
      joined_at: '2023-07-01T09:15:00Z',
      hackathons: {
        id: '9',
        name: 'DataHack 2023',
        location: 'San Francisco, CA',
        tags: ['Data Science', 'AI', 'Big Data'],
        start_date: '2023-07-15',
        end_date: '2023-07-16',
        application_deadline: '2023-07-10',
        max_team_size: 4,
      }
    },
    {
      id: '104',
      user_id: '123e4567-e89b-12d3-a456-426614174000',
      hackathon_id: '10',
      join_type: 'solo',
      team_name: null,
      team_members: [],
      joined_at: '2023-06-05T11:30:00Z',
      hackathons: {
        id: '10',
        name: 'Mobile Innovation Hackathon',
        location: 'Cupertino, CA',
        tags: ['Mobile', 'iOS', 'Android'],
        start_date: '2023-06-20',
        end_date: '2023-06-21',
        application_deadline: '2023-06-15',
        max_team_size: 3,
      }
    }
  ]
};

export const mockFreelanceGigs = [
  {
    id: '201',
    title: 'React Native Developer for Fintech App',
    event: 'FinTech Revolution Hackathon',
    skills_required: ['React Native', 'JavaScript', 'API Integration'],
    pay_range: {
      min: 1500,
      max: 3000
    },
    remote: true,
    deadline: '2023-10-15',
    description: 'Looking for an experienced React Native developer to help build a fintech application for an upcoming hackathon. You will be responsible for implementing the mobile frontend based on existing designs and integrating with our backend APIs.'
  },
  {
    id: '202',
    title: 'UI/UX Designer for Health Tech Project',
    event: 'HealthTech Innovate',
    skills_required: ['UI/UX', 'Figma', 'Prototyping'],
    pay_range: {
      min: 1200,
      max: 2500
    },
    remote: true,
    deadline: '2023-09-30',
    description: 'Need a skilled UI/UX designer to create intuitive and accessible interfaces for a health monitoring application. Experience in healthcare-related design is a plus.'
  },
  {
    id: '203',
    title: 'Backend Developer for AI Project',
    event: 'TechCrunch Disrupt Hackathon',
    skills_required: ['Python', 'Machine Learning', 'Flask'],
    pay_range: {
      min: 2000,
      max: 4000
    },
    remote: false,
    deadline: '2023-08-25',
    description: 'Looking for a backend developer with machine learning experience to help build an AI-powered web application for TechCrunch Disrupt. Knowledge of Python, Flask, and machine learning libraries required.'
  },
  {
    id: '204',
    title: 'Full Stack Developer for Education Platform',
    event: 'EdTech Innovate',
    skills_required: ['React', 'Node.js', 'MongoDB'],
    pay_range: {
      min: 1800,
      max: 3500
    },
    remote: true,
    deadline: '2023-11-01',
    description: 'Seeking a full stack developer to help create an educational platform that connects students with tutors. Experience with React, Node.js, and MongoDB required.'
  },
  {
    id: '205',
    title: 'Blockchain Developer for NFT Marketplace',
    event: 'Web3 Summit Hackathon',
    skills_required: ['Solidity', 'Web3.js', 'Smart Contracts'],
    pay_range: {
      min: 2500,
      max: 5000
    },
    remote: true,
    deadline: '2023-11-30',
    description: 'Looking for a blockchain developer with experience in NFT marketplaces to help build a decentralized platform for digital artists. Knowledge of Solidity, Web3.js, and smart contract development required.'
  }
];

export const mockDevelopers = [
  {
    id: '301',
    name: 'Alex Johnson',
    skills: ['React Native', 'JavaScript', 'TypeScript', 'Firebase'],
    availability: 'Now',
    experience: 'Senior',
    bio: 'Full stack mobile developer with 6 years of experience building cross-platform apps with React Native. Passionate about clean code and user-centric design.'
  },
  {
    id: '302',
    name: 'Sam Rodriguez',
    skills: ['UI/UX', 'Figma', 'Adobe XD', 'Prototyping'],
    availability: 'Soon',
    experience: 'Mid',
    bio: 'UI/UX designer with a focus on creating intuitive and engaging user experiences. I have worked with startups and Fortune 500 companies to design mobile and web applications.'
  },
  {
    id: '303',
    name: 'Jamie Zhang',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
    availability: 'Now',
    experience: 'Senior',
    bio: 'Machine learning engineer with expertise in computer vision and natural language processing. PhD in Computer Science with 4 years of industry experience.'
  },
  {
    id: '304',
    name: 'Taylor Wilson',
    skills: ['Node.js', 'Express', 'MongoDB', 'GraphQL'],
    availability: 'Busy',
    experience: 'Mid',
    bio: 'Backend developer specializing in RESTful API development and database design. Experienced in building scalable microservices architecture.'
  },
  {
    id: '305',
    name: 'Jordan Patel',
    skills: ['React', 'JavaScript', 'CSS', 'Redux'],
    availability: 'Now',
    experience: 'Junior',
    bio: 'Frontend developer with a passion for building responsive and accessible web applications. Former designer who made the switch to coding two years ago.'
  },
  {
    id: '306',
    name: 'Casey Lee',
    skills: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts'],
    availability: 'Soon',
    experience: 'Mid',
    bio: 'Blockchain developer focused on Ethereum and DeFi projects. Have built multiple dApps and smart contracts for various use cases.'
  },
  {
    id: '307',
    name: 'Morgan Smith',
    skills: ['Swift', 'iOS', 'UIKit', 'SwiftUI'],
    availability: 'Now',
    experience: 'Senior',
    bio: 'iOS developer with 8 years of experience building consumer-facing mobile applications. Published multiple apps on the App Store with millions of downloads.'
  }
];
