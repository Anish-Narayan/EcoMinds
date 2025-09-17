import React from 'react';

export default function CourseList({ courses, onSelect }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-100 rounded-lg">
        <p className="text-gray-600">No courses are available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Explore Your Eco-Journey
      </h2>
      
      {/* 
        A responsive grid layout. 
        - 1 column on small screens
        - 2 columns on medium screens
        - 3 columns on large screens
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          // Using a <button> element is better for accessibility than a styled <div>.
          // It's focusable and screen readers announce it as an interactive element.
          <button
            key={course.id}
            onClick={() => onSelect(course)}
            className="group bg-white rounded-xl shadow-lg p-6 text-left transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-bold text-green-800 group-hover:text-green-600 transition-colors">
                {course.title}
              </h3>
              <p className="mt-2 text-gray-600 flex-grow">
                {course.description}
              </p>
              <span className="mt-4 font-semibold text-green-600 self-start">
                Start Learning &rarr;
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}