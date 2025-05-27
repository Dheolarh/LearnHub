import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '../types/course';
import { mockCourses } from '../data/mockCourses';

interface CourseContextType {
  courses: Course[];
  featuredCourses: Course[];
  popularCourses: Course[];
  newCourses: Course[];
  savedCourses: Course[];
  purchasedCourses: Course[];
  toggleSave: (courseId: string) => void;
  isSaved: (courseId: string) => boolean;
  getCourseById: (courseId: string) => Course | undefined;
  purchaseCourses: (courseIds: string[]) => void;
  isPurchased: (courseId: string) => boolean;
  searchCourses: (query: string, filters?: {
    category?: string;
    level?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
  }) => Course[];
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>([]);
  const [purchasedCourseIds, setPurchasedCourseIds] = useState<string[]>([]);
  
  // Load saved and purchased courses from local storage
  useEffect(() => {
    const savedIds = localStorage.getItem('savedCourses');
    if (savedIds) {
      setSavedCourseIds(JSON.parse(savedIds));
    }
    
    const purchasedIds = localStorage.getItem('purchasedCourses');
    if (purchasedIds) {
      setPurchasedCourseIds(JSON.parse(purchasedIds));
    }
  }, []);
  
  // Save to local storage when changes occur
  useEffect(() => {
    localStorage.setItem('savedCourses', JSON.stringify(savedCourseIds));
  }, [savedCourseIds]);
  
  useEffect(() => {
    localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourseIds));
  }, [purchasedCourseIds]);
  
  // Derived state
  const featuredCourses = courses.filter(course => course.featured);
  const popularCourses = [...courses].sort((a, b) => b.enrollments - a.enrollments).slice(0, 8);
  const newCourses = [...courses].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8);
  const savedCourses = courses.filter(course => savedCourseIds.includes(course.id));
  const purchasedCourses = courses.filter(course => purchasedCourseIds.includes(course.id));
  
  // Toggle save course
  const toggleSave = (courseId: string) => {
    if (savedCourseIds.includes(courseId)) {
      setSavedCourseIds(savedCourseIds.filter(id => id !== courseId));
    } else {
      setSavedCourseIds([...savedCourseIds, courseId]);
    }
  };
  
  // Check if course is saved
  const isSaved = (courseId: string) => {
    return savedCourseIds.includes(courseId);
  };
  
  // Get course by ID
  const getCourseById = (courseId: string) => {
    return courses.find(course => course.id === courseId);
  };
  
  // Purchase courses
  const purchaseCourses = (courseIds: string[]) => {
    const newPurchasedIds = [...purchasedCourseIds];
    
    courseIds.forEach(id => {
      if (!newPurchasedIds.includes(id)) {
        newPurchasedIds.push(id);
      }
    });
    
    setPurchasedCourseIds(newPurchasedIds);
  };
  
  // Check if course is purchased
  const isPurchased = (courseId: string) => {
    return purchasedCourseIds.includes(courseId);
  };
  
  // Search and filter courses
  const searchCourses = (
    query: string, 
    filters?: {
      category?: string;
      level?: string;
      minPrice?: number;
      maxPrice?: number;
      rating?: number;
    }
  ) => {
    let filtered = [...courses];
    
    // Search by query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        course => 
          course.title.toLowerCase().includes(lowerQuery) || 
          course.description.toLowerCase().includes(lowerQuery) ||
          course.instructor.name.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Apply filters if provided
    if (filters) {
      if (filters.category) {
        filtered = filtered.filter(course => course.category === filters.category);
      }
      
      if (filters.level) {
        filtered = filtered.filter(course => course.level === filters.level);
      }
      
      if (filters.minPrice !== undefined) {
        filtered = filtered.filter(course => course.price >= filters.minPrice);
      }
      
      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(course => course.price <= filters.maxPrice);
      }
      
      if (filters.rating) {
        filtered = filtered.filter(course => course.rating >= filters.rating);
      }
    }
    
    return filtered;
  };
  
  const value = {
    courses,
    featuredCourses,
    popularCourses,
    newCourses,
    savedCourses,
    purchasedCourses,
    toggleSave,
    isSaved,
    getCourseById,
    purchaseCourses,
    isPurchased,
    searchCourses,
  };
  
  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};