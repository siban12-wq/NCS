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
    email: 'counselling@nist.edu',
    phone: '+91 00000 00000',
    officeLocation: 'Room ATR 303, NIST Campus',
    bookingUrl: 'https://www.instagram.com/the_team_ncs',
  },

  // Faculty Leadership & Club Advisor
  advisor: {
    name: 'Asst. Prof. Minakshi Dash',
    role: 'Club Advisor',
    designation: 'Faculty Advisor, NIST Counselling Services',
    department: 'NIST University',
    room: 'Room ATR 303',
  },

  // Official TEAM NCS 2026 Roster
  members: {
    advisor: {
      name: 'Asst. Prof. Minakshi Dash',
      role: 'Club Advisor',
      designation: 'Faculty Advisor, NIST Counselling Services',
    },
    guides: [
      { sNo: 1, name: 'ASHISH KUMAR SATAPATHY', rollNo: '202456018', year: '3rd Year', branch: 'AIML' },
      { sNo: 2, name: 'ARCHITA PANIGRAHI', rollNo: '202457183', year: '3rd Year', branch: 'CSE' },
      { sNo: 3, name: 'DEEPAK KUMAR SWAIN', rollNo: '202456050', year: '3rd Year', branch: 'CSE' },
      { sNo: 4, name: 'SHOAIB ALAM', rollNo: '202456258', year: '3rd Year', branch: 'CSE' },
      { sNo: 5, name: 'P KIRAN KUMAR', rollNo: '202456004', year: '3rd Year', branch: 'AIML' },
      { sNo: 6, name: 'MANISH NAYAK', rollNo: '202456013', year: '3rd Year', branch: 'AIML' },
      { sNo: 7, name: 'GAYATRI BEHERA', rollNo: '202457098', year: '3rd Year', branch: 'AIML' },
      { sNo: 8, name: 'UTKARSH RAJ', rollNo: '202456341', year: '3rd Year', branch: 'CSE' },
      { sNo: 9, name: 'ASHISH KUMAR', rollNo: '202456244', year: '3rd Year', branch: 'CSE' },
      { sNo: 10, name: 'AMRITA SETHY', rollNo: '202457070', year: '3rd Year', branch: 'CSE' },
      { sNo: 11, name: 'PALLAV SARKAR', rollNo: '202456414', year: '3rd Year', branch: 'CSE' },
      { sNo: 12, name: 'AMRITA PANIGRAHI', rollNo: '202457466', year: '3rd Year', branch: 'CSE' },
      { sNo: 13, name: 'PRIYADARSHINI PRADHAN', rollNo: '2024567614', year: '3rd Year', branch: 'CSE' },
      { sNo: 14, name: 'SRABANI SAHU', rollNo: '202457420', year: '3rd Year', branch: 'CSE' },
      { sNo: 15, name: 'SNEHA GUDLA', rollNo: '202457154', year: '3rd Year', branch: 'DS' },
      { sNo: 16, name: 'SATYABRATTA PATRO', rollNo: '202456374', year: '3rd Year', branch: 'CSE' },
      { sNo: 17, name: 'SIMANCHAL NAYAK', rollNo: '202456390', year: '3rd Year', branch: 'CSE' },
      { sNo: 18, name: 'GYANA RANJAN PANIGRAHY', rollNo: '202456649', year: '3rd Year', branch: 'CSE' },
      { sNo: 19, name: 'BALUKESWAR SATAPATHY', rollNo: '202456207', year: '3rd Year', branch: 'ECE' },
      { sNo: 20, name: 'J SRI SAI', rollNo: '202456651', year: '3rd Year', branch: 'CSE' },
      { sNo: 21, name: 'SWAGAT RANJAN SAHU', rollNo: '202456325', year: '3rd Year', branch: 'ECE' },
      { sNo: 22, name: 'ASUTOSH PANIGRAHI', rollNo: '202456326', year: '3rd Year', branch: 'ECE' },
      { sNo: 23, name: 'SHIVA BUDHA', rollNo: '202498018', year: '3rd Year', branch: 'BCA' },
      { sNo: 24, name: 'SAWAN KUMAR', rollNo: '202456272', year: '3rd Year', branch: 'CSE' },
    ],
    coordinators: [
      { sNo: 1, name: 'Jyotiraj' },
      { sNo: 2, name: 'Rajkumari' },
      { sNo: 3, name: 'Ipsita' },
      { sNo: 4, name: 'P. Bharti' },
      { sNo: 5, name: 'Ayush' },
      { sNo: 6, name: 'Anwesha G.' },
      { sNo: 7, name: 'Sunayana' },
      { sNo: 8, name: 'Anwesha Jena' },
      { sNo: 9, name: 'Sachin' },
      { sNo: 10, name: 'Subhasish' },
      { sNo: 11, name: 'Roshan' },
      { sNo: 12, name: 'Rosan' },
      { sNo: 13, name: 'Asish G.' },
      { sNo: 14, name: 'Rajeshri' },
      { sNo: 15, name: 'Subhashre' },
      { sNo: 16, name: 'D. Amit' },
      { sNo: 17, name: 'Rahul Panda' },
      { sNo: 18, name: 'Akash Behera' },
      { sNo: 19, name: 'Jaswinder' },
      { sNo: 20, name: 'Sakti Sworup' },
      { sNo: 21, name: 'Anshuman Padhy' },
    ],
    // Trainees (K. Suraj Reddy excluded as requested)
    trainees: [
      { sNo: 1, name: 'Dibyansu Gouda', rollNo: '202556314' },
      { sNo: 2, name: 'Subham Purohita', rollNo: '202556667' },
      { sNo: 3, name: 'Rama Krushna Pattnaik', rollNo: '202556082' },
      { sNo: 4, name: 'Anwesha Pattnaik', rollNo: '202557791' },
      { sNo: 5, name: 'Adityaraj Bhuyan', rollNo: '202556585' },
      { sNo: 6, name: 'Siban Acharya', rollNo: '202556025' },
      { sNo: 7, name: 'Lipsa Rani Das', rollNo: '202557679' },
      { sNo: 8, name: 'Biswajeet Rout', rollNo: '202556805' },
      { sNo: 9, name: 'Soham Barik', rollNo: '202556853' },
      { sNo: 10, name: 'Ankit Kumar', rollNo: '202556485' },
      { sNo: 11, name: 'R Tanushree', rollNo: '202557073' },
      { sNo: 12, name: 'Sulekha Das', rollNo: '202557864' },
      { sNo: 13, name: 'Nandita', rollNo: '202557517' },
      { sNo: 14, name: 'Sneharani Nayak', rollNo: '202557557' },
      { sNo: 15, name: 'Amrit Sabat', rollNo: '202556084' },
      { sNo: 16, name: 'Prathamesh Purohit', rollNo: '202556231' },
      { sNo: 17, name: 'Subhasree Panda', rollNo: '202557117' },
      { sNo: 18, name: 'Sobhan Ku. Patro', rollNo: '202556898' },
      { sNo: 19, name: 'Biswanath Baidya', rollNo: '202556386' },
      { sNo: 20, name: 'Soumyaranjan Mohapatra', rollNo: '202556267' },
      { sNo: 21, name: 'Manaswini Mishra', rollNo: '202557810' },
    ],
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
        'Try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, and exhale slowly for 8.',
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
    end: 0.12,
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
    start: 0.12,
    end: 0.25,
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
    id: 'mood',
    name: 'How Are You Arriving?',
    start: 0.25,
    end: 0.37,
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
    start: 0.37,
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
    end: 0.63,
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
    start: 0.63,
    end: 0.75,
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
    start: 0.75,
    end: 0.85,
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
    start: 0.85,
    end: 0.92,
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
