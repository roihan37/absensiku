import express from 'express'
import { Controller } from '../controllers/userController'
import { authMiddleware } from '../middleware/auth'
const router = express.Router()

router.post('/login', Controller.login)
router.use(authMiddleware)
router.get('/admins',Controller.getAllAdmins)
router.get('/teachers',Controller.getAllTeachers)
router.get('/students',Controller.getAllStudents)


export default router