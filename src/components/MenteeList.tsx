import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Trash2, ExternalLink, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Mentee {
  id: string;
  name: string;
  codechef_username: string | null;
  codeforces_username: string | null;
}

export default function MenteeList() {
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMentee, setNewMentee] = useState({
    name: '',
    codechef_username: '',
    codeforces_username: ''
  });

  useEffect(() => {
    fetchMentees();
  }, []);

  async function fetchMentees() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('mentees')
        .select('*')
        .eq('mentor_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMentees(data || []);
    } catch (error) {
      console.error('Error fetching mentees:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddMentee(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('mentees')
        .insert([{
          mentor_id: user.id,
          name: newMentee.name,
          codechef_username: newMentee.codechef_username || null,
          codeforces_username: newMentee.codeforces_username || null
        }]);

      if (error) throw error;
      
      setNewMentee({ name: '', codechef_username: '', codeforces_username: '' });
      fetchMentees();
    } catch (error) {
      console.error('Error adding mentee:', error);
    }
  }

  async function handleDeleteMentee(id: string) {
    try {
      const { error } = await supabase
        .from('mentees')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchMentees();
    } catch (error) {
      console.error('Error deleting mentee:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Mentees</h1>
      </div>

      {/* Add Mentee Form */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Mentee</h3>
          <form onSubmit={handleAddMentee} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={newMentee.name}
                  onChange={(e) => setNewMentee({ ...newMentee, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="codechef" className="block text-sm font-medium text-gray-700">
                  CodeChef Username
                </label>
                <input
                  type="text"
                  name="codechef"
                  id="codechef"
                  value={newMentee.codechef_username}
                  onChange={(e) => setNewMentee({ ...newMentee, codechef_username: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="codeforces" className="block text-sm font-medium text-gray-700">
                  Codeforces Username
                </label>
                <input
                  type="text"
                  name="codeforces"
                  id="codeforces"
                  value={newMentee.codeforces_username}
                  onChange={(e) => setNewMentee({ ...newMentee, codeforces_username: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Mentee
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mentees List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul role="list" className="divide-y divide-gray-200">
          {mentees.map((mentee) => (
            <li key={mentee.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">{mentee.name}</h2>
                    <div className="mt-1 flex space-x-4 text-sm text-gray-500">
                      {mentee.codechef_username && (
                        <span>CodeChef: {mentee.codechef_username}</span>
                      )}
                      {mentee.codeforces_username && (
                        <span>Codeforces: {mentee.codeforces_username}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Link
                    to={`/mentee/${mentee.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Stats
                  </Link>
                  <button
                    onClick={() => handleDeleteMentee(mentee.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
          {mentees.length === 0 && (
            <li className="px-4 py-8 sm:px-6 text-center text-gray-500">
              No mentees added yet. Add your first mentee using the form above.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}