function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form-message");

    messageElement.textContent = message;
    messageElement.classList.remove("success-message", "error-message");
    messageElement.classList.add(`${type}-message`);
}

    let loginButton = document.getElementById("loginButton");
    let logoutButton = document.getElementById("logoutButton");
    let loginDisplay = loginButton.style.display;
    let logoutDisplay = logoutButton.style.display;
    localStorage.setItem("loginDisplay", "none");
    localStorage.setItem("logoutDisplay", "block");

const loginForm = document.querySelector("#login");

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(loginForm);
    
    var object = {};
    data.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);

    console.log(json)
    fetch('http://localhost:3000/login', {
        method: 'POST', // or 'PUT'
         headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    })
    .then((response) =>{
        console.log(response);
        return response.json();
    } )
    .then((data) => {
    if (!data.token) {
        console.log("batata")
        console.log(data.message)
        setFormMessage(loginForm, "error", data.message);
        throw new Error(data)
    }
    setFormMessage(loginForm, "success", "You are logged in");
    // let loginButton = document.getElementById("loginButton");
    // let logoutButton = document.getElementById("logoutButton");
    // logoutButton.style.display = "block";
    // loginButton.style.display = "none";
    
    alert("You are logged in")
    document.location.href="/"
    })
    .catch((error) => {
    alert("You are not logged in")
    console.error(error);
    });
}) 


