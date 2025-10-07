export interface Offer {
  id: string;
  name: string;
  group_id: number;
  action_type: string;
  action_options: any;
  affiliate_network_id: number;
  payout_value: number;
  payout_currency: string;
  payout_type: string;
  state: string;
  created_at: string;
  updated_at: string;
  payout_auto: boolean;
  payout_upsell: boolean;
  country: string[];
  notes: string;
  affiliate_network: string;
  archive: string;
  local_path: string;
  preview_path: string;
  values: any;
}
