import { create } from 'zustand';

const useFBStore = create((set) => ({
  pages: [],
  forms: [],
  leads: [],
  activeFormId: '', // form id
  activeForm: '', // pageAccessToken
  result: [],

  setPages: (pages) => set({ pages }),
  setForms: (forms) => set({ forms }),
  setLeads: (leads) => set({ leads }),
  setResult: (result) => set({ result }),
  setActiveFormId: (formId) => set({ activeFormId: formId }),
  setActiveForm: (pageAccessToken) => set({ activeForm: pageAccessToken }),
}));

export default useFBStore;
