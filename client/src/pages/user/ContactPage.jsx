import React from 'react';

export const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

      <p className="text-lg mb-8 text-center text-gray-700">
        We'd love to hear from you! Whether you have a question about jobs, employers, features, or anything else, our team is ready to answer.
      </p>

      <div className="space-y-6 text-gray-600">
        <div>
          <h2 className="text-2xl font-semibold mb-2">📧 Email</h2>
          <p>support@talenthiring.com</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">📞 Phone</h2>
          <p>+91 98765 43210</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">📍 Address</h2>
          <p>123 Career Street, Tech City, India - 695001</p>
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg font-semibold">Follow us on social media</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:underline text-blue-500">LinkedIn</a>
            <a href="#" className="hover:underline text-blue-400">Twitter</a>
            <a href="#" className="hover:underline text-pink-500">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
};
