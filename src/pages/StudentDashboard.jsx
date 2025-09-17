import React, { useState, useMemo } from 'react';
import CourseList from '../components/CourseList';
import QuestCard from '../components/QuestCard';
import { courses, quests } from '../data';

export default function StudentDashboard() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Memoized filtering of quests based on the selected course
  // This logic remains the same and is still a best practice
  const filteredQuests = useMemo(() => {
    if (!selectedCourse) return [];
    return quests.filter(quest => quest.courseId === selectedCourse.id);
  }, [selectedCourse]);

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  // Render function for the quest view, now styled with Tailwind
  const renderQuestView = () => (
    <div>
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-green-800">
          {selectedCourse.title} Quests
        </h2>
        <button
          onClick={handleBackToCourses}
          className="py-2 px-4 border border-green-600 text-green-600 font-semibold rounded-lg shadow-md hover:bg-green-600 hover:text-white transition-colors duration-200"
        >
          &larr; Back to Courses
        </button>
      </div>

      {filteredQuests.length > 0 ? (
        // A responsive grid that shows 1, 2, or 3 columns based on screen size
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuests.map(quest => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600 italic">
            No quests available for this course yet. Check back later!
          </p>
        </div>
      )}
    </div>
  );

  const renderCourseSelection = () => (
    <CourseList courses={courses} onSelect={setSelectedCourse} />
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {selectedCourse ? renderQuestView() : renderCourseSelection()}
    </div>
  );
}