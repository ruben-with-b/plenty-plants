/**
 * Check if PushService is enabled.
 */
export function isEnabled() {
    return new Promise((resolve, reject) => {
        navigator.serviceWorker.getRegistration('sw_notification.js').then((registration) => {
            if(registration) {
                resolve(true);
            } else {
                return false;
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

/**
 * Enable PushService
 */
export function enable() {
    return new Promise((resolve) => {
        if (!('serviceWorker' in navigator)) {
            throw new Error('No Service Worker support!');
        }

        if (!('PushManager' in window)) {
            throw new Error('No Push API Support!');
        }

        window.Notification.requestPermission().then((permission) => {
            if(permission === 'granted'){
                navigator.serviceWorker.register('sw_notification.js');
                resolve(true);
                return;
            } else {
                resolve(false);
                return;
            }
        });
    });
}

/**
 * Disable PushService
 */
export function disable() {
    return new Promise((resolve) => {
        navigator.serviceWorker.getRegistration('sw_notification.js').then((registration) => {
            if(registration) {
                registration.unregister();
            }
            resolve();
        });
    });
}