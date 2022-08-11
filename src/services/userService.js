import  {method as getAllUsersServices } from '../database/user';
const { v4: uuid } = require('uuid');

const getAllUsers = () => {
    const allUsers = getAllUsersServices.getAllUsers;
    return allUsers;
};

const getOneUser = () => {
    return;
};
const createNewUser = (newUser) => {
    const userToInsert = {
        ...newUser,
        id: uuid(),
        createdAt: new Date().toLocaleString('en-Us', {timezone: 'UTC'}),
        updatedAt: new Date().toLocaleString('en-Us', {timezone: 'UTC'})
        };
        const createdUser = User.createNewUser(userToInsert);
        return createdUser;
};
const updateUser = () => {
    return;
};
const deleteUser = () => {
    return;
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateUser,
    deleteUser
};