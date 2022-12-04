// -- Moongose
import mongoose from "mongoose";

// -- Settings
const user = "admin";
const password = "12345";
const cluster = "@cluster0.kalpivn.mongodb.net";
const dbName = "blog";

// `mongodb+srv://admin:12345@cluster0.kalpivn.mongodb.net/blog?retryWrites=true`
// -- Подключене к БД
export const getConnection = () => {
  mongoose
    .connect(
      process.env.MONGODATABASE_URI ||
        `mongodb+srv://${user}:${password}${cluster}/${dbName}?retryWrites=true`
    )
    .then(() => {
      console.log("Successful connection to the database");
    })
    .catch((err) => {
      console.log(err, "Connect error");
    });
};
