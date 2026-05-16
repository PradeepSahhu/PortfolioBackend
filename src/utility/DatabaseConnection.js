import mongoose from "mongoose";

const DatabaseConnection = async () => {
  const con = await mongoose
    .connect(
      `dbconnectionString`
    )
    .then((res) => {
      console.log("The databse connected to the database");
    })
    .catch((error) => {
      console.log("Their is some error while connecting with the database");
    });
};

export default DatabaseConnection;
