import React, { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import { ContentGenerator } from './ContentGenerator';
import { ContentList } from './ContentList';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export function Dashboard() {
  const { user, setContents } = useStore();

  useEffect(() => {
    const fetchContents = async () => {
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contents:', error);
        toast.error('Failed to load your contents');
        return;
      }

      setContents(data);
    };

    fetchContents();
  }, [user]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Content Generator
          </h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
        
        <div className="space-y-8">
          <ContentGenerator />
          <ContentList />
        </div>
      </div>
    </div>
  );
}