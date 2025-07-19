import express from 'express'
const router = express.Router()
import routerUsers from './users'
import routerAuth from './auth'


router.use('/',routerUsers)
router.use('/auth',routerAuth)


export default router