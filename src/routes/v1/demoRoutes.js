//ex router

import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Hello from get demo' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'Hello from post demo' })
  })

export const demoRoutes = Router
