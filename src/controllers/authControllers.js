const { compare } = require("../helpers/handleBcrypt");
const { tokenSign } = require("../helpers/generateToken");
import { getConnection } from "./../database/database";

const loginCtrl = async (req, res) => {
  try {
    const { username, password } = req.body;
    const connection = await getConnection();
    const user = await connection.query(
      "select id_user, username, password, role from users where username = " +
        connection.escape(username) + 'and state = "0"'
    );
    if (user.length < 1) {
      res.status(404);
      res.send({ status: "Not Found", message: "User not exists" });
      return;
    }
    const filterUser = await user.reduce(async(previus, current) => {
            const checkPassword = await compare(password, current.password);
            if (checkPassword) {
                return current;
            }
            return false;
        }
    );
    if (filterUser === false) {
      res.status(409).json({error: "Invalid password"});
      return;
    }
    const tokenSession = await tokenSign(filterUser);
    res.send({ status: "ok", data: filterUser, tokenSession });
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};

module.exports = {
  loginCtrl,
};
