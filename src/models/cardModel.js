import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async(data) => {
  //validate dữ liệu trước khi tạo
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async(data) => {
  try {
    //gọi tới hàm validateSchema để kiểm tra dữ liệu trước khi tạo sau đó lưu vào database
    return await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(await validateSchema(data))
  } catch (error) { throw new Error(error)} //thow new Error(error) để trả stacktrace
}

//chỉ lấy board theo id

//Query tổng hợp (aggregate) để lấy thông tin toàn bộ cột và card trong board
const findOneById = async(id) => {
  try {
    return await GET_DB().collection(CARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
  } catch (error) { throw new Error(error)}
}

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  findOneById
}