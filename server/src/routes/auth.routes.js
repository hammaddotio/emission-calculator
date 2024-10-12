import express from 'express'
import { login, register } from '../controllers/authentication/auth.controllers.js'
import { auth_middleware } from '../middlewares/auth.middlewares.js'

export const authRouter = express.Router()

authRouter.post('/auth/register', register)
authRouter.post('/auth/login', login)