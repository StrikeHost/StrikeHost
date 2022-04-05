export interface Event {
  id: string;
  note: string;
  action: string;
  cause_id: string;
  created_at: Date;
  metadata: unknown;
  subject_id: string;
  cause_class: string;
  subject_class: string;
}
