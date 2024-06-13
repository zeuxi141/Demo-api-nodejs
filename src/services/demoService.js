/**
 * Tạo một mục mới.
 * @returns {Promise<void>} Một promise sẽ được giải quyết khi mục mới được tạo.
 */
//service demoService.js

import { demoBoardModel } from '~/models/demoBoardModel'
import { slugify } from '~/utils/formatters'


const createNew = async (reqBody) => {
  //xử lý dữ liệu đầu vào
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = ({
      ...reqBody,
      slug: slugify(reqBody.title)
    })

    //Gọi tới tầng model lưu dữ liệu newBoard vào database và lấy kết quả trả về
    const createBoard = await demoBoardModel.createNew(newBoard)
    console.log(createBoard)

    //Lấy bản ghi sau khi gọi sau đs để trả về cho controller
    const getNewBoard = await demoBoardModel.findOneById(createBoard.insertedId.toString())


    //Thông báo email, notification về cho admin khi có 1 board mới được tạo

    //đẩy kết quả trả về từ model sang controller
    return getNewBoard
  } catch (error) {throw error}

}

export const demoService = {
  createNew
}

