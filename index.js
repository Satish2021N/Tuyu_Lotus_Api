import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;
let pwd = "";
let userIsAuthorised = "";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
const Password = (req, res, next) => {
  console.log(req.body);
  pwd = req.body["password"];
  if (pwd === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
};

app.use(Password);

app.get("/", (req, res) => {
  console.log("Hello");
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
