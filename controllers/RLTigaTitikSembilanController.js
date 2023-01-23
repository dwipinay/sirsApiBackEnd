import { databaseSIRS } from '../config/Database.js'
import { rlTigaTitikSembilanHeader, rlTigaTitikSembilanDetail } from '../models/RLTigaTitikSembilan.js'
import { jenisTindakan, jenisTindakanGroup } from '../models/JenisTindakan.js'
import Joi from 'joi'

export const getDataRLTigaTitikSembilan = (req, res) => {
    rlTigaTitikSembilanHeader.findAll({
        attributes: [
            'id',
            'tahun',
            [databaseSIRS.literal('`jumlah`'), 'jumlah']
        ],
        where:{
            rs_id: req.user.rsId,
            tahun: req.query.tahun
        },
        include:{
            model: rlTigaTitikSembilanDetail,
            attributes: [],
            required: true,
            include: {
                model: jenisTindakan,
                attributes: ['no','nama'],
                include: {
                    model: jenisTindakanGroup,
                    as: 'jenisTindakanGroup'
                }
            }
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