//connect mongoDB


import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'


//dùng để lấy Database chung là DATABASE_NAME
let webDatabaseInstance = null

// Khởi tạo đối tượng mongoClientInstance để connect tới mongoDB
//Stable API: gồm có 3 thông số version của stableAPi
// dùng để báo lỗi khi xài những lệnh không nằm trong phiên bản của mongo
//deprecationErrors: thông báo những lệnh không còn được hỗ trợ nữa
const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})


//kết nối tới database
export const CONNECT_DB = async () => {
  //gọi kết nối clientInstance tới URL đã khai báo
  await client.connect()

  //gọi tới bảng database muốn lấy theo tên muốn lấy và gán nó vào đối tượng muốn lưu webDatabaseInstance
  webDatabaseInstance = client.db(env.DATABASE_NAME)
}

//đóng kết nối DB khi cần
export const CLOSE_DB = async () => {
  await client.close()
}

//hàm kiểm tra instance có tồn tại để sử dụng
export const GET_DB = () => {
  if (!webDatabaseInstance) throw new Error('Must connect Database first!')
  return webDatabaseInstance
}


