import express from 'express'
import { auth_middleware } from '../middlewares/auth.middlewares.js'
import { delete_user, get_all_users, get_user, update_user } from '../controllers/users/user.controllers.js'

export const userRouter = express.Router()

// userRouter.get('/', auth_middleware(['admin']), get_all_users)
userRouter.get('/', get_all_users)
userRouter.patch('/:id', update_user)
// userRouter.patch('/:id', auth_middleware(['admin', 'user']), update_user)
// userRouter.delete('/:id', auth_middleware(['admin']), delete_user)
userRouter.delete('/:id', delete_user)
userRouter.get('/:id', auth_middleware(['admin', 'user']), get_user)