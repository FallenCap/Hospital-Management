import app from './app.js';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// TODO: configuring path for dotenv
dotenv.config({ path: './.env' });

// TODO: Connecting server to the defining port.
app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});

// TODO: Connecting database server.
const connect = async () => {
  try {
    var connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: process.env.DATABASE_PASSWORD,
      database: 'hospital_management',
    });
    console.log('Database running sucessfully');
    return connection;
  } catch (error) {
    console.log(error.messege);
  }
};

export default connect;
