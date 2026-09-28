import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center text-xs font-semibold text-slate-500 py-3 mb-4 overflow-x-auto">
      <Link to="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors shrink-0">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1.5 shrink-0" />
          {item.link ? (
            <Link to={item.link} className="hover:text-blue-600 transition-colors shrink-0">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-bold truncate max-w-[200px]">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
