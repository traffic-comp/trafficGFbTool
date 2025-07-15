// useErrorStore.js
import { create } from "zustand";

let idCounter = 0;

const useErrorStore = create((set) => ({
  messages: [], // массив { id, type, message }

  addMessage: (type, message) =>
    set((state) => ({
      messages: [...state.messages, { id: idCounter++, type, message }],
    })),

  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    })),
}));

export default useErrorStore;
