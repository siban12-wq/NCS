/**
 * TEAM NCS - NIST Counselling Services
 * Canonical Content & Configuration File
 *
 * Operating Rule 4: Never invent facts about the club, people, contacts,
 * phone numbers, or events. Only verified facts are hardcoded. Everything else
 * is marked with TODO: and kept as an editable placeholder.
 */

export interface SectionRange {
  id: string;
  name: string;
  start: number;
  end: number;
  cameraWaypoint: [number, number, number];
  cameraTarget: [number, number, number];
  skyPalette: {
    top: string;
    bottom: string;
    fog: string;
    ambient: string;
  };
}

export const siteConfig = {
  name: 'TEAM NCS',
  fullName: 'NIST Counselling Services',
  tagline: 'United we stand, divided we fall.',
  subtagline: "You don't have to figure it out alone · Student-run peer support at NIST",
  logo: '/brand/logo-white.png',
  instagram: {
    handle: '@the_team_ncs',
    url: 'https://www.instagram.com/the_team_ncs',
  },
  mission:
    'TEAM NCS is a dedicated student team that works alongside the institute’s Counselling Services to reduce academic stress, foster genuine peer connections, and create an open, stigma-free culture where reaching out for support feels completely natural.',

  // Verification & consent notice
  consentNotice:
    'Photographs are published with consent from campus events. If you would like your photo removed from the website, please reach out to us on Instagram or notify the team, and we will immediately take it down.',

  // Contacts & Office
  contact: {
    // TODO: Confirm official contact email with Counselling Services desk
    email: 'counselling@nist.edu', // TODO: Verify official NIST email
    // TODO: Confirm helpline/desk telephone number
    phone: '+91 00000 00000', // TODO: Verify official contact number
    // TODO: Confirm physical office room number and building on NIST campus
    officeLocation: 'Counselling Cell, Student Activity Centre, NIST Campus', // TODO: Confirm exact room/building
    // TODO: Provide link to booking form or calendar (e.g. Google Form or Calendly)
    bookingUrl: 'https://www.instagram.com/the_team_ncs', // TODO: Replace with dedicated appointment form if available
  },

  // Crisis & Emergency Hotlines (Standard national verified support in India)
  crisisHotlines: [
    {
      name: 'Tele-MANAS (Govt. of India)',
      number: '14416 / 1800-891-4416',
      description: '24/7 toll-free mental health support in multiple Indian languages',
    },
    {
      name: 'KIRAN (Govt. of India Helpline)',
      number: '1800-599-0019',
      description: 'Mental health rehabilitation and crisis counselling',
    },
    {
      name: 'Vandrevala Foundation Helpline',
      number: '+91 9999 666 555',
      description: '24/7 free, confidential psychological counselling',
    },
  ],

  // Flagship Events (Verified facts from Section 2)
  events: [
    {
      id: 'sangam-2026',
      title: 'SANGAM 2026',
      tagline: 'The Confluence of Fresh Beginnings',
      date: '3 October 2026',
      time: '11:00 AM – 4:30 PM',
      participants: 'Around 400 first-year undergraduate students',
      summary:
        'SANGAM was the flagship event organized by TEAM NCS for incoming first-year students across diverse academic programmes. Through fun, interactive team challenges, peer problem-solving, and engaging coordination games, the event aimed to alleviate academic stress and foster teamwork, communication, and mutual confidence.',
      closing:
        'The day concluded with an open Q&A session where students openly shared their first impressions, early challenges, and suggestions. The response was enthusiastic, warmly positive, and left students with a tangible sense of campus belonging.',
      highlightTag: 'Flagship Event',
    },
    {
      id: 'ptm-2026',
      title: 'Parent-Teacher Meeting 2026 Support',
      tagline: 'Bridging Families, Students & Campus Guidance',
      date: 'Academic Year 2026',
      time: 'Full Day Support',
      participants: 'B.Tech 2nd & 3rd Year Families',
      summary:
        'TEAM NCS actively assisted during the B.Tech 2nd and 3rd year Parent-Teacher Meeting, welcoming families and guiding students. Team members were on duty in their hallmark royal-blue polos with the club logo and campus lanyards, answering queries and sharing information about student wellness resources.',
      closing:
        'Strengthening communication between parents, mentors, and the student support network.',
      highlightTag: 'Campus Support',
    },
  ],

  // Chapters for Memories Gallery
  galleryChapters: [
    {
      slug: 'campus',
      title: 'Our Campus',
      blurb: 'Green hills, quiet corridors, and open skies — spaces where every student journey unfolds.',
      photos: ['campus-01', 'campus-03', 'campus-04', 'campus-05', 'campus-06', 'campus-07', 'campus-08', 'campus-hills'],
    },
    {
      slug: 'team',
      title: 'The Team',
      blurb: 'United by empathy: TEAM NCS members in royal-blue polos on campus grounds.',
      photos: ['team-in-blue', 'team-on-duty', 'under-the-trees'],
    },
    {
      slug: 'support',
      title: 'On Duty',
      blurb: 'Welcoming parents, guiding peers, and setting up help desks during institutional events.',
      photos: ['help-desk'],
    },
    {
      slug: 'celebrate',
      title: 'Moments of Joy',
      blurb: 'Celebrating victories, milestones, and shared smiles under the campus canopy.',
      photos: ['celebration'],
    },
  ],

  // Team Structure (Verified identity: royal-blue polo with club logo & lanyards; members are placeholders)
  teamIdentity: {
    description:
      'TEAM NCS represents a warm peer bridge between the student body and institutional counselling. Easily recognizable across campus in signature royal-blue polo shirts, our volunteers are students just like you — trained to listen without judgment.',
  },
  // TODO: Insert real student names and executive roles
  teamRoster: [
    {
      role: 'Student Core Coordinators',
      description: 'Senior peer mentors guiding overall club initiatives, orientation, and peer outreach.',
      members: ['TODO: Coordinator Name 1', 'TODO: Coordinator Name 2'], // TODO: Replace with real names
    },
    {
      role: 'Outreach & Logistics Team',
      description: 'Organizers behind flagship events like SANGAM and campus help-desk drives.',
      members: ['TODO: Team Member 1', 'TODO: Team Member 2', 'TODO: Team Member 3'], // TODO: Replace with real names
    },
    {
      role: 'Creative & Digital Media',
      description: 'Designing campus awareness campaigns, social presence, and educational resources.',
      members: ['TODO: Creative Lead', 'TODO: Media Member'], // TODO: Replace with real names
    },
  ],

  // Mental Health & Self-Care Resources
  resources: [
    {
      category: 'Academic Stress & Burnout',
      title: 'Managing Coursework Overwhelm',
      description:
        'Practical strategies for breaking down overwhelming deadlines, communicating with professors, and setting realistic daily study limits.',
      tips: [
        'Use the 50/10 rule: 50 minutes of single-task study followed by a 10-minute break away from screens.',
        'Prioritize by urgency and effort: complete one quick task first to break procrastination inertia.',
        'Remember that an exam measures preparation for one moment, not your worth or future potential.',
      ],
    },
    {
      category: 'Peer Connection',
      title: 'Finding Your Circle in Campus Life',
      description:
        'Moving from feeling alone to building a trusted community — one small conversation at a time.',
      tips: [
        'Join interactive club events like SANGAM where group activities make ice-breaking effortless.',
        'You do not need a huge group; even one trustworthy friend makes college life far more grounded.',
        'Reach out to TEAM NCS members at any campus desk; we are always ready for a chat.',
      ],
    },
    {
      category: 'Sleep & Grounding',
      title: 'Calming an Active Mind Before Sleep',
      description:
        'Nighttime resets for high-stress weeks and exam season anxiety.',
      tips: [
        'Try the 4-7-8 breathing technique (available in our interactive breathe section above).',
        'Write tomorrow’s top three tasks down on paper before bed to unload mental clutter.',
        'Lower ambient lights 30 minutes before sleeping and keep water beside your desk.',
      ],
    },
  ],
};

