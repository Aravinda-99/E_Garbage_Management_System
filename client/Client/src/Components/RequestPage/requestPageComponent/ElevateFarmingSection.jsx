import React from 'react';

const ElevateFarmingSection = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-green-600 to-green-900 text-white py-16 elevate-farming-section">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Fade in and slide up animation for heading */}
          <h2 className="text-4xl font-bold mb-4 animate-[fadeInUp_0.8s_ease-out_forwards]">
            Ready to Create Your Cleaning Request?
          </h2>
          {/* Fade in with slight delay for paragraph */}
          <p className="text-green-100 mb-8 max-w-2xl mx-auto animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            Experience hassle-free cleaning services tailored to your needs. Submit your request today and let us take care of the rest.
          </p>
          {/* Buttons with fade in and scale animation */}
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-green-900 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition-colors animate-[fadeInScale_0.6s_ease-out_forwards]">
              Submit Request Now
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-green-900 transition-colors animate-[fadeInScale_0.6s_ease-out_0.4s_forwards]">
              Learn More
            </button>
          </div>
        </div>
      </section>
      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default ElevateFarmingSection;