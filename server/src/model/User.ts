/**
 * Represents a user.
 */
export class User {
    constructor(private email: string, private hashedPw: string){};

    getEmail() {
        return this.email;
    }

    getHashedPw() {
        return this.hashedPw;
    }
}