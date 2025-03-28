import React from 'react';
import SingleProject from './SingleProject';
import img1 from '../../image/img1.jpg'
import img2 from '../../image/img2.jpg'
import img3 from '../../image/img3.jpg'
import img4 from '../../image/img4.jpg'
import img5 from '../../image/img5.jpg'

const MultipleProjects = () => {
  const projectsData = [
    {
      title: "Harvesting",
      category: "Easy",
      image: img1 // Using placeholder as we can't use external images
    },
    {
      title: "Farming",
      category: "Agriculture",
      image: img2
    },
    {
      title: "Farming",
      category: "Ecological",
      image: img3
    },
    {
      title: "Solutions",
      category: "Organic",
      image: img4
    },
    {
        title: "Solutions",
        category: "Organic",
        image: img5
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
        <h1 className="text-sm font-bold text-orange-300">Explore Projects</h1>
          <h2 className="text-2xl font-bold text-gray-900">Explore Projects</h2>
        </div>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl">
            {projectsData.map((project, index) => (
              <SingleProject 
                key={index}
                title={project.title}
                image={project.image}
                category={project.category}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleProjects;