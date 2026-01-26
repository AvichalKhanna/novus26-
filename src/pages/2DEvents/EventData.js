// eventData.js - Centralized event database
export const TECH_EVENTS = [
  {
    id: 'ctf',
    name: 'Capture The Flag',
    type: 'Tech Competition',
    category: 'tech',
    description: 'Test your cybersecurity skills in an intense CTF challenge. Crack codes, find vulnerabilities, and capture flags to win!',
    teamSize: '1-4',
    prizePool: '₹10,000',
    feeMember: '₹99',
    feeNonMember: '₹149',
    position: { x: 35, z: 30 },
    color: 0xff3333,
    perks: ['Certificates', 'Goodies', 'Internship Opportunities']
  },
  {
    id: 'buildfest',
    name: 'BuildFest 2.0 (Vibathon)',
    type: 'Tech Competition',
    category: 'tech',
    description: 'Build innovative solutions in this vibrant hackathon. Collaborate, code, and create the next big thing in tech!',
    teamSize: '2-4',
    prizePool: '₹10,000',
    feeMember: '₹99',
    feeNonMember: '₹149',
    position: { x: -40, z: 25 },
    color: 0x33ff33,
    perks: ['Certificates', 'Goodies', 'Internship Opportunities']
  },
  {
    id: 'uiux',
    name: 'UI/UX Design Challenge',
    type: 'Tech Competition',
    category: 'tech',
    description: 'Showcase your design prowess. Create stunning interfaces and exceptional user experiences that stand out!',
    teamSize: 'Individual',
    prizePool: '₹3,000',
    feeMember: 'FREE',
    feeNonMember: 'FREE',
    position: { x: 28, z: -38 },
    color: 0x3333ff,
    perks: ['Certificates', 'Goodies', 'Internship Opportunities']
  },
  {
    id: 'prompt',
    name: 'Prompt Engineering',
    type: 'Tech Competition',
    category: 'tech',
    description: 'Master the art of AI prompting. Craft the perfect prompts to unlock AI\'s full potential and win big!',
    teamSize: '1-2',
    prizePool: '₹3,000',
    feeMember: '₹99',
    feeNonMember: '₹99',
    position: { x: -35, z: -30 },
    color: 0xffaa33,
    perks: ['Certificates', 'Goodies', 'Internship Opportunities']
  },
  {
    id: 'techsentinel',
    name: 'TechSentinel 2.0 (Talkshow)',
    type: 'Tech Workshop',
    category: 'tech',
    description: 'Engage in insightful tech discussions. Learn from experts and explore the future of technology!',
    teamSize: 'Individual',
    prizePool: 'N/A',
    feeMember: 'FREE',
    feeNonMember: 'FREE',
    position: { x: 0, z: 48 },
    color: 0xff33ff,
    perks: ['Certificates', 'Goodies', 'Internship Opportunities']
  }
];

export const FUN_EVENTS = [
  {
    id: 'alice',
    name: 'Alice in Borderland 2.0',
    type: 'Fun Event',
    category: 'fun',
    description: 'Survive deadly games inspired by the hit series. Strategy, teamwork, and quick thinking are your only allies!',
    teamSize: 'Exactly 3',
    prizePool: '₹5,000',
    feeMember: '₹49',
    feeNonMember: '₹99',
    position: { x: 42, z: -15 },
    color: 0xff6b35,
    perks: ['Certificates', 'Goodies']
  },
  {
    id: 'murder',
    name: 'Murder Mystery',
    type: 'Fun Event',
    category: 'fun',
    description: 'Solve the ultimate whodunit. Interrogate suspects, gather clues, and unmask the killer before time runs out!',
    teamSize: '3',
    prizePool: '₹5,000',
    feeMember: '₹99',
    feeNonMember: '₹149',
    position: { x: -45, z: 5 },
    color: 0x8b00ff,
    perks: ['Certificates', 'Goodies']
  },
  {
    id: 'escape',
    name: 'Escape Room',
    type: 'Fun Event',
    category: 'fun',
    description: 'Race against time to escape! Solve puzzles, crack codes, and find your way out of the ultimate challenge!',
    teamSize: '2-4',
    prizePool: '₹2,000 + Special Goodies',
    feeMember: '₹99',
    feeNonMember: '₹149',
    position: { x: 15, z: -50 },
    color: 0x00d9ff,
    perks: ['Certificates', 'Goodies']
  }
];

export const ALL_EVENTS = [...TECH_EVENTS, ...FUN_EVENTS];

export const DISCOUNT_TIERS = [
  {
    eventCount: 3,
    discount: 15,
    description: 'Register for any 3 events → 15% OFF'
  },
  {
    eventCount: 5,
    discount: 25,
    description: 'Register for any 5 events → 25% OFF'
  }
];

export const EVENT_CATEGORIES = {
  tech: {
    name: 'Tech Events',
    description: 'Compete in cutting-edge technology challenges',
    color: '#00f5ff'
  },
  fun: {
    name: 'Fun Events',
    description: 'Experience thrilling adventures and mysteries',
    color: '#ff6b35'
  }
};