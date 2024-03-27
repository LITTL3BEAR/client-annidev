export class Alert {
  type!: AlertType;
  message!: string;
  icon?: string;
  closable?: boolean;
}

export type AlertType = 'success' | 'error' | 'warning' | 'loading';
