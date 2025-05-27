import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/CourseContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Play, 
  CheckCircle, 
  Star, 
  Users, 
  Clock, 
  Award, 
  Heart, 
  BookOpen, 
  Globe, 
  BarChart, 
  ChevronDown, 
  ChevronUp,
  AlertCircle,
  ShoppingCart
} from 'lucide-react';
import { motion } from 'framer-motion';

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourseById, toggleSave, isSaved, isPurchased } = useCourses();
  const { addItem, isInCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(getCourseById(courseId || ''));
  const [activeSection, setActiveSection] = useState<number | null>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const saved = courseId ? isSaved(courseId) : false;
  const purchased = courseId ? isPurchased(courseId) : false;
  const inCart = courseId ? isInCart(courseId) : false;
  
  useEffect(() => {
    if (courseId) {
      const foundCourse = getCourseById(courseId);
      setCourse(foundCourse);
      
      // Scroll to top when course changes
      window.scrollTo(0, 0);
      
      // Reset state
      setActiveSection(0);
      setIsVideoPlaying(false);
    }
  }, [courseId, getCourseById]);
  
  // Handle if course is not found
  if (!course) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Course Not Found</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/courses"
            className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }
  
  // Toggle curriculum section
  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };
  
  // Play sample video
  const playVideo = () => {
    setIsVideoPlaying(true);
  };
  
  // Add to cart handler
  const handleAddToCart = () => {
    if (purchased) {
      navigate(`/learn/${course.id}`);
    } else if (inCart) {
      navigate('/cart');
    } else {
      addItem(course);
      navigate('/cart');
    }
  };
  
  // Buy now handler
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/${course.id}` } });
      return;
    }
    
    if (!inCart) {
      addItem(course);
    }
    navigate('/checkout');
  };
  
  // Save course handler
  const handleSave = () => {
    if (courseId) {
      toggleSave(courseId);
    }
  };
  
  // Total course content calculation
  const totalLessons = course.curriculum.sections.reduce(
    (total, section) => total + section.lessons.length, 0
  );
  
  // Calculate number of preview lessons
  const previewLessons = course.curriculum.sections.reduce(
    (total, section) => 
      total + section.lessons.filter(lesson => lesson.preview).length, 
    0
  );
  
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Course header with preview */}
      <div className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="mb-2 flex items-center">
                <Link 
                  to={`/courses?category=${course.category}`}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  {course.category}
                </Link>
                <span className="mx-2">•</span>
                <span className="text-sm text-gray-300">{course.level}</span>
              </div>
              
              <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
                {course.title}
              </h1>
              
              <p className="mb-6 text-lg text-gray-300">
                {course.description}
              </p>
              
              <div className="mb-4 flex flex-wrap items-center text-sm">
                <div className="mr-4 flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="ml-1 text-gray-300">
                    ({course.reviews.toLocaleString()} reviews)
                  </span>
                </div>
                
                <div className="mr-4 flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{course.enrollments.toLocaleString()} students</span>
                </div>
                
                <div className="mr-4 flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                
                <div className="flex items-center">
                  <BookOpen className="mr-1 h-4 w-4" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>
              
              <div className="mb-6">
                <span className="text-lg">Created by </span>
                <Link 
                  to={`/instructor/${course.instructor.id}`}
                  className="text-lg text-blue-400 hover:text-blue-300"
                >
                  {course.instructor.name}
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/courses?search=${tag}`}
                    className="rounded-full bg-gray-700 px-3 py-1 text-xs hover:bg-gray-600"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <div className="relative mx-auto max-w-md overflow-hidden rounded-lg shadow-lg">
                {isVideoPlaying ? (
                  <div className="aspect-w-16 aspect-h-9 h-64 w-full bg-black">
                    {/* This would be a real video player in a production app */}
                    <div className="flex h-full items-center justify-center">
                      <p className="text-center text-white">
                        Video player would appear here
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-64 w-full object-cover"
                    />
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30"
                      onClick={playVideo}
                    >
                      <button
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
                        aria-label="Play preview video"
                      >
                        <Play className="h-8 w-8 fill-white" />
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="bg-white p-6 dark:bg-gray-800">
                  <div className="mb-4 flex items-baseline justify-between">
                    <div>
                      {course.discountPrice ? (
                        <div className="flex items-center">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            ${course.discountPrice.toFixed(2)}
                          </span>
                          <span className="ml-2 text-lg text-gray-500 line-through dark:text-gray-400">
                            ${course.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${course.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    {course.discountPrice && (
                      <span className="rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-100">
                        {Math.round((1 - course.discountPrice / course.price) * 100)}% off
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-4 space-y-3">
                    <button
                      onClick={handleAddToCart}
                      className="w-full rounded-md bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                      {purchased 
                        ? 'Go to Course' 
                        : inCart 
                          ? 'Go to Cart' 
                          : 'Add to Cart'}
                    </button>
                    
                    {!purchased && (
                      <button
                        onClick={handleBuyNow}
                        className="w-full rounded-md border border-gray-300 bg-white py-3 font-medium text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    30-Day Money-Back Guarantee
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Full lifetime access</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Access on mobile and TV</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Certificate of completion</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleSave}
                      className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <Heart className={`mr-1 h-4 w-4 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
                      {saved ? 'Saved' : 'Save for later'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course content */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {/* What you'll learn */}
              <section className="mb-10 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  What you'll learn
                </h2>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {[
                    'Build professional web applications with HTML, CSS, and JavaScript',
                    'Create responsive designs that work on all devices',
                    'Implement modern JavaScript features and frameworks',
                    'Deploy your applications to production',
                    'Work with APIs and external data sources',
                    'Understand web development best practices'
                  ].map((item, index) => (
                    <div key={index} className="flex">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Course content / curriculum */}
              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Course Content
                </h2>
                <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <span>{course.curriculum.sections.length} sections</span>
                  <span>•</span>
                  <span>{totalLessons} lectures</span>
                  <span>•</span>
                  <span>{course.duration} total length</span>
                </div>
                
                <div className="mb-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  {course.curriculum.sections.map((section, sIndex) => (
                    <div 
                      key={sIndex}
                      className={`border-b border-gray-200 dark:border-gray-700 ${
                        sIndex === course.curriculum.sections.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <button
                        onClick={() => toggleSection(sIndex)}
                        className="flex w-full items-center justify-between bg-gray-50 p-4 text-left transition hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {section.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {section.lessons.length} lectures
                          </p>
                        </div>
                        {activeSection === sIndex ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      
                      {activeSection === sIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {section.lessons.map((lesson, lIndex) => (
                            <div 
                              key={lIndex}
                              className={`flex items-center justify-between border-t border-gray-200 p-4 dark:border-gray-700 ${
                                lesson.preview ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20' : ''
                              }`}
                            >
                              <div className="flex items-center">
                                {lesson.preview ? (
                                  <Play className="mr-3 h-4 w-4 text-blue-600" />
                                ) : (
                                  <BookOpen className="mr-3 h-4 w-4 text-gray-400" />
                                )}
                                <div>
                                  <h4 className="text-gray-900 dark:text-white">
                                    {lesson.title}
                                  </h4>
                                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <span className="mr-2">{lesson.duration}</span>
                                    <span className="mr-2">•</span>
                                    <span>{lesson.type}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {lesson.preview && (
                                <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                  Preview
                                </span>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
                
                {previewLessons > 0 && (
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {previewLessons} lessons available for free preview
                  </p>
                )}
              </section>
              
              {/* Requirements */}
              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Requirements
                </h2>
                <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Basic computer knowledge</li>
                  <li>No prior programming experience needed - we'll teach you everything from scratch</li>
                  <li>A computer with internet connection (Windows, Mac, or Linux)</li>
                </ul>
              </section>
              
              {/* Description */}
              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Description
                </h2>
                <div className="prose max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
                  <p className="mb-4">
                    {course.description}
                  </p>
                  <p className="mb-4">
                    This comprehensive course is designed for anyone who wants to learn web development from the ground up. Whether you're a complete beginner or have some experience, this course will take you from the basics to advanced concepts.
                  </p>
                  <p className="mb-4">
                    By the end of this course, you'll have the skills and knowledge to build your own web applications from scratch, and you'll have a portfolio of projects to showcase to potential employers or clients.
                  </p>
                  <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
                    Why take this course?
                  </h3>
                  <ul className="list-inside list-disc space-y-2">
                    <li>Comprehensive curriculum covering all aspects of web development</li>
                    <li>Hands-on projects that reinforce your learning</li>
                    <li>Real-world examples that demonstrate best practices</li>
                    <li>Supportive community of fellow learners</li>
                    <li>Regular updates to keep the content fresh and relevant</li>
                  </ul>
                </div>
              </section>
            </div>
            
            <div>
              {/* Instructor */}
              <section className="mb-10 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Instructor
                </h2>
                <div className="mb-4 flex items-center">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="mr-4 h-16 w-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-blue-600 dark:text-blue-400">
                      <Link to={`/instructor/${course.instructor.id}`}>
                        {course.instructor.name}
                      </Link>
                    </h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.instructor.rating} Instructor Rating</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{course.instructor.courses} Courses</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{course.instructor.students.toLocaleString()} Students</span>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300">
                  {course.instructor.bio}
                </p>
              </section>
              
              {/* Course includes */}
              <section className="mb-10 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  This course includes:
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Globe className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Full lifetime access</span>
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <BookOpen className="mr-3 h-5 w-5 text-gray-500" />
                    <span>{course.lessons} lessons</span>
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Clock className="mr-3 h-5 w-5 text-gray-500" />
                    <span>{course.duration} of video content</span>
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <BarChart className="mr-3 h-5 w-5 text-gray-500" />
                    <span>20 coding exercises</span>
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <Award className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </section>
              
              {/* Call to action for mobile */}
              <div className="fixed bottom-0 left-0 w-full border-t border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800 lg:hidden">
                <div className="flex items-center justify-between">
                  <div>
                    {course.discountPrice ? (
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${course.discountPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                          ${course.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${course.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                  >
                    {purchased 
                      ? 'Go to Course' 
                      : inCart 
                        ? 'Go to Cart' 
                        : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;