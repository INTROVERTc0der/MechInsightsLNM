import app from "./app.js";
import connectToDB from "./configs/dbConn.js";

const PORT= process.env.PORT || 4000;


app.listen(PORT,async () => {
    await connectToDB();
    console.log(`app is running at http://localhost:${PORT}`);
});