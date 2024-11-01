import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Navbar } from './components/Navbar';
import { supabase } from './lib/supabase';
import { useStore } from './store/useStore';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const { setUser } = useStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />
      <main>
        {useStore.getState().user ? <Dashboard /> : <Auth />}
      </main>
      <Toaster position="top-right" />
    </div>
  );
}