/**
 * Global Scroll Section Ranges (0.00 to 1.00)
 * Synchronized with Lenis scroll progress and 3D CameraRig spline waypoints.
 */
export const sectionRanges: SectionRange[] = [
  {
    id: 'hero',
    name: 'The Confluence',
    start: 0.0,
    end: 0.10,
    cameraWaypoint: [0, 1.2, 5.0],
    cameraTarget: [0, 0, 0],
    skyPalette: {
      top: '#12163A', // deep stormy indigo
      bottom: '#1D2563',
      fog: '#12163A',
      ambient: '#3d2f6e',
    },
  },
  {
    id: 'about',
    name: 'About NCS',
    start: 0.10,
    end: 0.20,
    cameraWaypoint: [1.2, 1.0, 4.4],
    cameraTarget: [0, 0.2, 0],
    skyPalette: {
      top: '#161B46',
      bottom: '#252F75',
      fog: '#161B46',
      ambient: '#43347B',
    },
  },
  {
    id: 'breathe',
    name: 'Take a Breath',
    start: 0.20,
    end: 0.30,
    cameraWaypoint: [0, 0.5, 3.8],
    cameraTarget: [0, 0, 0],
    skyPalette: {
      top: '#1C1F50',
      bottom: '#35337E',
      fog: '#1C1F50',
      ambient: '#524392',
    },
  },
  {
    id: 'mood',
    name: 'How Are You Arriving?',
    start: 0.30,
    end: 0.40,
    cameraWaypoint: [-1.4, 0.8, 4.2],
    cameraTarget: [0, 0.1, 0],
    skyPalette: {
      top: '#232057',
      bottom: '#453888',
      fog: '#232057',
      ambient: '#654C9E',
    },
  },
  {
    id: 'letgo',
    name: 'Leave a Worry Behind',
    start: 0.40,
    end: 0.50,
    cameraWaypoint: [0.8, 0.3, 3.9],
    cameraTarget: [0, 0, 0],
    skyPalette: {
      top: '#2B2562',
      bottom: '#5A4299',
      fog: '#2B2562',
      ambient: '#7D5BAE',
    },
  },
  {
    id: 'events',
    name: 'Campus Gatherings (Sangam)',
    start: 0.50,
    end: 0.62,
    cameraWaypoint: [-1.0, 0.6, 4.3],
    cameraTarget: [0, 0.1, 0],
    skyPalette: {
      top: '#33276B',
      bottom: '#734A9F',
      fog: '#33276B',
      ambient: '#926CBF',
    },
  },
  {
    id: 'memories',
    name: 'Photo Gallery & 3D Corridor',
    start: 0.62,
    end: 0.74,
    cameraWaypoint: [0, 0.8, 4.6],
    cameraTarget: [0, 0, 0],
    skyPalette: {
      top: '#3E2B77',
      bottom: '#8E5A9F',
      fog: '#3E2B77',
      ambient: '#A97CC7',
    },
  },
  {
    id: 'team',
    name: 'The Royal Blue Team',
    start: 0.74,
    end: 0.83,
    cameraWaypoint: [1.3, 0.5, 4.0],
    cameraTarget: [0, 0, 0],
    skyPalette: {
      top: '#472F80',
      bottom: '#AC6A9E',
      fog: '#472F80',
      ambient: '#C38CC7',
    },
  },
  {
    id: 'resources',
    name: 'Peer Self-Help Guides',
    start: 0.83,
    end: 0.91,
    cameraWaypoint: [-0.9, 0.4, 4.2],
    cameraTarget: [0, 0, 0],
    skyPalette: {
      top: '#4A3284',
      bottom: '#D08298',
      fog: '#4A3284',
      ambient: '#DCA1B6',
    },
  },
  {
    id: 'reach',
    name: 'Talk to Us',
    start: 0.91,
    end: 0.97,
    cameraWaypoint: [0, 0.3, 4.1],
    cameraTarget: [0, 0, 0],
    skyPalette: {
      top: '#4D3686',
      bottom: '#EFA698', // peach-gold dawn
      fog: '#4D3686',
      ambient: '#FFC9A3',
    },
  },
  {
    id: 'footer',
    name: 'Safe Haven & Credits',
    start: 0.97,
    end: 1.00,
    cameraWaypoint: [0, 0.2, 4.8],
    cameraTarget: [0, 0, 0],
    skyPalette: {
      top: '#2C2360',
      bottom: '#FFC9A3',
      fog: '#2C2360',
      ambient: '#FFE2A8',
    },
  },
];
