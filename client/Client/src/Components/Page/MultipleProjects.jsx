import React from 'react';
import SingleProject from './SingleProject';
// import img1 from '../../image/img1.jpg'
// import img2 from '../../image/img2.jpg'
// import img3 from '../../image/img3.jpg'
// import img4 from '../../image/img4.jpg'
// import img5 from '../../image/img5.jpg'
import img11 from '../../image/img11.jpg'
import img12 from '../../image/img12.jpg'
import img13 from '../../image/img13.jpg'
import img14 from '../../image/img14.jpg'
import img15 from '../../image/img15.jpg'

const MultipleProjects = () => {
  const projectsData = [
    {
      title: "Temple Festival",
      category: "Anuradhapura",
      image: img11 // Using placeholder as we can't use external images
    },
    {
      title: "Wedding Event",
      category: "Malabe",
      image: img12
    },
    {
      title: "Sports Event",
      category: "Kalaniya",
      image: img13
    },
    {
      title: "Concert Clean",
      category: "Kandy",
      image: img14
    },
    {
        title: "Community Festival",
        category: "Kurunagala",
        image: img15
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