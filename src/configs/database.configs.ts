import mongoose from "mongoose";
mongoose.set("strictQuery", true);

export default function connectToMongo() {
  mongoose.connect(process.env.DB_URI!)
    .then(() => {
      console.log("Connection to database has been established successfully");
    })
    .catch((err) => {
      console.log("Unable to connect to database");
    }
  );
}