//router
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { demoRoute } from '~/routes/v1/boardRoute'

/**
 * Express router for API version 1.
 * @type {import('express').Router}
 */
const Router = express.Router()

/**
 * GET /status
 * Route handler for getting the status of API version 1.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */


Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API v1 is ready!' })
})

// Mount demoRoutes under /demos
Router.use('/boards', demoRoute)

/**
 * The API version 1 router.
 * @type {import('express').Router}
 */
export const APIs_V1 = Router