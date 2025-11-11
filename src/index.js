import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// Load environment variables
dotenv.config({
  path: "./.env", // Make sure it's `.env` not `env`
});

// Connect to MongoDB
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log(`ERROR: ${error}`)
    console.log(`MONGO Database Connection Failed`)
})