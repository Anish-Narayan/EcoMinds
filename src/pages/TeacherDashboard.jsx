import React, { useState, useMemo } from 'react';
import { courses as initialCourses, quests, students, studentProgress } from '../data';

export default function TeacherDashboard() {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourseTitle, setNewCourseTitle] = useState('');

  // Memoize analytics calculation for performance
  const courseAnalytics = useMemo(() => {
    if (!selectedCourse) return [];

    const questsForCourse = quests.filter(q => q.courseId === selectedCourse.id);
    if (questsForCourse.length === 0) return [];

    return students.map(student => {
      const progress = studentProgress.find(p => p.studentId === student.id && p.courseId === selectedCourse.id);
      const completedCount = progress ? progress.completedQuestIds.length : 0;
      const completionPercentage = (completedCount / questsForCourse.length) * 100;
      return {
        studentName: student.name,
        completionPercentage: Math.round(completionPercentage),
      };
    });
  }, [selectedCourse]);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleAddNewCourse = (e) => {
    e.preventDefault();
    if (newCourseTitle.trim() === '') return;

    const newCourse = {
      id: Date.now(), // simple unique id
      title: newCourseTitle,
      description: 'Newly added course description.'
    };
    setCourses([...courses, newCourse]);
    setNewCourseTitle('');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Teacher Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Course List and Management */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Manage Courses</h2>
            <div className="space-y-2 mb-6">
              {courses.map(course => (
                <button
                  key={course.id}
                  onClick={() => handleSelectCourse(course)}
                  className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
                    selectedCourse?.id === course.id
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'bg-gray-50 hover:bg-gray-200'
                  }`}
                >
                  {course.title}
                </button>
              ))}
            </div>
            <form onSubmit={handleAddNewCourse} className="space-y-3 border-t pt-4">
              <h3 className="font-semibold text-lg">Add New Course</h3>
              <input
                type="text"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                placeholder="Enter new course title"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Add Course
              </button>
            </form>
          </div>

          {/* Right Column: Course Details and Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {selectedCourse ? (
              <>
                {/* Course Details Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-3xl font-bold text-green-800">{selectedCourse.title}</h2>
                  <p className="mt-2 text-gray-600">{selectedCourse.description}</p>
                </div>
                
                {/* Quests Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Quests in this Course</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {quests.filter(q => q.courseId === selectedCourse.id).map(q => <li key={q.id}>{q.title} - {q.points} points</li>)}
                  </ul>
                </div>

                {/* Student Analytics Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Student Analytics</h3>
                  <div className="space-y-4">
                    {courseAnalytics.length > 0 ? courseAnalytics.map(stat => (
                      <div key={stat.studentName}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-gray-700">{stat.studentName}</span>
                          <span className="text-sm font-medium text-green-700">{stat.completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${stat.completionPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )) : <p className="text-gray-500">No student data available for this course.</p>}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold text-gray-700">Welcome, Teacher!</h2>
                <p className="mt-4 text-gray-500">Please select a course from the left to view its details, manage quests, and see student analytics.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}