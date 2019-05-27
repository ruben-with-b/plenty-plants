import express = require('express');
import dotenv = require('dotenv');
import cookieSession = require('cookie-session');
import bodyParser = require('body-parser');
import passport = require('passport');
import LocalStrategy = require('passport-local');
import * as UserTable from './database/UserTable'
import {User} from './model/User';

const app: express.Application = express();
dotenv.config();
let port: string;
let distFolder: string;
let devModeEnabled: boolean;

// Fetch some environment variables
if (process.env.PORT_BE) {
    port = process.env.PORT_BE;
} else {
    throw new Error("Environment variable PORT_SERVER undefined!");
}
if (process.env.DIST_FOLDER) {
    distFolder = process.env.DIST_FOLDER;
} else {
    throw new Error("Environment variable DIST_FOLDER undefined!");
}
if (process.env.DEV_MODE_ENABLED) {
    devModeEnabled = (process.env.DEV_MODE_ENABLED === 'true');
} else {
    throw new Error("Environment variable DEV_MODE_ENABLED undefined!");
}

// Deploy frontend?
if (!devModeEnabled) {
    app.use(express.static(__dirname + distFolder));
}

// Add libs for authentication
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure authentication
passport.use(
    new LocalStrategy.Strategy(
        {
            usernameField: "email",
            passwordField: "hashedPw"
        },

        (username, password, done) => {
            UserTable.getUser(username).then((user) => {
                if (user && user.getEmail() === username && user.getHashedPw() === password) {
                    done(null, user);
                } else {
                    done(null, false, {message: 'Incorrect username or password'});
                }
            }).catch((error) => {
                done(error);
            });
        }
    )
);
passport.serializeUser((user: User, done) => {
    done(null, user.getEmail())
});
passport.deserializeUser((email: String, done) => {
    UserTable.getUser(email).then((user) => {
        done(null, user);
    }).catch((error) => {
        done(error);
    });
});

// Create middleware to protect endpoints
const authMiddleware = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('You are not authenticated')
    } else {
        return next()
    }
};

// Add endpoints concerning authentication
app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            console.log(info.message);
            res.statusMessage = info.message;
            res.status(401).send();
            return;
        }

        req.login(user, err => {
            res.send("Logged in");
        });
    })(req, res, next);
});

app.get("/api/logout", function (req, res) {
    req.logout();

    console.log("logged out");

    return res.send();
});

app.get("/api/user", authMiddleware, (req: any, res: any) => {
    UserTable.getUser(req.session.passport.user).then((user) => {
        res.send({user: user});
    }).catch((error) => {
        let msg: String = "Failed to fetch user data."
        console.log(msg);
        res.status(500).send(msg);
    });
});

// app.get('/api', AuthApi.signUp);

app.listen(port);
console.log('Server started! see: http://localhost:' + port);