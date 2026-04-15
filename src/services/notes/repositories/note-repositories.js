import { Pool } from 'pg';
import { nanoid } from "nanoid";

class NoteRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createNote({ title, body, tags, owner }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
             text: 'INSERT INTO notes(id, title, body, tags, created_at, updated_at, owner) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, title, body, tags, created_at, updated_at',
             values: [id, title, body, tags, createdAt, updatedAt, owner],
        };
        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async getNotes(owner) {
        const query = {
            text: 'SELECT * FROM notes WHERE owner = $1',
            values: [owner],
        };

        const result = await this.pool.query(query)
        
        return result.rows;
    }

    async getNoteById(id) {
        const query = {
            text: 'SELECT * FROM notes WHERE id = $1',
            values: [id],
        }

        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async editNote({ id, title, body, tags }) {
        if (title == null) {
            const error = new Error('Title cannot be null');
            error.statusCode = 400;
            throw error;
        }
        const updatedAt = new Date().toISOString();

        const query = {
            text: 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING *',
            values: [title, body, tags, updatedAt, id],
        }
        
        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async deleteNote(id) {
        const query = {
            text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
            values: [id],
        }

        const result = await this.pool.query(query)

       return result.rows.length > 0 ? result.rows[0] : null;
    }

    async verifyNoteOwner(id, owner) {
        const query = {
            text: 'SELECT * FROM notes WHERE id = $1 AND owner = $2',
            values: [id, owner],
        };
        const result = await this.pool.query(query);
        return result.rows.length > 0;
    }
}

export default new NoteRepositories();