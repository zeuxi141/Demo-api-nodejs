/**
 * Tạo một mục mới.
 * @returns {Promise<void>} Một promise sẽ được giải quyết khi mục mới được tạo.
 */
//service demoService.js

import { columnModel } from '~/models/columnModel'


const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newColumn = ({
      ...reqBody
    })
    const createColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createColumn.insertedId.toString())
    return getNewColumn
  } catch (error) {throw error}

}

export const columnService = {
  createNew
}

