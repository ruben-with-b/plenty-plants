/**
 * Represents the content of a notification.
 */
export class Notification {

    /**
     * @param title The title of the notification.
     * @param message The message of the notification
     */
    constructor(readonly title: string, readonly message: string){ };
}