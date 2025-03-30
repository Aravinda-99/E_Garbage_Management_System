import React, { useEffect, useState, useRef } from 'react';

// Sample data for destinations
const destinations = [
  { name: 'Anuradhapura', description: 'Land of a thousand lakes and northern lights.', image: 'https://img.freepik.com/free-photo/group-happy-african-volunteers-with-garbage-bags-cleaning-area-park-africa-volunteering-charity-people-ecology-concept_627829-351.jpg?uid=R119415580&ga=GA1.1.1625335464.1726891998&semt=ais_hybrid' },
  { name: 'Kaluthara', description: 'Where East meets West in vibrant culture.', image: 'https://img.freepik.com/free-photo/african-girl-europan-boy-wearing-masks-gloves-theay-have-cleaned-park-from-trash-carry-bag-together_1157-49272.jpg?uid=R119415580&ga=GA1.1.1625335464.1726891998&semt=ais_hybrid' },
  { name: 'Kurunagala', description: 'A fairy-tale city with historic charm.', image: 'https://img.freepik.com/free-photo/beautiful-volunteer-woman-posing-city-park_1262-20973.jpg?uid=R119415580&ga=GA1.1.1625335464.1726891998&semt=ais_hybrid' },
  { name: 'Akurana', description: 'Turkeys capital with rich history.', image: 'https://img.freepik.com/premium-photo/happy-family-collecting-rubbish_13339-106292.jpg?uid=R119415580&ga=GA1.1.1625335464.1726891998&semt=ais_hybrid' },
  { name: 'Gampaha', description: 'A serene escape with ancient roots.', image: 'https://img.freepik.com/free-photo/man-collecting-scattered-plastic-bottles-from-ground_1268-20057.jpg?uid=R119415580&ga=GA1.1.1625335464.1726891998&semt=ais_hybrid' },
  { name: 'Kaduwela', description: 'Iconic landmarks and timeless elegance.', image: 'https://img.freepik.com/free-photo/man-collecting-plastic-garbage-polluted-park_1268-20119.jpg?uid=R119415580&ga=GA1.1.1625335464.1726891998&semt=ais_hybrid' },
];

const RecentProject = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section comes into view, set isVisible to true
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it's visible, we can stop observing
          observer.unobserve(entry.target);
        }
      },
      // Options: trigger when at least 10% of the element is visible
      { threshold: 0.1 }
    );

    // Start observing the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`p-10 bg-gray-100 font-sans text-center transition-all duration-1000 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}
    >
      {/* Header Section */}
      <div className="mb-5">
        <span className="text-orange-500 text-sm font-bold uppercase">Recent Project</span>
        <h1 className="text-4xl text-blue-900 mt-2">EXPLORE OUR LATEST PROJECTS</h1>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg overflow-hidden shadow-lg h-64 relative transition-all duration-1000 transform ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-16'
            }`}
            style={{
              backgroundImage: `url(${destination.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#e5e7eb', // Fallback background color
              transitionDelay: `${index * 150}ms`, // Stagger the animations
            }}
          >
            {/* Dark Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1))',
              }}
            ></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
              <h3 className="text-lg font-bold text-white drop-shadow-md">{destination.name}</h3>
              <p className="text-sm text-white font-medium drop-shadow-md">{destination.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProject;