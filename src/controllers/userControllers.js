import { getConnection } from "./../database/database";
const { encrypt } = require('../helpers/handleBcrypt');


const getAllUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const allUser = await connection.query(
      'SELECT u.id_user, u.username, u.role, b.name name_business, u.state from users u inner join business b on u.id_business = b.id_business where u.state = "0";'
    );
    res.send({ status: "ok", data: allUser });
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};

const getOneUser = async (req, res) => {
  try {
    const connection = await getConnection();
    const user = await connection.query(
      'SELECT u.id_user, u.username, u.role, b.name name_business, u.state from users u inner join business b on u.id_business = b.id_business where u.state = "0" and u.id_user =' + connection.escape(req.params.userId));
    if (user.length < 1) {
      res.status(404);
      res.send({ status: "Not Found", message: 'User not found' });
      return;
    } else {
      res.send({ status: "ok", data: user });
      return;
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};


const createNewUser = async (req, res) => {
  const { body } = req;
  if (
    !body.username ||
    !body.password ||
    !body.role ||
    !body.id_business
  ) {
    res.status(400).json({message: 'Bad Request.'});
    return;
  }

  const passwordHash = await encrypt(body.password); 
  const newUser = {
    username: body.username,
    password: passwordHash,
    role: body.role,
    id_business: body.id_business,
    state: "0"
  };
  try {
    const connection = await getConnection();
    await connection.query('insert into users set ?', newUser);
    res.json({message: 'User added'});
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};

const updateUser = async(req, res) => {
  const { body } = req;
  if (
    !body.username ||
    !body.password ||
    !body.role ||
    !body.id_business
  ) {
    res.status(400).json({message: 'Bad Request.'});
    return;
  }
  const passwordHash = await encrypt(body.password); 
  const updateUser = {
    username: body.username,
    password: passwordHash,
    role: body.role,
    id_business: body.id_business,
    state: '0',
  };
  try {
    const connection = await getConnection();
    await connection.query('update users set ? where id_user = ?', [updateUser, req.params.userId]);
    res.json({message: 'User updated'});
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};

const deleteUser = async(req, res) => {
  try {
    const connection = await getConnection();
    await connection.query('update users set state = "1" where id_user = ' + connection.escape(req.params.userId));
    res.json({message: 'User deleted'});
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};


const getOneUserId = async (userId) => {
  try {
    const connection = await getConnection();
    const user = await connection.query(
      'SELECT u.id_user, u.username, u.role, b.name name_business, u.state from users u inner join business b on u.id_business = b.id_business where u.state = "0" and u.id_user =' + userId.toString());
    if (user.length < 1) {
      return({ status: "Not Found", message: 'User not found' });
    } else {
      return user[0];
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateUser,
  deleteUser,
  getOneUserId
};
