import express from "express"
import process from "process"
import fs from "fs"
import path from "path"


function read_users() {
    let users = fs.readFileSync(path.join(process.cwd(), "Backend", "src", "users.json"), "utf-8")
    users = JSON.parse(users)
    return users
}

function write_users(users) {
  
    fs.writeFileSync(path.join(process.cwd(),"Backend", "src", "users.json"),JSON.stringify(users,null,4))
}

const setting_post = (req, res) => {
    const { username, old_password, new_password } = req.body
    let users = read_users()
    if (new_password.length < 8) {
        return res.status(404).json({
            status: 400,
            message: "The new password length must be more than 8"
        })
    }
    const find = users.find(user =>user.username == username && user.password == old_password)
    if (!find) {
        return res.status(404).json({
            status: 404,
            message:"Username or old_password is incorrect"
        })
    }
    let ms = {
        "id": find.id,
        "full_name": find.full_name,
        "email": find.email,
        "username": find.username,
        "password": new_password,
        "task": [],
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOm51bGwsInVzZXJuYW1lIjoiQXNsaWRkaWR3cW4iLCJpYXQiOjE3OTEyMTU3NzIsImV4cCI6MTg1NDMzMDk3Mn0.MDe_EuYcAuYL67W1ltcy4SQ_J7V3HoAjF2ESCYcHaFM"
    }
    for (const el of users) {

        if (el.id = ms.id)
        {
            el.password = ms.password
        }
    }
    write_users(users)
    return res.status(201).json({
        status: 201,
        message: "Password update succefully"
    })
}


export default {
    setting_post
}
