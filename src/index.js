const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")
const bcrypt = require("bcrypt")

const tempelatePath = path.join(__dirname, "../tempelates")
const quizPath = path.join(__dirname, "../quiz")
const publicPath = path.join(__dirname, "../public")

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempelatePath)
app.use(express.urlencoded({ extended: false }))
app.use(express.static(quizPath))
app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    next();
});

app.use("/quiz", express.static(quizPath));
app.use("/public", express.static(publicPath));

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/script.js", (req, res) => {
    res.type("application/javascript");
    res.sendFile(path.join(quizPath, "script.js"));
});

app.post("/signup", async (req, res) => {
    try {
        const existingUser = await collection.findOne({ name: req.body.name });

        if (existingUser) {
            res.send("User with this name already exists");
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const data = {
                name: req.body.name,
                password: hashedPassword,
            }

            await collection.insertMany([data])
            res.render("login");
        }
    } catch (error) {
        console.error(error);
        res.send("An error occurred");
    }
});
app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.name });

        if (user) {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if (passwordMatch) {
                res.render("home");
            } else {
                res.send("Wrong password");
            }
        } else {
            res.send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.send("An error occurred");
    }
});

app.listen(3000, () => {
    console.log("port connected");
})

