/* eslint-disable no-console */

import exitHook from 'async-exit-hook'
import express from 'express'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { CLOSE_DB, CONNECT_DB } from './config/mongodb'

/**
 * Starts the server and listens for incoming requests.
 */
const START_SERVER = () => {

  const app = express()

  //enable req.body json data
  app.use(express.json())

  //use API version 1
  app.use('/v1', APIs_V1)

  //midderware error handling
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  //exitHook được gọi sau khi process.exit hoặc app bị crash và Ctrl+C -> Cleanup
  exitHook(() => {
    console.log('Shutting down server ...')
    CLOSE_DB()
    console.log('Disconnected MongoDB')
  })

}


//immedialy-invoked / anonymous Async Fuction (IIFE)
// (async ()=>{
//   try {
//     console.log('Connecting to MongoDB cloud...')
//     await CONNECT_DB()
//     console.log('Connected to MongoDB cloud!')
//     START_SERVER()
//   } catch (error) {
//     console.log(error)
//     process.exit(0)
//   }
// })()

CONNECT_DB()
  .then(() => console.log('Connected to MongoDB cloud!'))
  .then(() => START_SERVER())
  .catch(error => {
    console.log(error)
    process.exit(0)
  })