// data.js

export const courses = [
  { id: 1, title: 'Waste Management 101', description: 'Learn the basics of waste segregation and recycling.' },
  { id: 2, title: 'Water Conservation', description: 'Techniques to save water at home and in the community.' },
  { id: 3, title: 'Renewable Energy', description: 'An introduction to solar, wind, and hydro power.' },
];

export const quests = [
  // Quests for Course 1
  { id: 101, courseId: 1, title: 'Sort Your Trash', points: 50 },
  { id: 102, courseId: 1, title: 'Compost Challenge', points: 75 },
  { id: 103, courseId: 1, title: 'Recycling Relay', points: 60 },
  // Quests for Course 2
  { id: 201, courseId: 2, title: 'Fix a Leak', points: 100 },
  { id: 202, courseId: 2, title: 'Shorter Shower Sprint', points: 60 },
];

export const students = [
  { id: 1, name: 'Sowbagya' },
  { id: 2, name: 'Sumetha' },
  { id: 3, name: 'Sashruthi' },
];

// Mock data for student progress
export const studentProgress = [
  { studentId: 1, courseId: 1, completedQuestIds: [101, 103] }, // Sowbagya completed 2/3 quests in course 1
  { studentId: 2, courseId: 1, completedQuestIds: [101, 102, 103] }, // Sumetha completed 3/3 quests in course 1
  { studentId: 3, courseId: 1, completedQuestIds: [101] }, // Sashruthi completed 1/3 quests in course 1
  { studentId: 1, courseId: 2, completedQuestIds: [201] }, // Sowbagya completed 1/2 quests in course 2
];