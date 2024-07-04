/**
 * Tạo một mục mới.
 * @returns {Promise<void>} Một promise sẽ được giải quyết khi mục mới được tạo.
 */
//service demoService.js

import { cardModel } from '~/models/cardModel'


const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newCard = ({
      ...reqBody
    })
    const createCard = await cardModel.createNew(newCard)
    const getNewCard = await cardModel.findOneById(createCard.insertedId.toString())
    return getNewCard
  } catch (error) {throw error}

}

export const cardService = {
  createNew
}

