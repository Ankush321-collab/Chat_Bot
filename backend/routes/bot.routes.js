import express from 'express'
import message from '../controller/bot.controller.js'

const router = express.Router()
router.post("/message", message)

export default router;