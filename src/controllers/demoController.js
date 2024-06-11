//example controler
const { StatusCodes } = require('http-status-codes')
const Joi = require('joi') // Import the 'Joi' module

const createNew = async(req, res, next) => {
  try {
    console.log('request body', req.body)
    // If the request body is valid, send a response
    res.status(StatusCodes.CREATED).json({ message: 'POST from controller: API demo create new board' })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }

}

export const demoController = {
  createNew
}