import { create } from "zustand";

const useFBStore = create((set) => ({
  pages: [],
  forms: [],
  leads: [],
  activeFormId: "", // form id
  activeForm: "", // pageAccessToken
  result: [],

  setPages: (pages) => set({ pages }),
  setForms: (forms) => set({ forms }),
  setLeads: (leads) => set({ leads }),
  updateLeadData: (id, value, field) =>
    set(({ leads, result }) => ({
      leads: leads.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
      result: result.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    })),
  deleteLead: (phone) =>
    set(({ result }) => ({
      result: result.filter((lead) => lead.phone !== phone),
    })),
  setResult: (result) => set({ result }),
  setActiveFormId: (formId) => set({ activeFormId: formId }),
  setActiveForm: (pageAccessToken) => set({ activeForm: pageAccessToken }),
}));

export default useFBStore;
