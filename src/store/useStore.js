import { create } from 'zustand';

const useStore = create((set) => ({
  isOpen: false,
  tabs: [],
  currentTab: '',

  addTab: (tab) =>
    set((state) => {
      const tabs = [...state.tabs];

      if (tab === 'fanpages') {
        if (tabs.length === 1 && tabs[0] === 'fanpages') {
          return {};
        }
        return { tabs: ['fanpages'] };
      }

      if (!tabs.includes(tab)) {
        if (tab === 'forms' && !tabs.includes('fanpages')) {
          return { tabs: ['fanpages', 'forms'] };
        }
        return { tabs: [...tabs, tab] };
      }

      return {};
    }),

  setCurrentTab: (tab) => set({ currentTab: tab }),
  cutTabsBefore: (tab) =>
    set((state) => {
      const index = state.tabs.indexOf(tab);
      if (index === -1) return {};
      return {
        tabs: state.tabs.slice(0, index + 1),
        currentTab: tab,
      };
    }),

  setCurrentTab: (tab) => set({ currentTab: tab }),
  setCurrentPage: (page) => set((currentPage) => [currentPage, page]),
  setIsOpen: (isOpen) => set({ isOpen }),

}));

export default useStore;
