const rxjs = require('rxjs')
const axios = require('axios')
const BASE_URL = 'http://www.google.fr'
module.exports = (app) => {
    let checkup$ = new rxjs.Subject()
    app.get('/', (req, res) => checkup$.next([req, res]))

    checkup$
    .subscribe((args) => {
            let [req, res] = args
            res.send({'status': 'up'})
    })

    let getGateway$ = new rxjs.Subject()
    app.get(/.*$/, (req, res) => {getGateway$.next([req, res])})
    getGateway$
    .subscribe((args) => {
            let [req, res] = args
            console.log('calling ' + req.path)
            console.log('with body ' + JSON.stringify(req.body))
            let api = axios.create({
                baseURL: BASE_URL,
            })
            console.log({'redirect to': BASE_URL})
            api.get()
            .then(response => {
                res.send(response.data)
            })
            .catch(error => {
                console.error(error)
                res.send(error.data)
            })
    })
}