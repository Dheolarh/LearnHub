export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  thumbnail: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number;
  reviews: number;
  enrollments: number;
  duration: string; // e.g., "10h 30m"
  lessons: number;
  featured: boolean;
  bestseller: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    rating: number;
    courses: number;
    students: number;
  };
  curriculum: {
    sections: {
      title: string;
      lessons: {
        id: string;
        title: string;
        duration: string;
        type: 'video' | 'quiz' | 'assignment';
        preview: boolean;
      }[];
    }[];
  };
}