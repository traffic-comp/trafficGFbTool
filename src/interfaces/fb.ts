export interface Page {
  access_token: string;
  category: string;
  category_list: CategortList[];
  id: number;
  tasks: string[];
  name: string;
}

export interface CategortList {
  id: number;
  name: string;
}

export interface FBFrom {
  id: number;
  locale: string;
  name: string;
  status: string;
}

export interface Template {
  _id: string | "";
  name: string | "";
  type: string | "";
  adset: string | "";
  tableId: string | "";
  sheet: string | "";
  formId: string | "";
}

export interface IFbSpend {
  accountId: string;
  campaign_id: string;
  campaign_name: string;
  adset_id: string;
  adset_name: string;
  date: string;
  spend: number;

  // Метрики кликов и показов
  impressions_total: number;
  clicks_total: number;
  link_clicks: number;

  // Стоимость
  cpm: number; // цена за 1000 показов
  cpc_all: number; // цена за клик (все клики)
  cpc_link: number; // цена за клик по ссылке
  cps: number; // цена за лид

  // CTR (кликабельность)
  ctr_all: number; // общий CTR
  ctr_link: number; // CTR по ссылкам

  // Лиды
  leads: number;
  creative_id: string;
  // Даты и статус
  start_time: string;
  stop_time: string;
  campaign_status: string;
}
