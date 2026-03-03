import db from "../db/db.js";

export const findUserByUsername = async (username) => {
    const [results] = await db.query(
        "SELECT userId, username, password, role FROM users WHERE username = ? LIMIT 1",
        [username]
    );
    return results[0];
};

export const createUser = async (username, password, role = "user") => {
    const [result] = await db.execute(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [username, password, role]
    );

    return {
        userId: result.insertId,
        username,
        role
    };
};