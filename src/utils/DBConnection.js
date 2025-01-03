import mongoose from "mongoose";

export const DBConnection = () => {
    mongoose.connect(process.env.MONGO_DB_URL, {
        dbName: "Take_Bus_DB"
    }).then(() => console.log("DBConnected")).catch(() => console.log("DB not Connected"))
}