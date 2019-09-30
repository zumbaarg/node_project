const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");

// importing routes

const customerRoutes = require("./routes/customer");

// settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

//middlewares
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "zumba",
      password: "asd123",
      database: "crudnodejsmysql"
    },
    "single"
  )
);

app.use(express.urlencoded({ extended: false }));
// routes

app.use("/", customerRoutes);

// staticts files

app.use(express.static(path.join(__dirname, "public")));

// starting the server

app.listen(app.get("port"), () => {
  console.log("server on port 3000");
});
