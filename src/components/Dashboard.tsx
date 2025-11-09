import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Award, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalMentees: number;
  activeInCodechef: number;
  activeInCodeforces: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMentees: 0,
    activeInCodechef: 0,
    activeInCodeforces: 0
  });

  useEffect(() => {
    async function fetchStats() {
      const { data: mentees, error } = await supabase
        .from('mentees')
        .select('codechef_username, codeforces_username');

      if (error) {
        console.error('Error fetching stats:', error);
        return;
      }

      setStats({
        totalMentees: mentees.length,
        activeInCodechef: mentees.filter(m => m.codechef_username).length,
        activeInCodeforces: mentees.filter(m => m.codeforces_username).length
      });
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* Total Mentees */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Mentees
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.totalMentees}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Active in CodeChef */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active in CodeChef
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.activeInCodechef}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Active in Codeforces */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active in Codeforces
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.activeInCodeforces}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}