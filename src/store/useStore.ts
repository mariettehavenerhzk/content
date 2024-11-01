import { create } from 'zustand';
import { Content, GenerationResponse } from '../types';
import { User } from '@supabase/supabase-js';
import { generateContent as apiGenerateContent } from '../services/api';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Store {
  user: User | null;
  contents: Content[];
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setContents: (contents: Content[]) => void;
  addContent: (content: Content) => void;
  removeContent: (id: string) => void;
  updateContent: (id: string, updates: Partial<Content>) => void;
  deleteContent: (id: string) => void;
  generateContent: (prompt: string, title: string) => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  user: null,
  contents: [],
  isLoading: false,
  setUser: (user) => set({ user }),
  setContents: (contents) => set({ contents }),
  addContent: (content) =>
    set((state) => ({
      contents: [content, ...state.contents],
    })),
  removeContent: (id) =>
    set((state) => ({
      contents: state.contents.filter((content) => content.id !== id),
    })),
  updateContent: (id, updates) =>
    set((state) => ({
      contents: state.contents.map((content) =>
        content.id === id ? { ...content, ...updates } : content
      ),
    })),
  deleteContent: (id) =>
    set((state) => ({
      contents: state.contents.filter((content) => content.id !== id),
    })),
  generateContent: async (prompt: string, title: string) => {
    set({ isLoading: true });
    try {
      const response: GenerationResponse = await apiGenerateContent(prompt);
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to generate content');
      }

      const { data, error } = await supabase
        .from('contents')
        .insert([
          {
            title,
            content: response.data,
            user_id: get().user?.id,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        get().addContent({
          id: data.id,
          title: data.title,
          content: data.content,
          createdAt: data.created_at,
        });
        toast.success('Content generated successfully!');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate content');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));