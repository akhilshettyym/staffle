import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Server connected to DB");
    } catch (err) {
        console.error("MongoDB connection failed", err.message);
        process.exit(1);
    }
};

export default connectDB;

// function connectToDB() {
//     mongoose.connect(process.env.MONGO_URI)
//         .then(() => {
//             console.log("Server connected to DB");
//         })
//         .catch((err) => {
//             console.log("Error connecting to DB", err);
//             process.exit(1);
//         })
// }

// module.exports = connectToDB;