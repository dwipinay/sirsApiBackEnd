import { getData, propinsi, kabKota, rumahSakit, dataRumahSakit } from '../models/RumahSakit.js'

export const getDataRumahSakit = (req, res) => {
    const data = [
        req.params.id
    ]

    rumahSakit.findAll({
        attributes: [
            ['RUMAH_SAKIT', 'nama'],
            ['ALAMAT', 'alamat']
        ],
        where: {
            Propinsi: req.params.id
        },
        include:[
            {
                model: propinsi,
                as: "propinsi",
                attributes:[
                    ['id', 'id'],
                    ['nama', 'nama']
                ]
            },
            {
                model: kabKota,
                as: 'kabKota',
                attributes:[
                    ['id', 'id'],
                    ['nama', 'nama']
                ]
            }
        ]
    })
    .then((results) => {
        const message = results.length ? 'data found' : 'data not found'
        res.status(200).send({
            status: true,
            message: message,
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

export const getDataRumahSakitFilterbyKabKotaId = (req, res) => {
    const count = req.user.rsId.length;
    if(req.user.rsId == 'dto'){
        dataRumahSakit.findAll({
            where: {
                kab_kota_id: req.query.kabkotaid,
                aktive: 1
            }
        })
        .then((results) => {
            const message = results.length ? 'data found' : 'data not found'
            res.status(200).send({
                status: true,
                message: message,
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
    } else {
        if(count==2){
            dataRumahSakit.findAll({
                where: {
                    kab_kota_id: req.query.kabkotaid,
                    aktive: 1
                }
            })
            .then((results) => {
                const message = results.length ? 'data found' : 'data not found'
                res.status(200).send({
                    status: true,
                    message: message,
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
        } else if(count > 2){
            dataRumahSakit.findAll({
                where: {
                    kab_kota_id: req.user.rsId,
                    aktive: 1
                }
            })
            .then((results) => {
                const message = results.length ? 'data found' : 'data not found'
                res.status(200).send({
                    status: true,
                    message: message,
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
    }
    
}