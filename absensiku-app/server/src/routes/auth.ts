import express from 'express'
import { Controller } from '../controllers/authController'
import { authMiddleware } from '../middleware/auth'
const router = express.Router()

router.post('/refreshTokens', Controller.refreshToken )
router.use(authMiddleware)
router.post('/revokeRefreshTokens', Controller.revokeRefreshTokens)
// router.get('/refreshTokens', Controller.refreshToken )


export default router