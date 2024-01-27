const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/UserDb")
.then(() => {
    console.log("mongodb connected");
})
.catch((error) => {
    console.log("failed to connect", error.message);
})

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true    
    }
})

const collection = new mongoose.model("UsersDatabase", LogInSchema)

module.exports = collection