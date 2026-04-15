import UserRepositories from '../repositories/user-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createUser = async (req, res, next) => {
    const { username, password, fullname } = req.validate;

    const isUsernameExist = await UserRepositories.verifyNewUsername(username);
    if (isUsernameExist) {
        return next(new InvariantError('Gagal menambahkan user. Username sudah digunakan.'));
    }

    const user = await UserRepositories.createUser({ username, password, fullname });
    if (!user) {
        return next(new InvariantError('User gagal ditambahkan'));
    }
  
  return response(res, 201, 'User berhasil ditambahkan', {
  id: user.id,
});
};

export const getUserById = async (req, res, next) => {
    const { id } = req.params;
    const user = await UserRepositories.getUserById(id);

    if(!user) {
        return next( new NotFoundError('User tidak ditemukan'));
    }
// MENJADI SEPERTI INI (Sesuai ekspektasi Test Case B):
return response(res, 200, 'User berhasil ditampilkan', {
    id: user.id,
    username: user.username,
    fullname: user.fullname,
    created_at: user.created_at, // Pastikan ini ada di objek user dari repo
    updated_at: user.updated_at, // Pastikan ini ada di objek user dari repo
});
};

export const getAllUsers = async (req, res, next) => {
    const users = await UserRepositories.getAllUsers();
    return response(res, 200, 'User berhasil diperoleh', { users });
};
