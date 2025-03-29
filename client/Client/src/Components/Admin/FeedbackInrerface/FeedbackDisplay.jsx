import React, { useState } from 'react';
import FeedbackList from './FeedbackList';
import Navbar from '../../Navbar';
import Footer from '../../Footer';

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
    },
    {
      id: '4',
      message: "The product exceeded my expectations. The attention to detail is remarkable!",
      author: "David Miller",
      rating: 5,
      createdAt: new Date('2024-03-12').toISOString()
    },
    {
      id: '5',
      message: "Decent service but the pricing could be more competitive compared to alternatives.",
      author: "Lisa Rodriguez",
      rating: 3,
      createdAt: new Date('2024-03-10').toISOString()
    },
    {
      id: '6',
      message: "Outstanding support team! They went above and beyond to solve my issue.",
      author: "James Wilson",
      rating: 5,
      createdAt: new Date('2024-03-08').toISOString()
    },
    {
      id: '7',
      message: "The interface is intuitive and user-friendly. Made my experience seamless.",
      author: "Olivia Brown",
      rating: 4,
      createdAt: new Date('2024-03-05').toISOString()
    },
    {
      id: '8',
      message: "Had some initial setup problems, but the documentation helped me through it.",
      author: "Robert Taylor",
      rating: 4,
      createdAt: new Date('2024-03-03').toISOString()
    }
  ]);

  return (
    <div className="py-12 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Customer Feedback</h1>
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear what our customers have to say about their experiences
          </p> */}
        </div>
        
        {/* Spread out grid with larger gaps and responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
          {feedbacks.map((feedback) => (
            <div 
              key={feedback.id} 
              className="flex justify-center" // Centers each card in its grid cell
            >
              <FeedbackList feedbacks={[feedback]} /> {/* Pass one feedback at a time */}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FeedbackDisplay;