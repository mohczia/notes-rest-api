import  pool  from '../../../database/pool.js';
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";


class UserRepositories {
   
async createUser({ username, password, fullname }) {
    const id = nanoid(16);
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = { 
        text: 'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        values: [id, username, hashedPassword, fullname, createdAt, updatedAt],
    };
    const result = await pool.query(query);
    return result.rows[0];
};

async verifyNewUsername (username) {
    const query = {
        text: 'SELECT username FROM users WHERE username = $1',
        values: [username] 
    };
    const result = await pool.query(query);
    return result.rows.length > 0;
};

async getUserById (id) {
    const query = {
        text: 'SELECT * FROM users WHERE id = $1',
        values: [id],
    };
    const result = await pool.query(query);
    return result.rows[0];
};

async verifyUserCredential(username, password) {
    const query = {
        text: 'SELECT id, password FROM users WHERE username = $1',
        values: [username],
    };
    const user = await pool.query(query);
     
    if (!user.rows.length) {
        return null;
    }
    
    const { id, password: hashedPassword } = user.rows[0];
    const isPasswordNatch = await bcrypt.compare(password, hashedPassword);

    if(!isPasswordNatch) {
        return null;
    }
    return id;
}

async getAllUsers() {
    const query = {
        text: 'SELECT id, username, fullname FROM users',
    };
    const result = await pool.query(query);
    return result.rows;
}

async getUsersByUsername(username) {
    const query = {
        text: 'SELECT id, username, fullname FROM users WHERE username LIKE $1',
        values: [`${username}%`],
    };

    const result = await pool.query(query);
    return result.rows;
}

}
export default new UserRepositories;
