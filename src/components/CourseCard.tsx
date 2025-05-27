import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Users } from 'lucide-react';
import { Course } from '../types/course';
import { useCourses } from '../contexts/CourseContext';
import { motion } from 'framer-motion';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { toggleSave, isSaved, isPurchased } = useCourses();
  
  const saved = isSaved(course.id);
  const purchased = isPurchased(course.id);
  
  return (
    <motion.div 
      className="card group overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <Link to={`/courses/${course.id}`}>
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Bestseller badge */}
        {course.bestseller && (
          <span className="absolute left-2 top-2 rounded bg-yellow-500 px-2 py-1 text-xs font-bold text-white">
            Bestseller
          </span>
        )}
        
        {/* Save button */}
        <button 
          onClick={() => toggleSave(course.id)}
          className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-gray-600 shadow-md transition hover:bg-gray-100 hover:text-red-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-red-400"
          aria-label={saved ? "Unsave course" : "Save course"}
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>
      
      <div className="p-4">
        {/* Category and level */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
            {course.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {course.level}
          </span>
        </div>
        
        {/* Title */}
        <Link to={`/courses/${course.id}`}>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-gray-900 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
            {course.title}
          </h3>
        </Link>
        
        {/* Instructor */}
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
          {course.instructor.name}
        </p>
        
        {/* Rating */}
        <div className="mb-2 flex items-center">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 mr-1 font-medium">{course.rating}</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({course.reviews.toLocaleString()} reviews)
          </span>
          <div className="ml-auto flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Users className="mr-1 h-3 w-3" />
            {course.enrollments.toLocaleString()}
          </div>
        </div>
        
        {/* Duration and Lessons */}
        <div className="mb-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
          <span>{course.duration}</span>
          <span className="mx-2">•</span>
          <span>{course.lessons} lessons</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          {purchased ? (
            <Link 
              to={`/learn/${course.id}`}
              className="w-full rounded bg-green-600 px-3 py-1.5 text-center text-sm font-medium text-white transition hover:bg-green-700"
            >
              Continue Learning
            </Link>
          ) : (
            <>
              <div className="flex items-center">
                {course.discountPrice ? (
                  <>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${course.discountPrice.toFixed(2)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through dark:text-gray-400">
                      ${course.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${course.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <Link 
                to={`/courses/${course.id}`}
                className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Details
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;