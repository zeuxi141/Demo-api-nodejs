//ex router

import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { demoValidation } from '~/validations/demoValidation'
import { demoController } from '~/controllers/demoController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Hello from get demo' })
  })
  .post(demoValidation.createNew, demoController.createNew)

Router.route('/:id')
  .get(demoController.getDetails)
  .put()

export const demoRoute = Router
