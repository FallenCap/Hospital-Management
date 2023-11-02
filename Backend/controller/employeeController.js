import connect from '../server.js';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

// * Sign in function.
export const signIn = async (req, res) => {
  try {
    const db = await connect();

    let {
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      phone_number,
    } = req.body;

    // TODO: checking the password and confirmPassword.
    if (password !== confirmPassword)
      throw new Error(
        'Please use same password in the password and confirm password field!'
      );

    //   TODO: Creating unique id.
    const employee_id = uuid();

    // TODO: Hashing the password.
    password = await bcrypt.hash(password, 12);
    // console.log(password);

    // TODO: creating query.
    const query = `call signIn(
        '${employee_id}',
        '${first_name}',
        '${last_name}',
        '${email}',
        '${password}',
        '${phone_number}'
        )`;

    // console.log(query);

    // TODO: executing the query.
    await db.query(query);

    // TODO: Sending sucess response.
    res.status(201).json({
      status: 'Sucess',
      message: 'Sign in sucessfully!',
    });
  } catch (error) {
    // TODO: Sending error response.
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

// * Log in function.
export const logIn = async (req, res) => {
  try {
    const db = await connect();

    const { email, password } = req.body;

    // TODO: Creating the query.
    const query = `call logIn('${email}')`;

    // TODO: executing the query.
    const employee = await db.query(query);

    // TODO: Checking that the given password are same as stored password.
    if (!(await bcrypt.compare(password, employee[0][0][0].password)))
      throw new Error('Please enter the correct password!');

    // console.log(employee);

    res.status(200).json({
      status: 'sucess',
      data: {
        employee: employee[0][0][0],
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};
