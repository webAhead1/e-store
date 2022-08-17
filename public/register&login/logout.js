// const logout = document.querySelector("#logout")
const btn = document.getElementById('logoutButton');

btn.addEventListener("click", e => {
  e.preventDefault();
  console.log("button clicked")
  fetch('http://localhost:3000/logout', {
        method: 'POST', // or 'PUT'
         headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) =>{
      console.log(response);
      return response.json()
  })
  .then((data) => {
    if (!data.ok) {
      alert(data.message)
      throw new Error(data)
  }
  console.log('Success:', data);
  console.log(data.message)
  // let loginButton = document.getElementById("loginButton");
  // let logoutButton = document.getElementById("logoutButton");
  // logoutButton.style.display = "none";
  // loginButton.style.display = "block";
  alert("Successfully logged out")
  document.location.href="/"
  })
  .catch((error) => {
  console.error('Error:', error);
  });
})
