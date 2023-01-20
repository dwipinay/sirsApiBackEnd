import { jenisKegiatan } from '../models/JenisKegiatan.js'

export const getKegiatan = (req, res) => {
    jenisKegiatan.findAll({
        attributes: ['id','no','nama'],
        where: {
            rl_id: 7
        }
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

export const getDataJenisKegiatan = (req, res) => {
    jenisKegiatan.findAll({
        attributes: ['id','no','nama'],
        where: {
            rl_id: req.query.rlid
        }
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