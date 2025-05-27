import { Course } from '../types/course';

// Generate a mock course database
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn web development from scratch. Master HTML, CSS, JavaScript, React, Node.js, and MongoDB to build full-stack applications.',
    price: 89.99,
    discountPrice: 49.99,
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Development',
    level: 'All Levels',
    rating: 4.8,
    reviews: 4521,
    enrollments: 12500,
    duration: '63h 30m',
    lessons: 425,
    featured: true,
    bestseller: true,
    tags: ['web development', 'javascript', 'react', 'node.js'],
    createdAt: '2023-03-15T00:00:00.000Z',
    updatedAt: '2024-02-28T00:00:00.000Z',
    instructor: {
      id: '101',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
      bio: 'Full-stack developer with 10+ years of experience. Previously worked at Google and Amazon.',
      rating: 4.9,
      courses: 12,
      students: 45000
    },
    curriculum: {
      sections: [
        {
          title: 'Introduction to Web Development',
          lessons: [
            {
              id: '1-1',
              title: 'Course Overview',
              duration: '10m',
              type: 'video',
              preview: true
            },
            {
              id: '1-2',
              title: 'Setting Up Your Development Environment',
              duration: '15m',
              type: 'video',
              preview: true
            }
          ]
        },
        {
          title: 'HTML Fundamentals',
          lessons: [
            {
              id: '2-1',
              title: 'HTML Document Structure',
              duration: '12m',
              type: 'video',
              preview: false
            },
            {
              id: '2-2',
              title: 'Working with Text and Images',
              duration: '18m',
              type: 'video',
              preview: false
            },
            {
              id: '2-3',
              title: 'HTML Elements Quiz',
              duration: '20m',
              type: 'quiz',
              preview: false
            }
          ]
        }
      ]
    }
  },
  {
    id: '2',
    title: 'Machine Learning A-Z: Hands-On Python & R',
    description: 'Learn to create machine learning algorithms in Python and R, dive into deep learning, and build artificial neural networks.',
    price: 99.99,
    discountPrice: 59.99,
    thumbnail: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Data Science',
    level: 'Intermediate',
    rating: 4.7,
    reviews: 3872,
    enrollments: 9800,
    duration: '45h 15m',
    lessons: 320,
    featured: true,
    bestseller: true,
    tags: ['machine learning', 'python', 'data science', 'deep learning'],
    createdAt: '2023-05-20T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
    instructor: {
      id: '102',
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
      bio: 'Data scientist with PhD in Computer Science. Former ML researcher at MIT.',
      rating: 4.8,
      courses: 8,
      students: 38000
    },
    curriculum: {
      sections: [
        {
          title: 'Introduction to Machine Learning',
          lessons: [
            {
              id: '1-1',
              title: 'What is Machine Learning?',
              duration: '12m',
              type: 'video',
              preview: true
            },
            {
              id: '1-2',
              title: 'Setting Up Python & R',
              duration: '18m',
              type: 'video',
              preview: false
            }
          ]
        },
        {
          title: 'Data Preprocessing',
          lessons: [
            {
              id: '2-1',
              title: 'Importing Libraries and Datasets',
              duration: '15m',
              type: 'video',
              preview: false
            },
            {
              id: '2-2',
              title: 'Handling Missing Data',
              duration: '20m',
              type: 'video',
              preview: false
            }
          ]
        }
      ]
    }
  },
  {
    id: '3',
    title: 'The Complete Financial Analyst Course',
    description: 'Master financial analysis and build a career as a financial analyst with this comprehensive course on finance, accounting, and valuation.',
    price: 79.99,
    discountPrice: 39.99,
    thumbnail: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Business',
    level: 'Beginner',
    rating: 4.6,
    reviews: 2943,
    enrollments: 7500,
    duration: '32h 45m',
    lessons: 275,
    featured: false,
    bestseller: true,
    tags: ['finance', 'accounting', 'excel', 'valuation'],
    createdAt: '2023-02-10T00:00:00.000Z',
    updatedAt: '2023-11-30T00:00:00.000Z',
    instructor: {
      id: '103',
      name: 'Emma Roberts',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
      bio: 'Former investment banker with 15 years experience in corporate finance and equity research.',
      rating: 4.7,
      courses: 5,
      students: 32000
    },
    curriculum: {
      sections: [
        {
          title: 'Financial Statements Analysis',
          lessons: [
            {
              id: '1-1',
              title: 'Introduction to Financial Statements',
              duration: '22m',
              type: 'video',
              preview: true
            },
            {
              id: '1-2',
              title: 'Balance Sheet Deep Dive',
              duration: '35m',
              type: 'video',
              preview: false
            }
          ]
        }
      ]
    }
  },
  {
    id: '4',
    title: 'Digital Marketing Masterclass',
    description: 'Master digital marketing strategy, social media marketing, SEO, YouTube marketing, email marketing, Facebook ads, and more!',
    price: 69.99,
    discountPrice: 34.99,
    thumbnail: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Marketing',
    level: 'All Levels',
    rating: 4.5,
    reviews: 3156,
    enrollments: 8200,
    duration: '28h 10m',
    lessons: 230,
    featured: true,
    bestseller: false,
    tags: ['digital marketing', 'social media', 'SEO', 'Google Ads'],
    createdAt: '2023-06-05T00:00:00.000Z',
    updatedAt: '2024-03-01T00:00:00.000Z',
    instructor: {
      id: '104',
      name: 'David Wilson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
      bio: 'Digital marketing expert who has worked with Fortune 500 companies on marketing strategy.',
      rating: 4.6,
      courses: 7,
      students: 36000
    },
    curriculum: {
      sections: [
        {
          title: 'Marketing Fundamentals',
          lessons: [
            {
              id: '1-1',
              title: 'The Digital Marketing Landscape',
              duration: '18m',
              type: 'video',
              preview: true
            }
          ]
        }
      ]
    }
  },
  {
    id: '5',
    title: 'Modern React with Redux',
    description: 'Master React v18 and Redux Toolkit with this complete guide. Build powerful, fast, user-friendly apps with React JS and Redux.',
    price: 79.99,
    discountPrice: 44.99,
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Development',
    level: 'Intermediate',
    rating: 4.9,
    reviews: 5283,
    enrollments: 13400,
    duration: '52h 30m',
    lessons: 380,
    featured: true,
    bestseller: true,
    tags: ['react', 'redux', 'javascript', 'frontend'],
    createdAt: '2023-04-12T00:00:00.000Z',
    updatedAt: '2024-02-15T00:00:00.000Z',
    instructor: {
      id: '105',
      name: 'Jason Rivera',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
      bio: 'Senior frontend developer specializing in React. Previously at Facebook and Netflix.',
      rating: 4.9,
      courses: 10,
      students: 52000
    },
    curriculum: {
      sections: [
        {
          title: 'React Fundamentals',
          lessons: [
            {
              id: '1-1',
              title: 'Course Introduction',
              duration: '5m',
              type: 'video',
              preview: true
            }
          ]
        }
      ]
    }
  },
  {
    id: '6',
    title: 'Photography Masterclass: A Complete Guide',
    description: 'The best online photography course. Learn how to take amazing photos that impress your family and friends.',
    price: 59.99,
    discountPrice: 29.99,
    thumbnail: 'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Photography',
    level: 'All Levels',
    rating: 4.7,
    reviews: 3541,
    enrollments: 9200,
    duration: '24h 15m',
    lessons: 185,
    featured: false,
    bestseller: false,
    tags: ['photography', 'camera basics', 'photo editing', 'composition'],
    createdAt: '2023-01-25T00:00:00.000Z',
    updatedAt: '2023-10-10T00:00:00.000Z',
    instructor: {
      id: '106',
      name: 'Lisa Zhang',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
      bio: 'Professional photographer with 20 years of experience in portrait and landscape photography.',
      rating: 4.8,
      courses: 6,
      students: 28000
    },
    curriculum: {
      sections: [
        {
          title: 'Photography Basics',
          lessons: [
            {
              id: '1-1',
              title: 'Understanding Your Camera',
              duration: '22m',
              type: 'video',
              preview: true
            }
          ]
        }
      ]
    }
  },
  {
    id: '7',
    title: 'Complete Python Developer in 2024',
    description: 'Learn Python from scratch. Build projects, automate tasks, and master Python programming with this comprehensive course.',
    price: 84.99,
    discountPrice: 42.99,
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Development',
    level: 'Beginner',
    rating: 4.6,
    reviews: 4201,
    enrollments: 11000,
    duration: '40h 45m',
    lessons: 315,
    featured: true,
    bestseller: false,
    tags: ['python', 'programming', 'data structures', 'algorithms'],
    createdAt: '2023-07-15T00:00:00.000Z',
    updatedAt: '2024-03-05T00:00:00.000Z',
    instructor: {
      id: '107',
      name: 'Robert Anderson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
      bio: 'Python developer with 12 years of experience building enterprise applications and teaching programming.',
      rating: 4.7,
      courses: 9,
      students: 47000
    },
    curriculum: {
      sections: [
        {
          title: 'Python Basics',
          lessons: [
            {
              id: '1-1',
              title: 'Introduction to Python',
              duration: '15m',
              type: 'video',
              preview: true
            }
          ]
        }
      ]
    }
  },
  {
    id: '8',
    title: 'UI/UX Design Bootcamp',
    description: 'Learn UI/UX design from the ground up. Master Figma, user research, wireframing, and create stunning user interfaces.',
    price: 89.99,
    discountPrice: 54.99,
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Design',
    level: 'All Levels',
    rating: 4.8,
    reviews: 2854,
    enrollments: 7800,
    duration: '35h 20m',
    lessons: 245,
    featured: true,
    bestseller: true,
    tags: ['UI design', 'UX design', 'Figma', 'wireframing'],
    createdAt: '2023-08-20T00:00:00.000Z',
    updatedAt: '2024-02-20T00:00:00.000Z',
    instructor: {
      id: '108',
      name: 'Sophia Martinez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
      bio: 'Senior UI/UX designer who has worked for Apple, Airbnb, and other top tech companies.',
      rating: 4.9,
      courses: 5,
      students: 32000
    },
    curriculum: {
      sections: [
        {
          title: 'Design Fundamentals',
          lessons: [
            {
              id: '1-1',
              title: 'What is UI/UX Design?',
              duration: '12m',
              type: 'video',
              preview: true
            }
          ]
        }
      ]
    }
  },
  {
    id: '9',
    title: 'Complete Guitar Lessons System - Beginner to Advanced',
    description: 'Learn to play guitar with a proven system that takes you from beginner to advanced, with practical exercises and songs.',
    price: 64.99,
    discountPrice: 32.99,
    thumbnail: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Music',
    level: 'All Levels',
    rating: 4.7,
    reviews: 3156,
    enrollments: 8500,
    duration: '48h 30m',
    lessons: 350,
    featured: false,
    bestseller: false,
    tags: ['guitar', 'music theory', 'acoustic guitar', 'electric guitar'],
    createdAt: '2023-03-05T00:00:00.000Z',
    updatedAt: '2023-12-15T00:00:00.000Z',
    instructor: {
      id: '109',
      name: 'James Thompson',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
      bio: 'Professional guitarist with 25 years of experience performing and teaching guitar around the world.',
      rating: 4.8,
      courses: 7,
      students: 34000
    },
    curriculum: {
      sections: [
        {
          title: 'Getting Started with Guitar',
          lessons: [
            {
              id: '1-1',
              title: 'Choosing Your First Guitar',
              duration: '20m',
              type: 'video',
              preview: true
            }
          ]
        }
      ]
    }
  },
  {
    id: '10',
    title: 'The Complete 2024 Web Development Bootcamp',
    description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, and more!',
    price: 94.99,
    discountPrice: 49.99,
    thumbnail: 'https://images.pexels.com/photos/1181290/pexels-photo-1181290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Development',
    level: 'All Levels',
    rating: 4.9,
    reviews: 5762,
    enrollments: 15000,
    duration: '65h 45m',
    lessons: 440,
    featured: true,
    bestseller: true,
    tags: ['web development', 'full-stack', 'javascript', 'react'],
    createdAt: '2023-09-10T00:00:00.000Z',
    updatedAt: '2024-03-15T00:00:00.000Z',
    instructor: {
      id: '110',
      name: 'Angela Yu',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
      bio: 'Lead developer and bootcamp instructor with over 8 years of teaching coding to thousands of students.',
      rating: 4.9,
      courses: 6,
      students: 65000
    },
    curriculum: {
      sections: [
        {
          title: 'Introduction to Web Development',
          lessons: [
            {
              id: '1-1',
              title: 'How the Internet Works',
              duration: '15m',
              type: 'video',
              preview: true
            }
          ]
        }
      ]
    }
  },
  {
    id: '11',
    title: 'iOS & Swift - The Complete iOS App Development Bootcamp',
    description: 'Learn iOS app development by building real apps. Master Swift, UIKit, and SwiftUI to create professional iOS applications.',
    price: 99.99,
    discountPrice: 54.99,
    thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Development',
    level: 'Intermediate',
    rating: 4.8,
    reviews: 4123,
    enrollments: 10200,
    duration: '55h 30m',
    lessons: 410,
    featured: true,
    bestseller: false,
    tags: ['iOS', 'Swift', 'mobile development', 'app development'],
    createdAt: '2023-05-25T00:00:00.000Z',
    updatedAt: '2024-01-20T00:00:00.000Z',
    instructor: {
      id: '111',
      name: 'John Smith',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
      bio: 'Former Apple engineer with extensive experience developing iOS applications for startups and enterprise companies.',
      rating: 4.8,
      courses: 4,
      students: 42000
    },
    curriculum: {
      sections: [
        {
          title: 'Getting Started with iOS Development',
          lessons: [
            {
              id: '1-1',
              title: 'Introduction to Xcode',
              duration: '18m',
              type: 'video',
              preview: true
            }
          ]
        }
      ]
    }
  },
  {
    id: '12',
    title: 'The Complete Copywriting Course: Write to Sell Like a Pro',
    description: 'Learn copywriting that sells products and services. Create powerful marketing materials that drive customer conversion.',
    price: 69.99,
    discountPrice: 37.99,
    thumbnail: 'https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Marketing',
    level: 'Beginner',
    rating: 4.6,
    reviews: 2873,
    enrollments: 7600,
    duration: '21h 15m',
    lessons: 185,
    featured: false,
    bestseller: false,
    tags: ['copywriting', 'marketing', 'sales', 'content writing'],
    createdAt: '2023-04-05T00:00:00.000Z',
    updatedAt: '2023-11-10T00:00:00.000Z',
    instructor: {
      id: '112',
      name: 'Emily Parker',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
      bio: 'Professional copywriter who has written for major brands like Nike, Coca-Cola, and Amazon.',
      rating: 4.7,
      courses: 3,
      students: 24000
    },
    curriculum: {
      sections: [
        {
          title: 'Copywriting Fundamentals',
          lessons: [
            {
              id: '1-1',
              title: 'What Makes Great Copy?',
              duration: '14m',
              type: 'video',
              preview: true
            }
          ]
        }
      ]
    }
  }
];