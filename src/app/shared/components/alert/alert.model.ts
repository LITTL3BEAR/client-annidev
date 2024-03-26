export class Alert {
  constructor(
    public type: AlertType,
    public message: string,
    public timeout?: number,
    public progress?: number
  ) {}
}

export type AlertType = 'success' | 'error' | 'warning' | 'loading';
