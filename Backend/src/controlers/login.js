import express from "express"
import process from "process"
import fs from "fs"
import path from "path"


function read_users() {
    let users = fs.readFileSync(path.join(process.cwd(), "Backend", "src", "users.json"), "utf-8")
    users = JSON.parse(users)
    return users
}

const login_post = (req, res) => {
    let users = read_users()
    const { username, password } = req.body
    const find_user = users.find(user => user.username == username && user.password == password)
    if (!find_user) {
        return res.status(400).json({
            status: 400,
            message: "Username or password is incorrect"
        })
    }
    return res.status(200).json({
        status: 200,
        data:find_user
    })

}

export default {
    login_post
}
