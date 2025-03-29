import React, { useState } from 'react';
import  FeedbackList  from '../FeedbackInrerface/FeedbackList';

function FeedbackDisplay() {
  const [feedbacks] = useState([
    {
      id: '1',
      message: "The service was exceptional! I particularly enjoyed how responsive the team was to my requests.",
      author: "Sarah Johnson",
      rating: 5,
      createdAt: new Date('2024-03-15').toISOString()
    },
    {
      id: '2',
      message: "Good experience overall, though there's room for improvement in the delivery time.",
      author: "Michael Chen",
      rating: 4,
      createdAt: new Date('2024-03-14').toISOString()
    },
    {
      id: '3',
      message: "Amazing product quality and customer service. Will definitely recommend to others!",
      author: "Emma Williams",
      rating: 5,
      createdAt: new Date('2024-03-13').toISOString()
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <FeedbackList feedbacks={feedbacks} />
        </div>
      </div>
    </div>
  );
}

export default FeedbackDisplay;