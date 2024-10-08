/**
 * Tạo một mục mới.
 * @returns {Promise<void>} Một promise sẽ được giải quyết khi mục mới được tạo.
 */
//service demoService.js

import { StatusCodes } from 'http-status-codes'
import cloneDeep from 'lodash/cloneDeep'
import { demoBoardModel } from '~/models/demoBoardModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'


const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = ({
      ...reqBody,
      slug: slugify(reqBody.title)
    })

    //Gọi tới tầng model lưu dữ liệu newBoard vào database và lấy kết quả trả về
    const createBoard = await demoBoardModel.createNew(newBoard)

    //Lấy bản ghi sau khi gọi sau đs để trả về cho controller
    const getNewBoard = await demoBoardModel.findOneById(createBoard.insertedId.toString())

    //đẩy kết quả trả về từ model sang controller
    return getNewBoard
  } catch (error) {throw error}

}

const getDetails = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //Lấy bản ghi sau khi gọi sau đs để trả về cho controller
    const board = await demoBoardModel.getDetails(id)
    if (!board) throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')

    //cloneDeep để tránh thay đổi dữ liệu gốc
    const resBoard = cloneDeep(board)

    // Đưa card về đúng column của nó
    resBoard.columns.forEach(column => {
      //thay đổi giá trị cảu board này:  thực hiện đưa cards vào đúng column của nó
      //card.columnId.equals(column._id) - mongodb object id equals
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    //xóa cards ra khỏi board
    delete resBoard.cards

    //đẩy kết quả trả về từ model sang controller
    return resBoard
  } catch (error) {throw error}
}

export const boardService = {
  createNew,
  getDetails
}

