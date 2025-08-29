import express from 'express'
import { Controller } from '../controllers/attendenceController'
const router = express.Router()

router.post('/',Controller.addAttend)
router.get('/:id',Controller.getAttendById)
router.get('/:userId',Controller.getAttendByUserId)
router.put('/:id',Controller.editAttendById)
router.delete("/:id", Controller.deleteAttendance);

export default router