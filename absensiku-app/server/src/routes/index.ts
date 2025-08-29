import express from 'express'
const router = express.Router()
import routerAuth from './auth'
import routerNotif from './notif'
import routerUsers from './users'
import routerClass from './class'
import routerSchool from './school'
import routerHoliday from './holiday'
import routerAttendence from './attendence'
import routerAcademicYear from './academicYear'
import { authMiddleware } from '../middleware/auth'


router.use('/auth',routerAuth)
router.use(authMiddleware)
router.use('notif',routerNotif)
router.use('users/',routerUsers)
router.use('/class',routerClass)
router.use('/school',routerSchool)
router.use('/holidays',routerHoliday)
router.use('/attendance',routerAttendence)
router.use('/academicyears',routerAcademicYear)



export default router