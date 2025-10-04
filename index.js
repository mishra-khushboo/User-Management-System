const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "",
});

// let getRandomUser = () => {
//   return [
//     faker.string.uuid(),
//     faker.internet.username(),
//     faker.internet.email(),
//     faker.internet.password(),
//   ];
// };
let getRandomUser = () => faker.string.uuid();

app.get("/", (req, res) => {
  let q = `select count(*) from user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some err in DB");
  }
});

app.get("/user", (req, res) => {
  let q = `select * from user`;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("showuser.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.send("some err in DB");
  }
});

//edit route

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `select * from user where id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("some err in DB");
  }
});

//update (db) route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPassword, username: newusername } = req.body;
  let q = `select * from user where id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formPassword != user.password) {
        res.send("Wrong password");
      } else {
        let q2 = `update user set username = '${newusername}' where id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some err in DB");
  }
});

//add new user
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/newUser", (req, res) => {
  let { username, email, password } = req.body;
  let id = getRandomUser();
  let q3 = `insert into user (id,username,email,password) values (?,?,?,?)`;
  try {
    connection.query(q3, [id, username, email, password], (err, result) => {
      if (err) throw err;
      res.redirect("/user");
    });
  } catch (err) {
    console.log(err);
    res.send("some err in DB");
  }
});

//delete user
app.delete("/user/:id/delete", (req, res) => {
  let { id } = req.params;

  q4 = `delete from user where id = ?`;
  try {
    connection.query(q4, [id], (err, result) => {
      if (err) throw err;
      res.redirect("/user");
    });
  } catch (err) {
    console.log(err);
    res.send("some err in DB");
  }
});

app.listen("8080", () => {
  console.log("sever is working 8080");
});
