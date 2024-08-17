//import connectToDB from "./configs/dbConn.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import app from "./app.js";
console.log('Environment variables loaded.');
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("MONGO_URL:", process.env.MONGO_URL); // Should not be undefined
console.log("DATABASE_PASSWORD:", process.env.DATABASE_PASSWORD);
mongoose.set("strictQuery", false);
console.log("MONGO_URL:", process.env.MONGO_URL)

const connectToDB = async () => {
    try {
        const { connection } = await mongoose.connect(
            process.env.MONGO_URL.replace(
                '<PASSWORD>',
                process.env.DATABASE_PASSWORD
            )
        );

        if (connection) {
            console.log(`connected to MongoDB: ${connection.host}`)
        }

    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};



const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectToDB();
    console.log(`app is running at http://localhost:${PORT}`);
});