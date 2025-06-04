import React from "react";

export const EmployerHomePage = () => {
  return (
    <div className=" dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Let’s hire your next great candidate. Fast.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          No matter the skills, experience or qualifications you’re looking for, you’ll find the right people here.
        </p>
        <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
          Post a Job
        </button>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6  dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-base-content font-bold text-center mb-12">
            Manage your hiring from start to finish
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Post a job",
                desc: "Get started with a job post. Reach millions of job seekers.",
              },
              {
                title: "Find quality applicants",
                desc: "Screen and filter applicants with ease.",
              },
              {
                title: "Make connections",
                desc: "Message, invite, and interview directly on the platform.",
              },
              {
                title: "Hire confidently",
                desc: "Resources to help you at every step.",
              },
           ].map((item, index) => (
  <div key={index} className="bg-base-200 text-base-content rounded-lg shadow p-6">
    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
    <p className="text-base-content/70">{item.desc}</p>
  </div>
))
}
          </div>
        </div>
      </section>

      {/* Smart Sourcing Section */}
      <section className="py-16 px-6 text-base-content  dark:bg-gray-950">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">
              Unlock matched candidates with Smart Sourcing
            </h2>
            <p className="mb-6">
              Start seeing candidates whose CVs fit your job description — instantly.
            </p>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700">
              Explore Smart Sourcing
            </button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80"
            alt="Smart Sourcing"
            className="w-full md:w-1/2 rounded shadow-lg"
          />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className=" dark:bg-gray-900 py-16 px-6 text-center text-base-content">
        <div className="max-w-2xl mx-auto">
          <p className="italic text-lg mb-4">
            "Talent Hiring has helped us discover good talent at Kanan. We’ve successfully hired with a 40% success rate."
          </p>
          <p className="font-semibold mb-6">— Isha Patel, Head – Talent Acquisition, Kanan International</p>
          <button className="bg-indigo-700 text-white px-6 py-3 rounded-full hover:bg-indigo-800">
            Ready to Hire?
          </button>
        </div>
      </section>
    </div>
  );
};

 