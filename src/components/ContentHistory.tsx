import React from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function ContentHistory() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const { contents, updateContent, deleteContent } = useStore();

  const handleEdit = async (id: string) => {
    if (editingId === id) {
      try {
        const { error } = await supabase
          .from('contents')
          .update({ content: editContent })
          .eq('id', id);

        if (error) throw error;

        updateContent(id, { content: editContent });
        toast.success('Content updated successfully!');
        setEditingId(null);
      } catch (error) {
        toast.error('Failed to update content');
      }
    } else {
      const content = contents.find((c) => c.id === id);
      setEditContent(content?.content || '');
      setEditingId(id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('contents').delete().eq('id', id);
      if (error) throw error;

      deleteContent(id);
      toast.success('Content deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete content');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Generated Content History</h2>
      
      <div className="space-y-4">
        {contents.map((content) => (
          <div
            key={content.id}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all hover:shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {content.title}
              </h3>
              <div className="flex gap-2">
                {editingId === content.id ? (
                  <>
                    <button
                      onClick={() => handleEdit(content.id)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(content.id)}
                      className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full transition-colors"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(content.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {editingId === content.id ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                rows={4}
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {content.content}
              </p>
            )}
            
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Generated on {new Date(content.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}