/**
 * Holds a HTTP-Status code, a name and a message.
 */
export class StatusError extends Error {
    public status: number;
    public name: string;
    constructor (code: number, name: string, msg: string) {
        super(msg);
        this.status = code;
        this.name = name;
    }
}