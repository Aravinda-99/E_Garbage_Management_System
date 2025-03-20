import React from 'react';

const SingleProject = ({ title, image, category }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer w-48">
      <div className="relative h-72 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-4 text-left">
          <h3 className="text-white text-lg font-medium mb-1">{category}</h3>
          <p className="text-white/90 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;