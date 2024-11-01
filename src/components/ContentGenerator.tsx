import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export function ContentGenerator() {
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const { generateContent, isLoading } = useStore();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    try {
      await generateContent(prompt.trim(), title.trim());
      setPrompt('');
      setTitle('');
    } catch (error) {
      console.error('Generation error:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
          className="w-full p-3 border border-yellow-200 dark:border-yellow-900 rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white mb-4"
          disabled={isLoading}
        />
        <div className="flex gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your prompt here..."
            className="flex-1 p-3 border border-yellow-200 dark:border-yellow-900 rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
            disabled={isLoading}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim() || !title.trim()}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
}