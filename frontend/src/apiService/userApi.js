import url from "../config/config";
const headers = { "Accept": "application/json", "Content-Type": "application/json" };

const createUser = (user) => {
    return fetch(`${url}/api/users`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(user)
    }).then(response => response.json()).catch(err => console.log(err))
}

const removeUser = (id) => {
    return fetch(`${url}/api/users/${id}`, {
        method: "DELETE",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}


const updatePassword = (id, data) => {
    return fetch(`${url}/api/users/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}

const chackPasswordConfirm = (id, data) => {
    return fetch(`${url}/api/users/${id}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}

const getUserInfo = (id) => {
    return fetch(`${url}/api/users/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}

const updateProfile = (id, data) => {
    return fetch(`${url}/api/users/edit/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}


export { createUser, removeUser, updatePassword, chackPasswordConfirm, getUserInfo, updateProfile }