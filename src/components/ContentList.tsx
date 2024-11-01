import { useStore } from '../store/useStore';
import { Trash2 } from 'lucide-react';

export function ContentList() {
  const { contents, removeContent } = useStore();

  if (contents.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8 p-8 border-2 border-dashed border-gray-200 rounded-lg">
        No content generated yet. Start by entering a prompt above!
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {contents.map((content) => (
        <div
          key={content.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative group"
        >
          <button
            onClick={() => removeContent(content.id)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Delete content"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{content.content}</p>
          <div className="mt-4 text-sm text-gray-500">
            {new Date(content.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}