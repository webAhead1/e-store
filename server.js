const express = require("express");
const PORT = process.env.PORT || 3000;
const path = require("path");
const products = require("./public/products/products.js");
const cookieParser = require("cookie-parser");
var jwt = require('jsonwebtoken');

const db = require("./public/database/connection.js");
const server = express();

let items= [{itemName: "iphone 13 128GB"},{itemName: "Galaxy22"},{itemName: "Galaxy note"}]
const yourCart=require("./public/cart/cart.js");

let cart=[];
const { parse } = require("path");
server.use(cookieParser());
server.use(express.static("public"));

server.get("/cart/:title", (req, res) => {
  cart = cart.filter((p) => p.name !== req.params.title);
  res.redirect("/shoppingCart");
});

// --LOGIN--
server.post("/login",express.json(), (req, res) => {
  try {
  console.log("start of /login");
  // check if data in form is valid
  const {email, password} = req.body;
  if (!(email && password)) {
    throw "All input is required";
  }
  // check if user exists
  db.query("SELECT * FROM users").then((result) => {
    const users = result.rows;
    const emailList = users.map((user) => user.email);
    console.log(emailList)
    let newUser = users.find( (user) => user.email == email)
    console.log(newUser)
    if(newUser){
      const token = jwt.sign(
        { email },
        "sshhhhhhhh",
        {
          expiresIn: "2h",
        }
      );
      // save user token
      newUser.token = token;
      res.status(200).json({token})
      } else {
      // if user doesn't exist send an error message
      throw "Invalid Credentials";
      }
  });
} catch(e) {
  console.error(e);
}
});


// --REGISTER--
server.post("/register",express.json(), (req, res) => {
  try {
  console.log("start of /register");
   // get user data
    const { username, email, password, confirm_password } = req.body;
   // check if data in form is valid (for example: boxes not empty, there is a '@' in the email box, check password integrity)
   if (!(username && email && password && confirm_password)) {
    // res.status(411).send({"msg":"All input is required"});
    // throw "All input is required";
    console.log("All input is required");
  }
   // check if already exists
   db.query(`SELECT * FROM users WHERE email='${email}'`).then((result) => {
    const users = result.rows;
    // if already exists: send back error message
    if(users.length>0){
      // throw "user already exists";
      console.log("user already exists");
    }
    // if passwords don't match send error
    else if(password !== confirm_password){
      // throw "passwords must match";
      console.log("passwords must match");
    }
    // create user
    db.query("INSERT INTO users(username, email, password) VALUES($1, $2, $3)", [username, email, password]);
    // db.query("INSERT INTO users(email) VALUES($1)", [email]);
    // db.query("INSERT INTO users(password) VALUES($1)", [password]);
    //  create jwt token
    const token = jwt.sign(
      { username, email },
      "sshhhhhhhh",
      {
        expiresIn: "2h",
      }
    );
    res.status(201).json({token})
   });
    }catch(e) {
    console.error(e);
}
});

server.get("/Products", async (req,res) => {
  const result = await db.query(
    "SELECT * FROM products"
  )
  const html = products.allItems(result.rows);
    res.send(html);
});
server.get("/Products/:itemName", async (req,res)=>{
  const items = await db.query(
    "SELECT * FROM products"
  )
  const product = items.rows.find((p) => p.name === req.params.itemName);
  cart.push(product);
  
  res.redirect("/shoppingCart");
  });

server.get("/shoppingCart", (req,res) => {
  const html = yourCart.yourCart(cart);
    res.send(html);
});


server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
