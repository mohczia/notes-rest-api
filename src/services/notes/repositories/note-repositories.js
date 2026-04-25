import  pool  from '../../../database/pool.js';
import { nanoid } from "nanoid";
import CollaborationRepositories from '../../collaborations/repositories/collaboration-repositories.js';

class NoteRepositories {
    constructor() {
       
        this.CollaborationRepositories = CollaborationRepositories;
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
            text: `SELECT notes.* FROM notes
            LEFT JOIN collaborations ON collaborations.note_id = notes.id
            WHERE notes.owner = $1 OR collaborations.user_id = $1
            GROUP BY notes.id`,
            values: [owner],
        };

        const result = await this.pool.query(query)

        return result.rows;
    }

    async getNoteById(id) {
        const query = {
            text: `SELECT notes.*, users.username
                   FROM notes
                   LEFT JOIN users ON users.id = notes.owner
                   WHERE notes.id = $1`,
            values: [id],
        };

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

    async verifyNoteAccess(noteId, userId) {
        const ownerResult = await this.verifyNoteOwner(noteId, userId);

        if (ownerResult) {
            return ownerResult;
        }

        const result = await this.CollaborationRepositories.verifyCollaborator(noteId, userId);

        return result;
    }
}

export default new NoteRepositories();