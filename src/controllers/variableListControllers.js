import { getConnection } from "./../database/database";


const getAllVariableList = async (req, res) => {
  try {
    const connection = await getConnection();
    const respVariableList = await connection.query(
      'SELECT id_variable, name, list_values, state FROM variable_list where state  = "0";'
      );
    const allVariableList = [];
    respVariableList.forEach(element => {
        element.list_values = element?.list_values.toString().split(',');
        console.log(element);
        allVariableList.push(element);
    });
    res.send({ status: "ok", data: allVariableList });
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};

const updateVariableList = async(req, res) => {
  const { body } = req;
  const list = body.list_values;
  console.log(body, list);
  if (
    !list ||
    list.length < 1 ||
    !body.name ||
    !body.state
  ) {
    res.status(400).json({message: 'Bad Request.'});
    return;
  }
  const updatedVariableList = {
    name: body.name,
    list_values: list.toString().toUpperCase(),
    state: '0',
  };
  try {
    const connection = await getConnection();
    await connection.query('update variable_list set ? where id_variable = ?', [updatedVariableList, req.params.variableListId]);
    res.json({message: 'Variable List updated'});
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};


module.exports = {
  getAllVariableList,
  updateVariableList
};
