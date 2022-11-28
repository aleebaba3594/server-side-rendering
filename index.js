const express = require("express");
const app = express();
app.set("view engine", "hbs");
app.set("views", "./views"); // 2nd views is folder name
const mysql = require("./config/db").con;
app.use(express.static(__dirname + "/public")); // use this to load static file (__dirname means the current directory we are working with.)
app.use(express.urlencoded());
//  TODO:     for the post req of form like method= post and app.post.apply.call.bind.we use this and also the under below mentioned line where we use express.json middelware

// TODO: if we use get req we use req.query and if we use post req we use req.body
app.use(express.json());
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/add", (req, res) => {
  res.render("add");
});
app.get("/addStudent", (req, res) => {
  const { name, email, password, gender } = req.query;
  let qry = "select * from adduser where email=? && gender=?";
  mysql.query(qry, [email, gender], (err, resp) => {
    if (err) {
      res.send(err + "eror");
    } else {
      if (resp.length > 0) {
        res.render("add", { chkmessage: true });
      } else {
        let qry2 = "insert into adduser values(?,?,?,?)";
        mysql.query(qry2, [name, email, password, gender], (err, resp) => {
          if (resp.affectedRows > 0) {
            res.render("add", { message: true });
          } else {
          }
        });
      }
    }
  });
});

app.get("/delete", (req, res) => {
  res.render("delete");
});
app.get("/update", (req, res) => {
  res.render("update");
});
app.get("/view", (req, res) => {
  res.render("view");
});
app.get("/search", (req, res) => {
  res.render("search");
});
app.get("/searchStudent", (req, res) => {
  const { email } = req.query;
  let qry = "select * from adduser where email=?";
  mysql.query(qry, [email], (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      if (resp.length > 0) {
        res.render("search", { message: true });
      } else {
        res.render("search", { chkmessage: true });
      }
    }
  });
});
app.listen(4000, () => {
  console.warn(`server listening on 4000`);
});
