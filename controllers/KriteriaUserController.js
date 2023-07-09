import { kriteriaUser } from '../models/KriteriaUser.js'
import { databaseSIRS } from '../config/Database.js'

export const getKriteriaUser = (req, res) => {
    kriteriaUser.findAll({
        attributes: ['id','nama']
    })
    .then((results) => {
        res.status(200).send({
            status: true,
            message: "data found",
            data: results
        })
    })
    .catch((err) => {
        res.status(422).send({
            status: false,
            message: err
        })
        return
    })
}