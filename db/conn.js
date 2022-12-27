import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const db = mongoose.connect(process.env.ATLAS_URI,
  { useNewUrlParser: true },
  { useUnifiedTopology: true },
).then(() => {
  console.log("Connection Succesful");
}).catch((err) => {
  console.log("Connection Fail");
});

export default db;
