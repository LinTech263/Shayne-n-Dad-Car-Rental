import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, MessageCircle, ArrowRight, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate, settings } = useApp();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/cars');
  };

  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="font-serif text-6xl sm:text-7xl font-bold text-[#B71C24] block">
          404
        </span>

        <div className="space-y-2">
          <h1 className="text-2xl font-serif font-bold text-[#00005E]">
            Page Not Found
          </h1>
          <p className="text-xs text-[#6B6E80] leading-relaxed">
            The page or vehicle link you requested could not be located. Browse our active fleet or contact our Greencroft operations desk directly.
          </p>
        </div>

        {/* Quick Fleet Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#6B6E80] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search fleet (e.g. Hilux, Mercedes, SUV)..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-[#D9DBE8] rounded-xs bg-[#F4F5FA] outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#00005E] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
          >
            Find
          </button>
        </form>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#B71C24] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </button>

          <a
            href={settings.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
