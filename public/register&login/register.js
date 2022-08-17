function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form-message");

    messageElement.textContent = message;
    messageElement.classList.remove("success-message", "error-message");
    messageElement.classList.add(`${type}-message`);
}

const createAccountForm = document.querySelector("#createAccount");

createAccountForm.addEventListener("submit", e => {
    e.preventDefault();
    // createAccountForm.querySelector(".form-message").textContent.clear();
    const data = new FormData(createAccountForm);
   
    var object = {};
    data.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);

    console.log(json)
    fetch('http://localhost:3000/register', {
        method: 'POST', // or 'PUT'
         headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    })
    .then((response) =>{
        // if(response.ok){
        //     return response
        // } else {
        //     throw new Error(response)
        // }
        return response.json();
    } )
    .then((data) => {
        if (!data.token) {
            console.log(data.message)
            setFormMessage(createAccountForm, "error", data.message);
            throw new Error(data)
        }
        console.log(data)
        console.log('Success:', data);
        // let loginButton = document.getElementById("loginButton");
        // let logoutButton = document.getElementById("logoutButton");
        // logoutButton.style.display = "block";
        // loginButton.style.display = "none";
        // let loginButton = document.getElementById("loginButton");
        // let logoutButton = document.getElementById("logoutButton");
        // localStorage.setItem(loginButton.style.display, "none");
        // localStorage.setItem(logoutButton.style.display, "block");
        alert(`You have registered successfully!`)
        document.location.href="/"
        // setFormMessage(createAccountForm, "success", "You have registered successfully");
    })
    .catch((error) => {
        console.log(error)
        // setFormMessage(createAccountForm, "error", error);
    });
})
