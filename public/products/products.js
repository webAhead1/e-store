function allItems(items){
  return /*html*/`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ElctroShop</title>
    <link rel="stylesheet" href="products.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<header>
  <div class="navbar">
  <a href="/index.html">Home</a>
  <a href="/products">Products</a>
  <a href="/shoppingCart"><div class="cart"><i class="fa fa-shopping-cart fa-1x"></i><div class="number-of-items"><span class="noi">0</span></div></div></a>
</div>
    <a href="/register&login/login.html"><button id="loginButton" class="loginButton">Login</button></a>
    <button id="logoutButton" class="logoutButton">Logout</button>
    <a href="/register&login/register.html"><button id="registerButton">Register</button></a>
</header>
<form action="/Products" method="POST">
<ul>
    ${items
      .map(
        (item) => `
          <li>
            <p class="items">${item.name},${item.quantity},${item.price}$<a href="/products/${item.name}">add to cart</a>
            <img src="pictures/${item.name}.png" alt="airPods" width="128" height="128"></p>
          </li>
        `
        )
        .join("")}
  </ul>
  <script src="logout.js"></script>
</body>
</html>
`
}
module.exports = {allItems};