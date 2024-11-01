import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Sparkles, Zap, Shield, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = isLogin
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (error) throw error;
      if (!isLogin) toast.success('Check your email for verification link!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-200 dark:from-gray-900 dark:to-yellow-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            AI Content Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Transform your ideas into compelling content
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="feature-card">
            <Zap className="w-6 h-6 text-yellow-500 mb-2" />
            <h3 className="font-semibold">Instant Generation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Generate content in seconds</p>
          </div>
          <div className="feature-card">
            <Shield className="w-6 h-6 text-yellow-500 mb-2" />
            <h3 className="font-semibold">Secure Platform</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your data is protected</p>
          </div>
          <div className="feature-card">
            <Clock className="w-6 h-6 text-yellow-500 mb-2" />
            <h3 className="font-semibold">Save Time</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Focus on what matters</p>
          </div>
          <div className="feature-card">
            <Sparkles className="w-6 h-6 text-yellow-500 mb-2" />
            <h3 className="font-semibold">AI Powered</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Advanced algorithms</p>
          </div>
        </div>

        {/* Auth Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl space-y-6 animate-pulse-glow">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="gradient-btn w-full"
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isLogin ? 'Sign In' : 'Sign Up'}
                  <Sparkles className="w-5 h-5" />
                </span>
              )}
            </button>
          </form>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-sm text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}