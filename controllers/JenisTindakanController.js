import { Sequelize } from 'sequelize'
import { jenisTindakan, groupJenisTindakan } from '../models/JenisTindakan.js'

export const getDataJenisTindakan = (req, res) => {
    jenisTindakan.findAll({
        attributes: [
            'id',
            'no',
            'nama'
        ],
        where: {
            rl_id: req.query.rlid
        },
        include: {
            model: groupJenisTindakan,
            as: 'groupJenisTindakan'
        },
        raw: true,
        nest: false
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