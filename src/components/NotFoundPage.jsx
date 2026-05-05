import React from 'react';
import { MainLayout } from './MainLayout';
import { Header } from './Header';
import { Footer } from './Footer';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <MainLayout>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">Page not found</h2>
        <p className="text-zinc-400 mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-full transition-colors"
        >
          Go back home
        </Link>
      </div>
      <Footer />
    </MainLayout>
  );
};
