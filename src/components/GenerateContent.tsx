import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { generateContent } from '../services/api';
import { useStore } from '../store/useStore';

export function GenerateContent() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addContent } = useStore();

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);

    const result = await generateContent(input.trim());

    if (result.success && result.data) {
      addContent({
        id: Date.now().toString(),
        content: result.data,
        createdAt: new Date().toISOString(),
      });
      setInput('');
    } else {
      setError(result.error || 'An unexpected error occurred');
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your prompt here..."
        className="w-full p-4 rounded-lg border border-yellow-200 bg-white/5 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all min-h-[120px] text-gray-800 dark:text-gray-200"
      />
      {error && (
        <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-lg">
          {error}
        </div>
      )}
      <button
        onClick={handleGenerate}
        disabled={isLoading || !input.trim()}
        className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Content'
        )}
      </button>
    </div>
  );
}