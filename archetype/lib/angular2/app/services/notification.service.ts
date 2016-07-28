import { Injectable }    from '@angular/core';

@Injectable()
export class NotificationService {
  manageNotification(notification: any) {
    if ("Notification" in window) {
      if ((<any> window).Notification.permission === "granted") {
        const notify = new (<any> window).Notification(notification.subject || 'Treefrog',
          {
            icon: '/style/images/branding/treefrog.png',
            body: notification.message || 'new notification',
            tag: notification.id
          });
        notify.onclick = () => {
          notify.close();
          console.log('TODO');
        };
      } else if ((<any> window).Notification.permission === "default") {
        (<any> window).Notification.requestPermission(() => this.manageNotification(notification));
      } else {
        // TODO setup an html notification
      }
    } else if ("webkitNotifications" in window) {
      if ((<any> window).webkitNotifications.checkPermission() === 0) {
        const desktopNotification = (<any> window).webkitNotifications.createNotification(
          '/style/images/branding/treefrog.png',
          notification.subject || 'Treefrog', notification.message || 'new notification');
        desktopNotification.nativeNotification = notification;
        /*desktopNotification.ondisplay = function () {
         };
         desktopNotification.onclose = function () {
         };*/
        desktopNotification.onclick = function () {
          desktopNotification.hide();
          console.log('TODO');
        };
        desktopNotification.show();
      } else if ((<any> window).webkitNotifications.checkPermission() === 1) {
        (<any> window).webkitNotifications.requestPermission(() => this.manageNotification(notification));
      } else {
        // TODO setup an html notification
      }
    }
  }
}
