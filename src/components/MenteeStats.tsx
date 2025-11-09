import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Mentee {
  id: string;
  name: string;
  codechef_username: string | null;
  codeforces_username: string | null;
}

export default function MenteeStats() {
  const { id } = useParams<{ id: string }>();
  const [mentee, setMentee] = useState<Mentee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMentee() {
      try {
        const { data, error } = await supabase
          .from('mentees')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setMentee(data);
      } catch (error) {
        console.error('Error fetching mentee:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchMentee();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!mentee) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Mentee not found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{mentee.name}'s Statistics</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* CodeChef Stats */}
        {mentee.codechef_username && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">CodeChef Performance</h2>
            <div className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                CodeChef stats will be implemented with the Edge Function
              </div>
            </div>
          </div>
        )}

        {/* Codeforces Stats */}
        {mentee.codeforces_username && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Codeforces Performance</h2>
            <div className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                Codeforces stats will be implemented with the Edge Function
              </div>
            </div>
          </div>
        )}

        {!mentee.codechef_username && !mentee.codeforces_username && (
          <div className="col-span-2 bg-white shadow rounded-lg p-6">
            <div className="text-center text-gray-500">
              No coding profiles available. Add CodeChef or Codeforces username to view statistics.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}