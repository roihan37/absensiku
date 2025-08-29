import express from 'express'
const router = express.Router()
import routerUsers from './users'
import routerAuth from './auth'
import routerAttendence from './attendence'
import { authMiddleware } from '../middleware/auth'


router.use('/auth',routerAuth)
router.use(authMiddleware)
router.use('users/',routerUsers)
router.use('/attendance',routerAttendence)
router.use('/class',routerAttendence)


export default router