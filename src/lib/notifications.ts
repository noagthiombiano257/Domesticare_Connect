export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;

  const result = await Notification.requestPermission();
  return result === "granted";
}

export function notifyUser(title: string, body: string) {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return;
  }

  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/favicon.ico",
    });
    return;
  }

  if (Notification.permission === "default") {
    void requestNotificationPermission().then((granted) => {
      if (granted) {
        new Notification(title, {
          body,
          icon: "/favicon.ico",
        });
      }
    });
  }
}
