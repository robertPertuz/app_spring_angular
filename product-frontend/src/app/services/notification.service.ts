import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  type: 'success' | 'error';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly notificationSubject = new BehaviorSubject<Notification | null>(null);
  private timeoutId: any;

  getNotification(): Observable<Notification | null> {
    return this.notificationSubject.asObservable();
  }

  showSuccess(message: string, duration: number = 3000): void {
    this.show({ type: 'success', message }, duration);
  }

  showError(message: string, duration: number = 5000): void {
    this.show({ type: 'error', message }, duration);
  }

  private show(notification: Notification, duration: number): void {
    this.clearTimeout();
    this.notificationSubject.next(notification);

    if (duration > 0) {
      this.timeoutId = setTimeout(() => this.notificationSubject.next(null), duration);
    }
  }

  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
