import express from 'express'
import { Controller } from '../controllers/userController'
import { authMiddleware } from '../middleware/auth'
const router = express.Router()

router.post('/login', Controller.login)
router.use(authMiddleware)
router.post('/users',Controller.addUser)
router.get('/users/:id',Controller.getUserById)
router.post('/users/:id',Controller.editUser)
router.patch('/users/:id/role/admin',Controller.changeAdmin)
router.get('/admins',Controller.getAllAdmins)
router.get('/teachers',Controller.getAllTeachers)
router.get('/students',Controller.getAllStudents)


export default router