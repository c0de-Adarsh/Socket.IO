import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MessageSquare, Users, Zap } from 'lucide-react';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to RealChat
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A modern real-time chat application built with the MERN stack and Socket.io
        </p>
        
        {user ? (
          <Link
            to="/chat/general"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
          >
            Start Chatting
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition duration-200"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8 my-16">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Real-time Messaging</h3>
          <p className="text-gray-600">
            Instant message delivery with real-time typing indicators and read receipts.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Multiple Chat Rooms</h3>
          <p className="text-gray-600">
            Join different rooms to discuss various topics with other users.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Modern Tech Stack</h3>
          <p className="text-gray-600">
            Built with MongoDB, Express, React, Node.js, and Socket.io for optimal performance.
          </p>
        </div>
      </div>

      <div className="bg-indigo-50 p-8 rounded-lg my-16">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-indigo-600 font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Create an Account</h3>
            <p className="text-gray-600">Register with your email and password to get started.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-indigo-600 font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">Join a Room</h3>
            <p className="text-gray-600">Select from available chat rooms or create your own.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-indigo-600 font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">Start Chatting</h3>
            <p className="text-gray-600">Send messages and connect with others in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;