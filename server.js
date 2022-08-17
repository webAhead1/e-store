const express = require("express");
const PORT = process.env.PORT || 3000;
const path = require("path");
const products = require("./public/products/products.js");
const cookieParser = require("cookie-parser");
var jwt = require('jsonwebtoken');


const db = require("./public/database/connection.js");
const server = express();

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    // res.status(403).send({message: "You need to log in first"})
    // return
    res.redirect(path.join( '/register&login', '/login.html'));
    // return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, "sshhhhhhhh");
    console.log(data)
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

server.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, '/public/register&login', '/login.html'));
  // res.sendFile(path.join(__dirname, '/public/register&login', 'register&login.css'));
})

let items= [{itemName: "iphone 13 128GB"},{itemName: "Galaxy22"},{itemName: "Galaxy note"}]
const yourCart=require("./public/cart/cart.js");

let cart=[];
const { parse } = require("path");
const { urlencoded } = require("express");
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
    res.status(401).send({message: "All input is required"})
    return
  }
  // check if user exists
  db.query("SELECT * FROM users").then((result) => {
    const users = result.rows;
    const emailList = users.map((user) => user.email);
    console.log(emailList)
    let existingUser = users.find( (user) => user.email == email)
    console.log({existingUser})
    if(existingUser){
      const token = jwt.sign(
        { email },
        "sshhhhhhhh",
        {
          expiresIn: "2h",
        }
      );
      return res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({token});
      // res.status(200).json({token})
      } else {
      // if user doesn't exist send an error message
      res.status(401).send({message: "Invalid Credentials"})
      return
      }
  });
} catch(e) {
  console.error(e);
}
});


// --REGISTER--
server.post("/register",express.json(), (req, res) => {
  console.log("start of /register");
   // get user data
    const { username, email, password, confirm_password } = req.body;
   // check if data in form is valid (for example: boxes not empty, there is a '@' in the email box, check password integrity)
   if (!(username && email && password && confirm_password)) {
    res.status(401).send({message: "All input is required"})
    return
  }
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex)) {
    res.status(401).send({message: "Please enter a valid email address"})
      return
  }
   // check if already exists
   db.query(`SELECT * FROM users WHERE email='${email}'`).then((result) => {
    // try {
    const users = result.rows;
    // if already exists: send back error message
    if(users.length>0){
      res.status(401).send({message: "That User already exists"})
      return
    }
    // if passwords don't match send error
    else if(password !== confirm_password){
      // throw "passwords must match";
      res.status(401).send({message: "Passwords must match"})
      return
    }
    if(password.length<8) {
      res.status(401).send({message: "Password must be at least 8 characters long"})
      return
    }
    // create user
    db.query("INSERT INTO users(username, email, password) VALUES($1, $2, $3)", [username, email, password]);
    //  create jwt token
    const token = jwt.sign(
      { username, email },
      "sshhhhhhhh",
      {
        expiresIn: "2h",
      }
    );
    return res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({token});
   }) 
  });
   
server.post("/logout", authorization, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});


server.get("/Products", authorization, async (req,res) => {
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
  console.log(product)
  cart.push(product);
  
  res.redirect("/shoppingCart");
  });

server.get("/shoppingCart", authorization, (req,res) => {
  const html = yourCart.yourCart(cart);
    res.send(html);
});


server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

