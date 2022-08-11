
const { verifyToken } = require('../helpers/generateToken')
const userControllers = require('../controllers/userControllers');

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop(); //TODO: 231231321
        const tokenData = await verifyToken(token);
        const user2 = await userControllers.getOneUserId(tokenData._id);
        //TODO ['user'].includes('user')
        if ([].concat(roles).includes(user2.role)) { //TODO:
            next()
        } else {
            res.status(409)
            res.send({ error: 'No tienes permisos' })
            return;
        }

    } catch (e) {
        // console.log(e)
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
        return;
    }

}

module.exports = checkRoleAuth