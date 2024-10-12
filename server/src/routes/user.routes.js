import express from 'express'
import { auth_middleware } from '../middlewares/auth.middlewares.js'
import { delete_user, get_all_users, get_user, update_user } from '../controllers/users/user.controllers.js'

export const userRouter = express.Router()

userRouter.get('/get-all-users', auth_middleware(['admin']), get_all_users)
userRouter.patch('/update-user/:id', auth_middleware(['admin', 'user']), update_user)
userRouter.delete('/delete-user/:id', auth_middleware(['admin']), delete_user)
userRouter.get('/get-user/:id', auth_middleware(['admin', 'user']), get_user)