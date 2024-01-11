let jwt = "";

function submitForm(username, userpw) {
    const fetchOutput = document.querySelector("#fetchOut");

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
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.status === "error") {
            console.log("something went wrong");
            fetchOutput.classList.add("bg-red-600", "text-white");
            fetchOutput.innerHTML = `<img class="h-4 absolute top-3 right-3" src="https://img.icons8.com/ios-glyphs/60/delete-sign.png" @click="hide" alt="close"/>status: ${result.status}`;
        }   else {
            jwt = result.jwt.toString();
            const jwtOut = JSON.stringify(decode(jwt));
            fetchOutput.classList.remove("bg-red-600", "text-white");
            fetchOutput.innerHTML = `<img class="h-4 absolute top-3 right-3" src="https://img.icons8.com/ios-glyphs/60/delete-sign.png" @click="hide" alt="close"/>status: ${result.status}<br>jwt: ${jwtOut}`;
            console.log(decode(jwt));
        }
    })
    .catch(error => {
        console.log('Ooops, error:', error);
    });
}

function decode(token) {
    // console.log(token.split("."));
    // console.log("============");
    // console.log(token.split(".")[0]);
    // console.log("============");
    // console.log(token.split(".")[1]);
    // console.log("============");
    // console.log(token.split(".")[2]);
    console.log("============");
    const currentDate = new Date();
    console.log("current time: ", currentDate.getTime());
    console.log("============");


    var base64Url = token.split(".")[1];
    var base64 = decodeURIComponent(atob(base64Url).split("").map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));

    // ======================
    const jwtPayload = JSON.parse(base64);
    const iat = jwtPayload.iat;
    const iatDate = new Date(iat).getFullYear();
    console.log("IAT Year: ", iatDate);
    // ======================


    return JSON.parse(base64);
} 
