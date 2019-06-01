/**
 * Represents a user.
 */
export class User {

    /**
     * The email address of the user.
     */
    private readonly email: string;
    /**
     * The hashed password.
     */
    private readonly hashedPw: string;

    constructor(email: string, hashedPw: string){
        this.email = email;
        this.hashedPw = hashedPw;
    };

    getEmail() {
        return this.email;
    }

    getHashedPw() {
        return this.hashedPw;
    }
}