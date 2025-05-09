import React from 'react';

export const AboutPage = () => {
  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-gray-600 mb-6 text-lg">
          Welcome to <span className="font-semibold">Talent Hiring</span> — where talent meets opportunity.
        </p>
      </section>

      {/* What We Offer */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <p>🔍 Curated Job Listings across multiple industries</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <p>🏢 Employer Solutions to find and manage top talent</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <p>🧑‍💻 User-Centered Experience — fast, simple, and intuitive</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <p>🚀 Secure and Scalable Technology</p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
        <p>
          To bridge the gap between talent and opportunity by creating a platform that's transparent, trustworthy, and efficient.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <p>🌟 Verified Employers and Authentic Listings</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <p>💬 24/7 Customer Support</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <p>📈 Growing Community of Professionals</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <p>🛡️ Safe and Trustworthy Platform</p>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="text-center mt-12">
        <p className="text-lg font-semibold text-gray-600">
          Find your next opportunity. Hire your next star. Let’s build the future — together.
        </p>
      </section>
    </div>
  );
};
