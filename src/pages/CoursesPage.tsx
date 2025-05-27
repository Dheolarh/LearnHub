import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCourses } from '../contexts/CourseContext';
import CourseGrid from '../components/CourseGrid';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CoursesPage: React.FC = () => {
  const { courses, searchCourses } = useCourses();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [selectedRating, setSelectedRating] = useState<number | undefined>();
  
  // UI state
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    levels: true,
    price: true,
    rating: true
  });
  
  // Get unique categories and levels for filters
  const categories = [...new Set(courses.map(course => course.category))];
  const levels = [...new Set(courses.map(course => course.level))];
  
  // Initialize filters from URL params
  useEffect(() => {
    const query = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const level = searchParams.get('level') || '';
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const ratingParam = searchParams.get('rating');
    
    setSearchQuery(query);
    setSelectedCategory(category);
    setSelectedLevel(level);
    setMinPrice(minPriceParam ? Number(minPriceParam) : undefined);
    setMaxPrice(maxPriceParam ? Number(maxPriceParam) : undefined);
    setSelectedRating(ratingParam ? Number(ratingParam) : undefined);
  }, [searchParams]);
  
  // Apply filters and update URL
  useEffect(() => {
    // Apply filters
    const filtered = searchCourses(searchQuery, {
      category: selectedCategory || undefined,
      level: selectedLevel || undefined,
      minPrice,
      maxPrice,
      rating: selectedRating
    });
    
    setFilteredCourses(filtered);
    
    // Update URL params
    const params: Record<string, string> = {};
    
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedLevel) params.level = selectedLevel;
    if (minPrice !== undefined) params.minPrice = minPrice.toString();
    if (maxPrice !== undefined) params.maxPrice = maxPrice.toString();
    if (selectedRating !== undefined) params.rating = selectedRating.toString();
    
    setSearchParams(params, { replace: true });
  }, [
    searchQuery, 
    selectedCategory, 
    selectedLevel, 
    minPrice, 
    maxPrice, 
    selectedRating, 
    searchCourses, 
    setSearchParams
  ]);
  
  // Toggle filter sections on mobile
  const toggleFilterSection = (section: keyof typeof expandedFilters) => {
    setExpandedFilters({
      ...expandedFilters,
      [section]: !expandedFilters[section]
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLevel('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSelectedRating(undefined);
  };
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Browse All Courses
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Discover courses to boost your skills and advance your career
          </p>
        </div>
        
        {/* Search and mobile filter button */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="flex w-full sm:w-auto">
            <div className="relative flex-1">
              <input
                type="search"
                placeholder="Search courses..."
                className="w-full min-w-[240px] rounded-l-md border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            </div>
            <button
              type="submit"
              className="rounded-r-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Search
            </button>
          </form>
          
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:hidden"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row">
          {/* Desktop Filters */}
          <div className="mb-6 hidden w-64 shrink-0 lg:block">
            <div className="sticky top-20 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
                {(selectedCategory || selectedLevel || minPrice || maxPrice || selectedRating) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              {/* Categories */}
              <div className="mb-4 border-b border-gray-200 pb-4 dark:border-gray-700">
                <button
                  onClick={() => toggleFilterSection('categories')}
                  className="mb-2 flex w-full items-center justify-between text-left font-medium text-gray-900 dark:text-white"
                >
                  <span>Categories</span>
                  {expandedFilters.categories ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                
                {expandedFilters.categories && (
                  <div className="mt-2 space-y-1">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {category}
                        </span>
                      </label>
                    ))}
                    {selectedCategory && (
                      <button
                        onClick={() => setSelectedCategory('')}
                        className="flex items-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <X className="mr-1 h-3 w-3" />
                        Clear category
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              {/* Levels */}
              <div className="mb-4 border-b border-gray-200 pb-4 dark:border-gray-700">
                <button
                  onClick={() => toggleFilterSection('levels')}
                  className="mb-2 flex w-full items-center justify-between text-left font-medium text-gray-900 dark:text-white"
                >
                  <span>Levels</span>
                  {expandedFilters.levels ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                
                {expandedFilters.levels && (
                  <div className="mt-2 space-y-1">
                    {levels.map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="radio"
                          name="level"
                          checked={selectedLevel === level}
                          onChange={() => setSelectedLevel(level)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {level}
                        </span>
                      </label>
                    ))}
                    {selectedLevel && (
                      <button
                        onClick={() => setSelectedLevel('')}
                        className="flex items-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <X className="mr-1 h-3 w-3" />
                        Clear level
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              {/* Price Range */}
              <div className="mb-4 border-b border-gray-200 pb-4 dark:border-gray-700">
                <button
                  onClick={() => toggleFilterSection('price')}
                  className="mb-2 flex w-full items-center justify-between text-left font-medium text-gray-900 dark:text-white"
                >
                  <span>Price Range</span>
                  {expandedFilters.price ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                
                {expandedFilters.price && (
                  <div className="mt-2 space-y-3">
                    <div className="flex items-center">
                      <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">$</span>
                      <input
                        type="number"
                        placeholder="Min"
                        min="0"
                        value={minPrice ?? ''}
                        onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                      <span className="mx-2 text-gray-600 dark:text-gray-400">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        min="0"
                        value={maxPrice ?? ''}
                        onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    {(minPrice !== undefined || maxPrice !== undefined) && (
                      <button
                        onClick={() => {
                          setMinPrice(undefined);
                          setMaxPrice(undefined);
                        }}
                        className="flex items-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <X className="mr-1 h-3 w-3" />
                        Clear price
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              {/* Rating */}
              <div className="mb-4">
                <button
                  onClick={() => toggleFilterSection('rating')}
                  className="mb-2 flex w-full items-center justify-between text-left font-medium text-gray-900 dark:text-white"
                >
                  <span>Rating</span>
                  {expandedFilters.rating ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                
                {expandedFilters.rating && (
                  <div className="mt-2 space-y-1">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRating === rating}
                          onChange={() => setSelectedRating(rating)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                        />
                        <span className="ml-2 flex items-center text-sm text-gray-700 dark:text-gray-300">
                          {rating}+ stars
                        </span>
                      </label>
                    ))}
                    {selectedRating && (
                      <button
                        onClick={() => setSelectedRating(undefined)}
                        className="flex items-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <X className="mr-1 h-3 w-3" />
                        Clear rating
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Mobile Filters Sidebar */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 flex lg:hidden"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black"
                  onClick={() => setMobileFiltersOpen(false)}
                />
                
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ ease: 'easeInOut', duration: 0.3 }}
                  className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl dark:bg-gray-800"
                >
                  <div className="flex items-center justify-between px-4 py-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  
                  {/* Filter sections - same as desktop but in mobile sidebar */}
                  <div className="px-4">
                    {/* Categories */}
                    <div className="mb-4 border-b border-gray-200 pb-4 dark:border-gray-700">
                      <button
                        onClick={() => toggleFilterSection('categories')}
                        className="mb-2 flex w-full items-center justify-between text-left font-medium text-gray-900 dark:text-white"
                      >
                        <span>Categories</span>
                        {expandedFilters.categories ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      
                      {expandedFilters.categories && (
                        <div className="mt-2 space-y-1">
                          {categories.map((category) => (
                            <label key={category} className="flex items-center">
                              <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === category}
                                onChange={() => setSelectedCategory(category)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                {category}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Levels - Similar structure as categories */}
                    <div className="mb-4 border-b border-gray-200 pb-4 dark:border-gray-700">
                      <button
                        onClick={() => toggleFilterSection('levels')}
                        className="mb-2 flex w-full items-center justify-between text-left font-medium text-gray-900 dark:text-white"
                      >
                        <span>Levels</span>
                        {expandedFilters.levels ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      
                      {expandedFilters.levels && (
                        <div className="mt-2 space-y-1">
                          {levels.map((level) => (
                            <label key={level} className="flex items-center">
                              <input
                                type="radio"
                                name="level"
                                checked={selectedLevel === level}
                                onChange={() => setSelectedLevel(level)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                {level}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Price Range */}
                    <div className="mb-4 border-b border-gray-200 pb-4 dark:border-gray-700">
                      <button
                        onClick={() => toggleFilterSection('price')}
                        className="mb-2 flex w-full items-center justify-between text-left font-medium text-gray-900 dark:text-white"
                      >
                        <span>Price Range</span>
                        {expandedFilters.price ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      
                      {expandedFilters.price && (
                        <div className="mt-2 space-y-3">
                          <div className="flex items-center">
                            <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">$</span>
                            <input
                              type="number"
                              placeholder="Min"
                              min="0"
                              value={minPrice ?? ''}
                              onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                              className="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                            <span className="mx-2 text-gray-600 dark:text-gray-400">-</span>
                            <input
                              type="number"
                              placeholder="Max"
                              min="0"
                              value={maxPrice ?? ''}
                              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                              className="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Rating */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleFilterSection('rating')}
                        className="mb-2 flex w-full items-center justify-between text-left font-medium text-gray-900 dark:text-white"
                      >
                        <span>Rating</span>
                        {expandedFilters.rating ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      
                      {expandedFilters.rating && (
                        <div className="mt-2 space-y-1">
                          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                            <label key={rating} className="flex items-center">
                              <input
                                type="radio"
                                name="rating"
                                checked={selectedRating === rating}
                                onChange={() => setSelectedRating(rating)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                              />
                              <span className="ml-2 flex items-center text-sm text-gray-700 dark:text-gray-300">
                                {rating}+ stars
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Action buttons */}
                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={clearFilters}
                        className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => setMobileFiltersOpen(false)}
                        className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Course List */}
          <div className="w-full lg:pl-8">
            {/* Active filters */}
            {(selectedCategory || selectedLevel || minPrice || maxPrice || selectedRating) && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <div className="flex items-center rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">
                  <SlidersHorizontal className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Active filters:</span>
                </div>
                
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                  >
                    {selectedCategory}
                    <X className="ml-1 h-4 w-4" />
                  </button>
                )}
                
                {selectedLevel && (
                  <button
                    onClick={() => setSelectedLevel('')}
                    className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                  >
                    {selectedLevel}
                    <X className="ml-1 h-4 w-4" />
                  </button>
                )}
                
                {(minPrice !== undefined || maxPrice !== undefined) && (
                  <button
                    onClick={() => {
                      setMinPrice(undefined);
                      setMaxPrice(undefined);
                    }}
                    className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                  >
                    {minPrice !== undefined && maxPrice !== undefined
                      ? `$${minPrice} - $${maxPrice}`
                      : minPrice !== undefined
                      ? `Min: $${minPrice}`
                      : `Max: $${maxPrice}`}
                    <X className="ml-1 h-4 w-4" />
                  </button>
                )}
                
                {selectedRating && (
                  <button
                    onClick={() => setSelectedRating(undefined)}
                    className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                  >
                    {selectedRating}+ Rating
                    <X className="ml-1 h-4 w-4" />
                  </button>
                )}
                
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Clear all
                </button>
              </div>
            )}
            
            {/* Results count */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            {/* Courses grid */}
            <CourseGrid courses={filteredCourses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;