import mongoose from "mongoose";

const DatabaseConnection = async () => {
  const con = await mongoose
    .connect(
      `mongodb+srv://PradeepSahu:PradeepSahu@cluster0.vkgne.mongodb.net/wisePayment?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then((res) => {
      console.log("The databse connected to the database");
    })
    .catch((error) => {
      console.log("Their is some error while connecting with the database");
    });
};

export default DatabaseConnection;
