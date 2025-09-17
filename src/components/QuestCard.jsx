import React from 'react';

// An icon component for demonstration. In a real app, you'd use a library like react-icons.
const StarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function QuestCard({ quest }) {
  const isCompleted = quest.completed;

  return (
    // Base card styling with transition for smooth changes
    <div
      className={`relative bg-white rounded-lg shadow-md p-5 flex flex-col justify-between transition-all duration-300 border-l-4 ${
        isCompleted ? 'border-green-500 bg-gray-50' : 'border-blue-500'
      }`}
    >
      {/* "COMPLETED" Badge (only shown if the quest is completed) */}
      {isCompleted && (
        <span className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
          Completed
        </span>
      )}

      <div>
        <h3 className={`text-lg font-bold ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
          {quest.title}
        </h3>
      </div>
      
      <div className="mt-4 flex items-center justify-end">
        <span className={`flex items-center font-bold text-sm ${isCompleted ? 'text-gray-400' : 'text-yellow-500'}`}>
          <StarIcon />
          <span className="ml-1">{quest.points} Points</span>
        </span>
      </div>
    </div>
  );
}