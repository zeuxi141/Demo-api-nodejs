//model

import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


//Định nghĩa collection (name và Schema)
const BOARD_COLLECTION_NAME = 'Tests'
const BOARD_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),

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
  findOneById
}