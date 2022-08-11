function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form-message");

    messageElement.textContent = message;
    messageElement.classList.remove("success-message", "error-message");
    messageElement.classList.add(`${type}-message`);
}

const createAccountForm = document.querySelector("#createAccount");

createAccountForm.addEventListener("submit", e => {
    e.preventDefault();
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
        console.log(response);
        return response
    } )
    .then((data) => {
    console.log('Success:', data);
    document.location.href="/"
    alert("You are logged in")
    })
    .catch((error) => {
    setFormMessage(createAccountForm, "error", "Passwords must match");
    console.error('Error:', error);
    });
    
})
