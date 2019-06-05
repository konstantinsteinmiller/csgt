import config from './config/index'
// import { MongoClient } from 'mongodb'
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const lodashId = require('lodash-id')

export default callback => {
  // connect to a database if needed, then pass it to `callback`:
  // MongoClient.connect(
  //   config.uri,
  //   function(err, client) {
  //   err && console.warn('err: ', err)
  //   const collection = config.collection
  //   const database = client.db(collection)
  //
  //   // perform actions on the collection object
  //   console.log('-- db ' + collection + 'connection established --')
  //   callback(database)
  //   // client.close()
  // })
  // Set some defaults (required if your JSON file is empty)

  db._.mixin({
    second: function(array) {
      return array[1]
    }
  })
  db._.mixin(lodashId)

  db.defaults({ dialogs_de_en: [], count: 0 })
    .write()

  callback(db)
}
