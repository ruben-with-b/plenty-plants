class User {
    constructor(private email: String, private hashedPw: String){};

    getEmail() {
        return this.email;
    }

    getHashedPw() {
        return this.hashedPw;
    }
}

export {
    User
}