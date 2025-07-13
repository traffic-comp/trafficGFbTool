import { create } from 'zustand';

const useTTStore = create((set) => ({
  files: [],

  setFiles: (file) =>
    set((state) => ({
      files: [...state.files, file],
    })),

  deleteFile: (fileId) =>
    set((state) => ({
      files: state.files.filter((f) => f.id !== fileId),
    })),
}));

export default useTTStore;
