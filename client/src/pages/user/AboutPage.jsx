import React from 'react';

export const AboutPage = () => {
  return (
    <div className="px-6 py-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className=" text-4xl font-bold mb-6 text-center">About Our Company</h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-200 max-w-3xl mx-auto">
          Welcome to <span className="font-semibold text-blue-600 dark:text-blue-400">Talent Hiring</span> —
          where exceptional talent connects with outstanding opportunities.
        </p>
        <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
      </section>

      {/* What We Offer */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-6 ">Our Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-lg transition-all duration-300  dark:bg-gray-800 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-4xl font-bold mb-6 text-center">For Job Seekers</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                <span className="text-gray-500 dark:text-gray-200">Curated job listings across multiple industries</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                <span className="text-gray-500 dark:text-gray-200">Personalized job recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                <span className="text-gray-500 dark:text-gray-200">Career development resources</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                <span className="text-gray-500 dark:text-gray-200">Application tracking system</span>
              </li>
            </ul>
          </div>
          
          <div className="p-8 rounded-lg transition-all duration-300 dark:bg-gray-800 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-4xl font-bold mb-6 text-center">For Employers</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                <span className="text-gray-500 dark:text-gray-200">Advanced talent search tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                <span className="text-gray-500 dark:text-gray-200">Applicant screening and management</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                <span className="text-gray-500 dark:text-gray-200">Employer branding solutions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                <span className="text-gray-500 dark:text-gray-200">Analytics and reporting tools</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="mb-16  dark:bg-gray-900 p-8 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-500 dark:text-gray-200 mb-6">
            To bridge the gap between talent and opportunity by creating a platform that's transparent, 
            trustworthy, and efficient for both job seekers and employers.
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-200">
            We believe that the right match between talent and opportunity can transform careers and businesses alike.
          </p>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="mb-16">
        <h2 className="text-3xl  font-bold mb-6 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-lg transition-all duration-300 dark:bg-gray-800 shadow-md hover:shadow-lg flex flex-col items-center text-center border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <span className="text-2xl text-blue-600 dark:text-blue-400">🔍</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-100">Verified Employers</h3>
            <p className="text-gray-500 dark:text-gray-200">All employers undergo a strict verification process</p>
          </div>
          
          <div className="p-6 rounded-lg transition-all duration-300 dark:bg-gray-800 shadow-md hover:shadow-lg flex flex-col items-center text-center border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <span className="text-2xl text-blue-600 dark:text-blue-400">💬</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-100">24/7 Support</h3>
            <p className="text-gray-500 dark:text-gray-200">Our dedicated team is always available to assist you</p>
          </div>
          
          <div className="p-6 rounded-lg transition-all duration-300  dark:bg-gray-800 shadow-md hover:shadow-lg flex flex-col items-center text-center border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <span className="text-2xl text-blue-600 dark:text-blue-400">📈</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-100">Growing Network</h3>
            <p className="text-gray-500 dark:text-gray-200">Join our expanding community of professionals</p>
          </div>
          
          <div className="p-6 rounded-lg transition-all duration-300  dark:bg-gray-800 shadow-md hover:shadow-lg flex flex-col items-center text-center border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <span className="text-2xl text-blue-600 dark:text-blue-400">🛡️</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-100">Data Security</h3>
            <p className="text-gray-500 dark:text-gray-200">Your information is protected with enterprise-grade security</p>
          </div>
        </div>
      </section>
      
      {/* Closing CTA Section */}
      <section className="text-center mt-16 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 p-10 rounded-lg text-white">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Find your next opportunity. Hire your next star. Let's build the future — together.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Find Jobs
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            For Employers
          </button>
        </div>
      </section>
    </div>
  );
}