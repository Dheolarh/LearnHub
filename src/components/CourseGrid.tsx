import React from 'react';
import CourseCard from './CourseCard';
import { Course } from '../types/course';

interface CourseGridProps {
  courses: Course[];
  title?: string;
  description?: string;
}

const CourseGrid: React.FC<CourseGridProps> = ({ 
  courses, 
  title, 
  description 
}) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No courses found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }
  
  return (
    <div className="my-8">
      {title && (
        <div className="mb-6 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;