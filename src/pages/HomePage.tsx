import React from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../contexts/CourseContext';
import CourseGrid from '../components/CourseGrid';
import { ArrowRight, BookOpen, Users, Award, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const { featuredCourses, popularCourses, newCourses } = useCourses();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Expand Your Skills, Advance Your Career
              </h1>
              <p className="mb-8 text-lg text-blue-100 md:text-xl">
                Learn from industry experts and gain the skills you need to succeed in today's competitive world.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/courses"
                  className="rounded-md bg-white px-6 py-3 text-base font-medium text-blue-700 shadow-md transition hover:bg-gray-100"
                >
                  Explore Courses
                </Link>
                <Link
                  to="/register"
                  className="rounded-md border border-white bg-transparent px-6 py-3 text-base font-medium text-white transition hover:bg-blue-700"
                >
                  Join For Free
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <img
                src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Students learning online"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 rounded-lg bg-white p-4 shadow-lg">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-600" />
                  <span className="text-lg font-bold text-gray-900">10M+ Students</span>
                </div>
              </div>
              <div className="absolute -right-6 -top-6 rounded-lg bg-white p-4 shadow-lg">
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                  <span className="text-lg font-bold text-gray-900">1,000+ Courses</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-white py-12 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">10M+</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Students</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,000+</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Courses</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">150+</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Instructors</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Languages</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CourseGrid 
            courses={featuredCourses} 
            title="Featured Courses" 
            description="Handpicked courses recommended by our team"
          />
          <div className="mt-8 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all courses
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="bg-white py-16 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Top Categories
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Explore our most popular course categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: 'Development', icon: <BookOpen className="h-8 w-8 text-blue-600" /> },
              { name: 'Business', icon: <Award className="h-8 w-8 text-blue-600" /> },
              { name: 'Design', icon: <BookOpen className="h-8 w-8 text-blue-600" /> },
              { name: 'Marketing', icon: <Globe className="h-8 w-8 text-blue-600" /> },
              { name: 'Photography', icon: <BookOpen className="h-8 w-8 text-blue-600" /> },
              { name: 'Music', icon: <Award className="h-8 w-8 text-blue-600" /> },
            ].map((category, index) => (
              <Link
                key={index}
                to={`/courses?category=${category.name}`}
                className="group rounded-lg bg-gray-50 p-6 text-center transition hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-blue-600"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 transition group-hover:bg-white dark:bg-blue-900">
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-900 transition group-hover:text-white dark:text-white">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Courses */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CourseGrid 
            courses={popularCourses} 
            title="Most Popular" 
            description="Courses loved by thousands of students"
          />
        </div>
      </section>
      
      {/* New Courses */}
      <section className="bg-white py-16 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CourseGrid 
            courses={newCourses} 
            title="New & Trending" 
            description="Our latest course additions"
          />
        </div>
      </section>
      
      {/* Become an Instructor */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Become an Instructor
              </h2>
              <p className="mb-6 text-lg text-blue-100">
                Join our community of expert instructors and share your knowledge with students around the world. Create engaging courses and earn revenue.
              </p>
              <Link
                to="/become-instructor"
                className="inline-block rounded-md bg-white px-6 py-3 font-medium text-blue-700 transition hover:bg-gray-100"
              >
                Start Teaching Today
              </Link>
            </div>
            <div className="relative mx-auto max-w-md">
              <img
                src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Teacher preparing course"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              What Our Students Say
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Hear from students who have achieved their goals with LearnHub
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Alex Morgan',
                role: 'Web Developer',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
                quote: 'The Complete Web Development Bootcamp was exactly what I needed to transition into tech. I went from knowing nothing to building full-stack applications in just 3 months.',
              },
              {
                name: 'Michael Chen',
                role: 'Data Scientist',
                image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
                quote: 'The Machine Learning course provided practical, hands-on experience that my university education lacked. Now I\'m working at my dream company thanks to the skills I gained.',
              },
              {
                name: 'Sarah Johnson',
                role: 'Marketing Specialist',
                image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
                quote: 'I took the Digital Marketing Masterclass and was able to implement strategies immediately in my job. My campaigns now perform 40% better and I got promoted!',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
              >
                <div className="mb-4 flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="mr-4 h-12 w-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;