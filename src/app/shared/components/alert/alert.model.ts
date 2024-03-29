export interface Alert {
  type: 'loading' | 'success' | 'error' | 'warning';
  message: string;
  title?: string; 
  icon?: string; 
  closable?: boolean;
  buttons?: { text: string, action: () => void }[]; 
}
