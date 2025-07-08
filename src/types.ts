export interface filter_t {
  type: string;
  exposure: number;
  count: number;
}

export interface Picture {
  id: number;
  title: string;
  publicID: string;
  capture_date?: string; // ISO string
  scope?: string;
  camera?: string;
  filters?: filter_t[];
  stacking?: string;
  type?: string;
}
