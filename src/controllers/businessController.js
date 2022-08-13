import { getConnection } from "./../database/database";


const getAllBusiness = async (req, res) => {
  try {
    const connection = await getConnection();
    const allBusiness = await connection.query(
      'SELECT id_business, name, description, phone, address, email1, email2, email3, state from business where state = "0";'
    );
    res.send({ status: "ok", data: allBusiness });
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};

const getOneBusiness = async (req, res) => {
  try {
    const connection = await getConnection();
    const business = await connection.query(
        'SELECT id_business, name, description, phone, address, email1, email2, email3, state from business where state = "0" and id_business = ' + connection.escape(req.params.businessId));
    if (business.length < 1) {
      res.status(404);
      res.send({ status: "Not Found", message: 'Business not found' });
      return;
    } else {
      res.send({ status: "ok", data: business });
      return;
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};


const createNewBusiness = async (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.description ||
    !body.phone ||
    !body.address ||
    !body.email1 ||
    !body.email2 ||
    !body.email3 ||
    !body.state
  ) {
    res.status(400).json({message: 'Bad Request.'});
    return;
  }

  const newBusiness = {
    name: body.name,
    description: body.description,
    phone: body.phone,
    address: body.address,
    email1: body.email1,
    email2: body.email2,
    email3: body.email3,
    state: "0"
  };
  try {
    const connection = await getConnection();
    await connection.query('insert into business set ?', newBusiness);
    res.json({message: 'Business added'});
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};

const updateBusiness = async(req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.description ||
    !body.phone ||
    !body.address ||
    !body.email1 ||
    !body.email2 ||
    !body.email3 ||
    !body.state
  ) {
    res.status(400).json({message: 'Bad Request.'});
    return;
  }
  const updateBusiness = {
    name: body.name,
    description: body.description,
    phone: body.phone,
    address: body.address,
    email1: body.email1,
    email2: body.email2,
    email3: body.email3,
    state: "0"
  };
  try {
    const connection = await getConnection();
    await connection.query('update business set ? where id_business = ?', [updateBusiness, req.params.businessId]);
    res.json({message: 'Business updated'});
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};

const deleteBusiness = async(req, res) => {
  try {
    const connection = await getConnection();
    await connection.query('update business set state = "1" where id_business = ' + connection.escape(req.params.businessId));
    res.json({message: 'Business deleted'});
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};


module.exports = {
    getAllBusiness,
    getOneBusiness,
    createNewBusiness,
    updateBusiness,
    deleteBusiness,

};
