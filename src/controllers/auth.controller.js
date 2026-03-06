import { createUser, findUserByUsername, validatePassword } from "../services/user.service.js";

 const loginPage = (req, res) => {
    res.render("login", {
        title: "Login",
        errors: req.query.errors || null
    });
};

const registerPage = (req, res) => {
    res.render("register", {
        title: "Register",
        errors: req.query.errors || null
    });
};

const register = async (req, res) => {
    const { username, password, confirm, role } = req.body;

    if (!username || !password || !confirm) {
        return res.redirect("/register?errors=All fields required");
    };

    if(password !== confirm){
        return res.redirect("/register?errors=Password do not match!!");
    };

    if (role !== "user" && role !== "admin"){
        return res.redirect("/register?errors=Invalid role!!!");
    };

    await createUser(username, password, role);
    return res.redirect("/login");
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password ) {
        return res.redirect("/login?errors=All fields required");
    };

    const user = await findUserByUsername(username);

    if (!user) {
        return res.redirect("/login?errors=Invalid credentials");
    }

    const isValid = await validatePassword(password, user.password);

    if(!isValid){
        return res.redirect("/login?errors=Invalid credentials!!")
    }

    req.session.user = {
        userID: user.userID,
        username: user.username,
        role: user.role
    }

    return res.redirect("/dashboard");
};


// eslint-disable-next-line consistent-return
export const isLoggedIn = (req, res , next) => {
    if(!req.user) {
        return res.redirect("/login?errors=Please log in first");
    };
    next();
};



// eslint-disable-next-line arrow-body-style
export const hasRole = (role) => {

    // eslint-disable-next-line consistent-return
    return(req, res, next) => {
        if (!req.user || req.user.role !== role){
            return res.redirect("/login?errors=Access denied")
        };
        next();
    }
}

export const logout = (req, res) => {
    req.session.destroy(() => {
        return res.redirect("/login");
    })
}

export default { loginPage, registerPage, register, login };