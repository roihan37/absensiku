import express from 'express'
import { Controller } from '../controllers/userController'
const router = express.Router()


router.post('/',Controller.addUser)
router.get('/:id',Controller.getUserById)
router.post('/:id',Controller.editUser)
router.patch('/:id/role/admin',Controller.changeAdmin)
router.get('/admins',Controller.getAllAdmins)
router.get('/teachers',Controller.getAllTeachers)
router.get('/students',Controller.getAllStudents)


export default router