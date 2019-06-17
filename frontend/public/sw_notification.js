const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

// saveSubscription saves the subscription to the backend
const saveSubscription = async subscription => {
    const SERVER_URL = 'http://localhost:3001/api/v1/notification/add';
    const response = await fetch(SERVER_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
    });
    return response.json()
};

self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    try {
        const applicationServerKey = urlBase64ToUint8Array(
            'BDLpp91SDx9YfVpkbSCVIi4H-uXBcoggk1x0Whaw_kHQRU_9yxYQWQN4Uob0x06iu26nH7AdzNdq9vBc6Fk80OU'
        );
        const options = { applicationServerKey, userVisibleOnly: true};
        const subscription = await self.registration.pushManager.subscribe(options);
        await saveSubscription(subscription);
    } catch (err) {
        console.log('Error', err)
    }
})

self.addEventListener("push", function(event) {
    if (event.data) {
        let notification = JSON.parse(event.data.text());
        showLocalNotification(notification.title, notification.message,  self.registration);
    }
});

const showLocalNotification = (title, body, swRegistration) => {
    const options = {
        body
        // here you can add more properties like icon, image, vibrate, etc.
    };
    swRegistration.showNotification(title, options);
};