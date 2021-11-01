import url from "../config/config";
const headers = { "Accept": "application/json", "Content-Type": "application/json" };

const signin = (user) => {
    return fetch(`${url}/auth/signin`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(user)
    }).then(response => response.json()).catch(err => console.log(err))
}

export { signin }