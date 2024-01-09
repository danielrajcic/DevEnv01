const btn = document.querySelector("#subBtn");

function submitForm(e) {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const userpw = document.querySelector("#userpassword").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "username": username,
    "password": userpw
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://api-simulator.ecom.ddnss.org/login", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

btn.addEventListener("click", submitForm);
