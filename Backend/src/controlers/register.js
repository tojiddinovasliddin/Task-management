import express from "express"
import process from "process"
import fs from "fs"
import path from "path"
import jwt from "jsonwebtoken"

function read_all_tasks() {
   let users = fs.readFileSync(path.join(process.cwd(), "Backend", "src", "users.json"), "utf-8")
    users = JSON.parse(users)
   return users
}

function write_new_task(task) {
    fs.writeFileSync(path.join(process.cwd(), "Backend", "src", "users.json"),JSON.stringify(task,null,4))
}

const register_post = (req, res) => {
    let users = read_all_tasks()
    const { full_name, email,username,password} = req.body
    if (typeof full_name != "string") {
        return res.status(400).json({
            status: 400,
            message: "Full name must be string"
        })
    }
    let user_name = users.find(user => user.username == username)

    if (user_name) {
        return res.status(409).json({
            status: 409,
            message: "This username already exist"
        })
    }
    if (password.length < 8) {
        return res.status(400).json({
            status: 400,
            message: "Password length more than 8"
        })
    }
    const token = jwt.sign(
        { userId: users.at(-1).length + 1, username: username},
        "asliddin",
        { expiresIn: "2y" }
    )

    let data = new Date()
    let time = data.toLocaleString()
    let ms = {
        id: users.at(-1).id + 1,
        full_name,
        email,
        username,
        password,
        task: [],
        time,
        token: token
    }
    users.push(ms)
    write_new_task(users)

    return res.status(201).json({
        status: 201,
        message: "User succefully add"
    })
}


export default {

    register_post
}
