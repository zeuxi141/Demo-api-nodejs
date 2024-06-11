//example controler
import { StatusCodes } from 'http-status-codes'

const createNew = async(req, res, next) => {
  try {
    // console.log('request body', req.body)
    // If the request body is valid, send a response
    res.status(StatusCodes.CREATED).json({ message: 'POST from controller: API demo create new board' })
  } catch (error) {next(error)}

}

export const demoController = {
  createNew
}