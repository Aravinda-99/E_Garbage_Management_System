import React, { useState } from 'react';
import { Calendar, Clock, Timer } from 'lucide-react';

function App() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      title: "Plan Your Pickup",
      icon: Calendar,
      image: "https://t3.ftcdn.net/jpg/05/73/57/76/240_F_573577614_3xNASp9y2eCUSXstGdXf9sKlW3ZYVyUr.jpg",
      alt: "Waste collection truck in Malabe",
      color: "from-green-800 to-emerald-10"
    },
    {
      title: "Schedule for Success",
      icon: Clock,
      image: "https://t3.ftcdn.net/jpg/04/10/33/12/240_F_410331212_76fw08VV2HvzOat340jBovJRuwUDOsyL.jpg",
      alt: "Recycling bins in Kotte",
      color: "from-blue-800 to-cyan-10"
    },
    {
      title: "Time is Precious",
      icon: Timer,
      image: "https://t3.ftcdn.net/jpg/10/18/01/36/240_F_1018013676_EQO02hu6FBgR4eYM6BT0yYUqbwc0omBP.jpg",
      alt: "Waste sorting in Rajagiriya",
      color: "from-purple-800 to-indigo-10"
    }
  ];

  const benefits = [
    {
      title: "Convenience at Your Fingertips",
      description: "Flexible scheduling that fits your lifestyle"
    },
    {
      title: "Avoid Unnecessary Delays",
      description: "Precise time slots for efficient service"
    },
    {
      title: "Proactive Planning",
      description: "Stay organized with advance scheduling"
    },
    {
      title: "Eco-Friendly Efficiency",
      description: "Optimized routes reduce carbon footprint"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 antialiased">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5 py-9">
        {/* Hero Section */}
        <section className="text-center pt-9 pb-15">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 animate-fade-in">
            <span className="block bg-gradient-to-r from-emerald-600 to-teal-900 bg-clip-text text-transparent">
              Smart Waste Management | For a Cleaner Tomorrow</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8 animate-fade-in-up">
           An intelligent scheduling solution for residents islandwide
          </p>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                role="article"
                aria-label={feature.title}
              >
                <img
                  src={feature.image}
                  alt={feature.alt}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-80 transition-opacity duration-300 ${hoveredFeature === index ? 'opacity-90' : 'opacity-60'}`} />
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-white">
                  <feature.icon className="h-12 w-12 mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose WasteWise?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-gray-800 rounded-xl transform rotate-6 opacity-10" />
                <img
                  src="https://i.pinimg.com/736x/e5/ac/59/e5ac595d331efb12087ae559d2fde657.jpg"
                  alt="Waste management illustration"
                  className="w-full h-full object-cover rounded-xl shadow-md"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;