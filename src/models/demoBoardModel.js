//model

import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { BOARD_TYPES } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { cardModel } from './cardModel'
import { columnModel } from './columnModel'


//Định nghĩa collection (name và Schema)
const BOARD_COLLECTION_NAME = 'Tests'
const BOARD_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),

  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),

  columnOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),
  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updateAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

//kiểm tra dữ liệu trước khi tạo
const validateSchema = async(data) => {
  //validate dữ liệu trước khi tạo
  return await BOARD_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async(data) => {
  try {
    //gọi tới hàm validateSchema để kiểm tra dữ liệu trước khi tạo sau đó lưu vào database
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(await validateSchema(data))
  } catch (error) { throw new Error(error)} //thow new Error(error) để trả stacktrace
}

//chỉ lấy board theo id
const getDetails = async(id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      { $match: {
        _id: new ObjectId(id), //chỉ lấy board theo id
        _destroy: false //chỉ lấy board không bị xóa
      } },
      { $lookup: {
        from: columnModel.COLUMN_COLLECTION_NAME, //lookup từ collection column
        //Tìm dữ liệu từ collection column nếu loaclField và foreignField trùng nhau
        localField: '_id', //id cuả board hien tai
        foreignField: 'boardId', //khoa ngoai lien ket toi collection ben column
        as: 'columns' //Lấy collection bên column và lưu lại
      } },
      { $lookup: {
        from: cardModel.CARD_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'cards'
      } }
    ]).toArray()//trả về dữ liệu theo dạng mảng
    //Do dữ liệu chúng ta lấy chỉ có 1 board mà nó nằm trong mảng nên chúng ta chỉ cần lấy phần tử đầu tiên
    return result[0] || {}
  } catch (error) { throw new Error(error)}
}

//Query tổng hợp (aggregate) để lấy thông tin toàn bộ cột và card trong board
const findOneById = async(id) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
  } catch (error) { throw new Error(error)}
}

export const demoBoardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_SCHEMA,
  createNew,
  findOneById,
  getDetails
}