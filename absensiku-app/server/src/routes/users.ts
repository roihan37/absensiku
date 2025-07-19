import express from 'express'
import { Controller } from '../controllers/userController'
const router = express.Router()

router.post('/login', Controller.login )


export default router