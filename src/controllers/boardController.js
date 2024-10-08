//example controler
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async(req, res, next) => {
  try {
    // console.log('request body', req.body)
    // If the request body is valid, send a response


    //điều hướng dữ liệu từ controller tới service
    const createNewBoard = await boardService.createNew(req.body)

    //trả về dữ liệu cho client
    res.status(StatusCodes.CREATED).json(createNewBoard)
  } catch (error) {next(error)}

}

const getDetails = async(req, res, next) => {
  try {
    //điều hướng dữ liệu từ controller tới service
    const board = await boardService.getDetails(req.params.id)

    //trả về dữ liệu cho client
    res.status(StatusCodes.OK).json(board)
  } catch (error) {next(error)}

}


export const boardController = {
  createNew,
  getDetails
}