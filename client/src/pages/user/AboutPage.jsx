import React from 'react';

export const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

      <p className="text-lg mb-6 text-gray-700 text-center">
        Welcome to <span className="font-semibold">Talent Hiring</span> — where talent meets opportunity.
      </p>

      <div className="space-y-6 text-gray-600">
        <p>
          At <span className="font-semibold">[Your Website Name]</span>, we are dedicated to connecting ambitious individuals
          with companies that value their talent. Our platform makes job searching and hiring simple, fast, and reliable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>🔍 Curated Job Listings across multiple industries</li>
          <li>🏢 Employer Solutions to find and manage top talent</li>
          <li>🧑‍💻 User-Centered Experience — fast, simple, and intuitive</li>
          <li>🚀 Secure and Scalable Technology</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p>
          To bridge the gap between talent and opportunity by creating a platform that's transparent, trustworthy, and efficient.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>🌟 Verified Employers and Authentic Listings</li>
          <li>💬 24/7 Customer Support</li>
          <li>📈 Growing Community of Professionals</li>
          <li>🛡️ Safe and Trustworthy Platform</li>
        </ul>

        <p className="mt-8 text-center text-lg font-semibold">
          Find your next opportunity. Hire your next star. Let’s build the future — together.
        </p>
      </div>
    </div>
  );
};
