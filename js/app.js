let jwt = "";

function decode(token) {

    const currentDate = new Date();
    // console.log("current time: ", currentDate.getTime());

    var base64Url = token.split(".")[1];
    var base64 = decodeURIComponent(atob(base64Url).split("").map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));

    // ======================
    const jwtPayload = JSON.parse(base64);
    const iat = jwtPayload.iat;
    const iatDate = new Date(iat).getFullYear();
    // console.log("IAT Year: ", iatDate);
    // ======================


    return JSON.parse(base64);
} 


function loginForm() {
    
    return {
        isFetching: false,
        fetchOutput: "",
        username: "",
        password: "",
        open: false,
        
        submitNewForm(username, userpw) {
            this.isFetching = true;
            const fetchOutput = document.querySelector("#fetchOut");
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        
            const raw = JSON.stringify({
            "username": username,
            "password": userpw
            });
        
            const requestOptions = {
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
                    this.open = true;
                    this.isFetching = false;
                    document.querySelector("#login").reset();
                    localStorage.clear();
                    fetchOutput.classList.add("bg-red-600", "text-white");
                    this.fetchOutput = `<img class="h-4 absolute top-3 right-3 cursor-pointer" src="https://img.icons8.com/ios-glyphs/60/ffffff/delete-sign.png" @click="open=false" alt="close"/>Login failed, ${result.message}`;
                }   else {
                    this.open = false;
                    this.isFetching = false;
                    localStorage.setItem('userJWT', result.jwt.toString());
                    window.location.assign("/DevEnv01/src/dashboard.html");
                }
            })
            .catch(error => {
                console.log('Ooops, error:', error);
                this.isFetching = false;
                this.open = true;
                localStorage.setItem('userJWT', "");
                fetchOutput.classList.add("bg-red-600", "text-white");
                this.fetchOutput = `<img class="h-4 absolute top-3 right-3 cursor-pointer" src="https://img.icons8.com/ios-glyphs/60/ffffff/delete-sign.png" @click="open=false" alt="close"/>ERROR<br>${error}`;
            });
        }
    }
}
