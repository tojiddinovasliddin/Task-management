import express from "express"
import register from "../controlers/register.js"
import login from "../controlers/login.js"
import setting from "../controlers/setting.js"

const { Router } = express
const router = Router()
router.post("/register", register.register_post)
router.post("/login", login.login_post);
router.post("/setting",setting.setting_post)


export default router
