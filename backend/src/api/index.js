import { version } from '../../package.json'
import { Router } from 'express'
import { collection } from '../config'
import facets from './facets'

export default ({ config, db }) => {
    let api = Router()

    // mount the facets resource
    api.use('/facets', facets({ config, db }))

    api.get('/', (req, res) => {
        res.status(200).json({ version, text: 'some' })
    })

    api.get('/get', (req, res) => {
        const details = { 'speaker': 'self' }

        const item = db.get('dialogs_de_en')
          .value()

        let json = (item) ? item : { error: `Could not find item information for ${req.query.id}` }
        res.status(200).json(json)
    })

    api.get('/get/second', (req, res) => {
        const details = { 'speaker': 'self' }

        const item = db.get('dialogs_de_en')
          .second()
          .value()

        let json = (item) ? item : { error: `Could not find item information for ${req.query.id}` }
        res.status(200).json(json)
    })

    api.post('/post', (req, res) => {
        console.log('req', req.body)
        db.get('dialogs_de_en')
          .push(req.body)
          .write()

        const itemsLength = db.get('dialogs_de_en')
          .size()
          .value()

        db.update('count', itemsLength)
          .write()

        res.json({ error: `successfull`})
    })

    api.put('/put', (req, res) => {
        console.log('req', req.body)
        res.json({ error: `Bla Blub Error`})
    })

    api.get('/delete', (req, res) => {
        const collection = db
          .defaults({ dialogs_de_en: [] })
          .get('dialogs_de_en')

        // console.log('req', req.query)
        collection
          .removeById(req.query.id)
          .write()

        const itemsLength = db.get('dialogs_de_en')
          .size()
          .value()

        db.update('count', itemsLength)
          .write()
        
        const item = collection.getById(req.query.id).value()
        res.json({ error: `successfully deleted '${req.query.id}' ${JSON.stringify(item)}`})
    })

    return api
}
