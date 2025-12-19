
import { Project, Education, Skill, Certification } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'freeladesk',
    title: 'FreelaDesk',
    category: 'SaaS for Freelancers',
    date: '2024 - Present',
    description: [
      'Built an AI-powered SaaS platform streamlining freelance project planning, client communication, and financial oversight.',
      'Leveraged structured LLM outputs to automate project decomposition and task generation from real-world documents.',
      'Designed secure, real-time client visibility dashboards to improve trust and reduce operational overhead.',
      'Delivered a unified productivity and financial management workspace for modern freelancers.'
    ],
    tools: ['Structured LLM', 'React', 'Node.js', 'PostgreSQL'],
    link: '#',
    color: 'from-amber-500 to-orange-600',
    image: '/images/freeladesk.png' // Add your image path here
  },
  {
    id: 'nutriguide',
    title: 'Nutri Guide AI',
    category: 'MERN Stack Development',
    date: 'Nov 2024 - Jan 2025',
    description: [
      'Engineered a full-stack AI web app generating personalized meal plans using Gemini API.',
      'Implemented dynamic meal scheduling with macro breakdowns and visual analytics via Chart.js.',
      'Developed JWT-based authentication and user profile management.'
    ],
    tools: ['ReactJS', 'MongoDB', 'NodeJS', 'Gemini API', 'Chart.js'],
    link: '#',
    githubLink: 'https://github.com/bhanunama',
    liveLink: 'http://neutri-guide.vercel.app/',
    color: 'from-emerald-500 to-teal-600',
    image: '/images/nutriguide.png' // Add your image path here
  },
  {
    id: 'campusconnect',
    title: 'Campus Connect',
    category: 'MERN Stack Development',
    date: 'Jan 2024 - June 2024',
    description: [
      'Developed a MERN application to enhance campus communication and management.',
      'Implemented role-based access control using JWT.',
      'Created real-time attendance tracking and exam results management systems.'
    ],
    tools: ['ReactJS', 'MongoDB', 'NodeJS', 'ExpressJS'],
    link: '#',
    githubLink: 'https://github.com/bhanunama',
    liveLink: 'https://campus-connect-new.vercel.app/',
    color: 'from-blue-500 to-cyan-600',
    image: '/images/campusconnect.png' // Add your image path here
  }
];

export const EDUCATION: Education[] = [
  {
    institution: 'Keshav Memorial Institute of Technology',
    degree: 'B.Tech in Computer Science and Engineering',
    duration: 'Dec 2021 - June 2025',
    location: 'Hyderabad, India',
    details: 'CGPA: 8.3'
  },
  {
    institution: 'Sri Gayatri College',
    degree: 'Intermediate (MPC)',
    duration: '2019 - 2021',
    location: 'Hyderabad, India',
    details: 'Percentage: 97%'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React', category: 'Web', icon: 'react' },
  { name: 'Node.js', category: 'Web', icon: 'nodejs' },
  { name: 'Express.js', category: 'Web', icon: 'expressjs' },
  { name: 'TailwindCSS', category: 'Web', icon: 'tailwindcss' },
  { name: 'MongoDB', category: 'DB', icon: 'mongodb' },
  { name: 'HTML', category: 'Language', icon: 'html' },
  { name: 'JavaScript', category: 'Language', icon: 'js' },
  { name: 'Java', category: 'Language', icon: 'java' },
  { name: 'Git', category: 'Other', icon: 'git' },
  { name: 'Operating Systems', category: 'Other', icon: 'linux' },
  { name: 'DSA', category: 'Other', icon: 'brain' },
  { name: 'MySQL', category: 'DB', icon: 'mysql' },
  { name: 'AWS', category: 'DB', icon: 'aws' }
];

export const CERTIFICATIONS: Certification[] = [
  { provider: 'Microsoft & LinkedIn', name: 'Essentials in Software Development' },
  { provider: 'Udemy', name: 'Java & C++' }
];
