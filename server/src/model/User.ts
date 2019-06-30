/**
 * Represents a user.
 */
export class User {

    /**
     * The username of the user.
     */
    private readonly username: string;
    /**
     * The hashed password.
     */
    private readonly hashedPw: string;

    constructor(username: string, hashedPw: string){
        this.username = username;
        this.hashedPw = hashedPw;
    };

    getUsername() {
        return this.username;
    }

    getHashedPw() {
        return this.hashedPw;
    }
}