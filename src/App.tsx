import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { Users, BarChart3, LogOut } from 'lucide-react';

// Components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MenteeList from './components/MenteeList';
import MenteeStats from './components/MenteeStats';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-gray-800">MentorDash</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a href="/dashboard" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Dashboard
                  </a>
                  <a href="/mentees" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    <Users className="h-4 w-4 mr-1" />
                    Mentees
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mentees" element={<MenteeList />} />
            <Route path="/mentee/:id" element={<MenteeStats />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;