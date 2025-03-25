import React, { useEffect } from 'react';

const FAQ = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs';

    script.onload = () => {
      new window.Landbot.Container({
        container: '#myLandbot',
        configUrl:
          'https://storage.googleapis.com/landbot.online/v3/H-2842442-KV2MK40OZSLNBR4J/index.json',
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup to avoid multiple instances
    };
  }, []);

  return (
    <div className="min-h-screen p-8 bg-[#FDF6E6]">
      <h2 className="text-4xl font-serif text-[#053342] mb-6 text-center">
        Frequently Asked Questions (FAQ)
      </h2>

      <div className="text-gray-700 text-lg max-w-3xl mx-auto">
        <p className="mb-4">
          Have questions? Our chatbot is here to help you with instant answers.
          Simply type your query below!
        </p>
      </div>

      {/* Landbot Chatbot Container */}
      <div id="myLandbot" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default FAQ;
