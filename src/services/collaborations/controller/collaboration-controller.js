import collaborationRepositories from '../repositories/collaboration-repositories.js';
import noteRepositories from '../../notes/repositories/note-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import AuthorizationError from '../../../exceptions/authorization-error.js';

export const addCollaboration = async (req, res, next) => {
    const { id: creditialId } = req.user;
    const { noteId, userId } = req.validate;

    const isOwner = await noteRepositories.verifyNoteOwner(noteId, creditialId);
    if (!isOwner) {
        return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
    }

    const collaboration = await collaborationRepositories.addCollaboration(noteId, userId);
    if (!collaboration) {
        return next(new InvariantError('Kolaborasi gagal ditambahkan'));
    }

    return response(res, 201, 'Kolaborasi berhasil ditambahkan', { collaborationId: collaboration });
};

export const deleteCollaboration = async (req, res, next) => {
    const { noteId, userId } = req.validate;
    const { id: creditialId } = req.user;

    const isOwner = await noteRepositories.verifyNoteOwner(noteId, creditialId);
    if (!isOwner) {
        return next (new AuthorizationError('Anda tidak berhak mengakses resource ini'));
    }
    await collaborationRepositories.deleteCollaboration(noteId, userId);

    return response(res, 200, 'Kolaborasi berhasil dihapus', '');
};