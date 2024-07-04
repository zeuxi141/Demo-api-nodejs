//ex router column

import express from 'express'
import { cardController } from '~/controllers/cardController'
import { cardValidation } from '~/validations/cardValidations'

const Router = express.Router()

Router.route('/')
  .post(cardValidation.createNew, cardController.createNew)


export const cardRoute = Router
