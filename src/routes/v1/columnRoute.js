//ex router column

import express from 'express'
import { columnController } from '~/controllers/columnController'
import { columnValidation } from '~/validations/columnValidations'

const Router = express.Router()

Router.route('/')
  .post(columnValidation.createNew, columnController.createNew)


export const columnRoute = Router
