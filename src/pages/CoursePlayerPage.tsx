import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/CourseContext';
import { 
  Menu, 
  X, 
  ChevronLeft, 
  Play, 
  CheckCircle, 
  Lock, 
  Download, 
  MessageSquare, 
  ThumbsUp, 
  Flag, 
  Settings,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CoursePlayerPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourseById, isPurchased } = useCourses();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(getCourseById(courseId || ''));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [videoQuality, setVideoQuality] = useState('Auto');
  const [showSettings, setShowSettings] = useState(false);
  
  useEffect(() => {
    if (courseId) {
      const foundCourse = getCourseById(courseId);
      setCourse(foundCourse);
      
      // Check if user has purchased this course
      if (foundCourse && !isPurchased(foundCourse.id)) {
        navigate(`/courses/${foundCourse.id}`);
      }
      
      // Load completed lessons from localStorage
      const savedCompletedLessons = localStorage.getItem(`completedLessons_${courseId}`);
      if (savedCompletedLessons) {
        setCompletedLessons(JSON.parse(savedCompletedLessons));
      }
    }
  }, [courseId, getCourseById, isPurchased, navigate]);
  
  // Save completed lessons to localStorage when updated
  useEffect(() => {
    if (courseId && completedLessons.length > 0) {
      localStorage.setItem(
        `completedLessons_${courseId}`, 
        JSON.stringify(completedLessons)
      );
    }
  }, [courseId, completedLessons]);
  
  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <p className="mt-2 text-gray-600">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/dashboard/my-courses"
            className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Back to My Courses
          </Link>
        </div>
      </div>
    );
  }
  
  const currentSection = course.curriculum.sections[activeSection];
  const currentLesson = currentSection?.lessons[activeLesson];
  
  // Toggle lesson completion
  const toggleLessonCompletion = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };
  
  // Navigate to specific lesson
  const goToLesson = (sectionIndex: number, lessonIndex: number) => {
    setActiveSection(sectionIndex);
    setActiveLesson(lessonIndex);
    setSidebarOpen(false);
  };
  
  // Calculate course progress
  const totalLessons = course.curriculum.sections.reduce(
    (total, section) => total + section.lessons.length, 
    0
  );
  
  const progressPercentage = 
    totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;
  
  return (
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
      {/* Top navigation */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link
            to="/dashboard/my-courses"
            className="mr-4 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ChevronLeft className="mr-1 h-5 w-5" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>
          
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {course.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentSection.title} - {currentLesson.title}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="hidden items-center rounded-full bg-gray-100 p-1 sm:flex dark:bg-gray-700">
            <span className="ml-2 mr-1 text-xs font-medium text-gray-700 dark:text-gray-300">
              {Math.round(progressPercentage)}%
            </span>
            <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <button className="hidden rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 sm:block">
            Next Lesson
          </button>
        </div>
      </header>
      
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Course sidebar - Mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
            >
              <div 
                className="absolute inset-0 bg-gray-600 bg-opacity-75"
                onClick={() => setSidebarOpen(false)}
              ></div>
              
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
                className="relative flex h-full w-3/4 max-w-xs flex-col overflow-y-auto bg-white pb-4 shadow-xl dark:bg-gray-800 sm:max-w-sm"
              >
                <div className="flex items-center justify-between p-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Course Content
                  </h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto px-4">
                  {course.curriculum.sections.map((section, sIndex) => (
                    <div key={sIndex} className="mb-4">
                      <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                      <ul className="space-y-1">
                        {section.lessons.map((lesson, lIndex) => {
                          const isActive = activeSection === sIndex && activeLesson === lIndex;
                          const isCompleted = completedLessons.includes(lesson.id);
                          
                          return (
                            <li key={lIndex}>
                              <button
                                onClick={() => goToLesson(sIndex, lIndex)}
                                className={`flex w-full items-start rounded-md px-3 py-2 text-left text-sm ${
                                  isActive 
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                }`}
                              >
                                <div className="mr-3 mt-0.5">
                                  {isCompleted ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Play className="h-4 w-4" />
                                  )}
                                </div>
                                <div>
                                  <span className="font-medium">{lesson.title}</span>
                                  <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <span>{lesson.duration}</span>
                                  </div>
                                </div>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Course sidebar - Desktop */}
        <div className="hidden w-80 flex-shrink-0 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 lg:block">
          <div className="flex h-full flex-col">
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Course Content
              </h2>
              <div className="mt-2 flex items-center">
                <div className="mr-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4">
              {course.curriculum.sections.map((section, sIndex) => (
                <div key={sIndex} className="mb-4">
                  <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.lessons.map((lesson, lIndex) => {
                      const isActive = activeSection === sIndex && activeLesson === lIndex;
                      const isCompleted = completedLessons.includes(lesson.id);
                      
                      return (
                        <li key={lIndex}>
                          <button
                            onClick={() => goToLesson(sIndex, lIndex)}
                            className={`flex w-full items-start rounded-md px-3 py-2 text-left text-sm ${
                              isActive 
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                          >
                            <div className="mr-3 mt-0.5">
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <span className="font-medium">{lesson.title}</span>
                              <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Video content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="relative flex-1 bg-black">
            {/* Video player would go here in a real application */}
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-white">
                <BookOpen className="mx-auto mb-4 h-16 w-16" />
                <h2 className="text-2xl font-bold">
                  {currentLesson.title}
                </h2>
                <p className="mt-2 text-gray-300">
                  {currentSection.title}
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => toggleLessonCompletion(currentLesson.id)}
                    className={`rounded-md px-4 py-2 font-medium ${
                      completedLessons.includes(currentLesson.id)
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {completedLessons.includes(currentLesson.id)
                      ? 'Mark as Incomplete'
                      : 'Mark as Complete'}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Video controls overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="text-white hover:text-gray-300">
                    <Play className="h-6 w-6 fill-white" />
                  </button>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setShowSettings(!showSettings)}
                      className="text-white hover:text-gray-300"
                    >
                      <Settings className="h-5 w-5" />
                    </button>
                    
                    {showSettings && (
                      <div className="absolute bottom-10 left-0 w-48 rounded-md bg-gray-800 p-2 shadow-lg">
                        <div className="mb-2">
                          <p className="mb-1 text-xs font-medium text-gray-400">Playback Speed</p>
                          <div className="flex flex-wrap gap-1">
                            {[0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0].map((speed) => (
                              <button
                                key={speed}
                                onClick={() => setPlaybackSpeed(speed)}
                                className={`rounded px-2 py-1 text-xs ${
                                  playbackSpeed === speed
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700'
                                }`}
                              >
                                {speed}x
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="mb-1 text-xs font-medium text-gray-400">Quality</p>
                          <div className="flex flex-wrap gap-1">
                            {['Auto', '1080p', '720p', '480p', '360p'].map((quality) => (
                              <button
                                key={quality}
                                onClick={() => setVideoQuality(quality)}
                                className={`rounded px-2 py-1 text-xs ${
                                  videoQuality === quality
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700'
                                }`}
                              >
                                {quality}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-white">
                  <button className="hidden hover:text-gray-300 sm:block">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="hover:text-gray-300">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                  <button className="hover:text-gray-300">
                    <ThumbsUp className="h-5 w-5" />
                  </button>
                  <button className="hover:text-gray-300">
                    <Flag className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lesson information */}
          <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {currentLesson.title}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {currentLesson.duration} • {currentLesson.type}
            </p>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleLessonCompletion(currentLesson.id)}
                  className={`flex items-center rounded-md px-3 py-1.5 text-sm font-medium ${
                    completedLessons.includes(currentLesson.id)
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {completedLessons.includes(currentLesson.id) ? (
                    <>
                      <CheckCircle className="mr-1.5 h-4 w-4" />
                      Completed
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-1.5 h-4 w-4" />
                      Mark as Complete
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex space-x-2">
                {activeLesson > 0 && (
                  <button
                    onClick={() => goToLesson(activeSection, activeLesson - 1)}
                    className="flex items-center rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </button>
                )}
                
                {activeLesson < currentSection.lessons.length - 1 ? (
                  <button
                    onClick={() => goToLesson(activeSection, activeLesson + 1)}
                    className="flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Next
                    <ChevronLeft className="ml-1 h-4 w-4 rotate-180" />
                  </button>
                ) : activeSection < course.curriculum.sections.length - 1 ? (
                  <button
                    onClick={() => goToLesson(activeSection + 1, 0)}
                    className="flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Next Section
                    <ChevronLeft className="ml-1 h-4 w-4 rotate-180" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerPage;