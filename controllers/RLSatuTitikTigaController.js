import { databaseSIRS } from '../config/Database.js'
import { rlSatuTitikTigaHeader, rlSatuTitikTigaDetail, jenisPelayanan } from '../models/RLSatuTitikTiga.js'
import Joi from 'joi'
import { rumahSakit } from '../models/RumahSakit.js'

export const getDataRLSatuTitikTiga = (req, res) => {
    rlSatuTitikTigaHeader.findAll({
        attributes: ['id','tahun'],
        where:{
            rs_id: req.user.rsId,
            tahun: req.query.tahun
        },
        include:{
            model: rlSatuTitikTigaDetail,
            required: true,
            include: {
                model: jenisPelayanan
            }
        },
        // raw: true,
        // nest: true,
        order: [[{ model: rlSatuTitikTigaDetail }, 'jenis_pelayanan_id', 'ASC']]
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

export const getDataRLSatuTitikTigaDetail = (req, res) => {
    rlSatuTitikTigaDetail.findAll({
        attributes: ['id','rl_tiga_titik_satu_id'],
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

export const getDataRLSatuTitikTigaDetailById = async(req,res)=>{
    rlSatuTitikTigaDetail.findOne({
        where:{
            id:req.params.id
        },
        include:{
            model: jenisPelayanan
        }
    })
    .then((results) => {
        if (!results) {
            res.status(200).send({
                status: true,
                message: "data not found",
                data: results
            })
            return
        }
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

export const insertDataRLSatuTitikTiga =  async (req, res) => {
    const schema = Joi.object({
        tahun: Joi.number().required(),
        data: Joi.array()
            .items(
                Joi.object().keys({
                    jenisPelayananId: Joi.number().required(),
                    jumlahTempatTidur: Joi.number().required(),
                    kelasVVIP: Joi.number().required(),
                    kelasVIP: Joi.number().required(),
                    kelas1: Joi.number().required(),
                    kelas2: Joi.number().required(),
                    kelas3: Joi.number().required(),
                    kelasKhusus: Joi.number().required()
                }).required()
            ).required()
    })

    const { error, value } =  schema.validate(req.body)
    if (error) {
        res.status(404).send({
            status: false,
            message: error.details[0].message
        })
        return
    }

    const transaction = await databaseSIRS.transaction()
    try {
        const resultInsertHeader = await rlSatuTitikTigaHeader.create({
            rs_id: req.user.rsId,
            tahun: req.body.tahun,
            user_id: req.user.id
        }, { 
            transaction: transaction
        })

        const dataDetail = req.body.data.map((value, index) => {
            return {
                rs_id: req.user.rsId,
                tahun: req.body.tahun,
                rl_satu_titik_tiga_id: resultInsertHeader.id,
                jenis_pelayanan_id: value.jenisPelayananId,
                jumlah_tempat_tidur: value.jumlahTempatTidur,
                kelas_VVIP: value.kelasVVIP,
                kelas_VIP: value.kelasVIP,
                kelas_1: value.kelas1,
                kelas_2: value.kelas2,
                kelas_3: value.kelas3,
                kelas_khusus: value.kelasKhusus,
                user_id: req.user.id
            }
        })

        const resultInsertDetail = await rlSatuTitikTigaDetail.bulkCreate(dataDetail, { 
            transaction: transaction
            // updateOnDuplicate: ['jumlah_tempat_tidur', 'kelas_VVIP',
            //     'kelas_VIP', 'kelas_1', 'kelas_2', 'kelas_3', 'kelas_khusus'
            // ]
        })
        
        await transaction.commit()
        res.status(201).send({
            status: true,
            message: "data created",
            data: {
                id: resultInsertHeader.id
            }
        })
    } catch (error) {
        console.log(error)
        await transaction.rollback()
        if(error.name === 'SequelizeUniqueConstraintError'){
            res.status(400).send({
                status: false,
                message: "Duplicate Entry"
            })
        } else {
            res.status(400).send({
                status: false,
                message: error
            })
        }
    }
}

export const updateDataRLSatuTitikTiga = async(req,res)=>{
    try{
        const update = await rlSatuTitikTigaDetail.update(
            {
                jumlah_tempat_tidur: req.body.jumlahTempatTidur,
                kelas_VVIP: req.body.kelasVVIP,
                kelas_VIP:req.body.kelasVIP,
                kelas_1: req.body.kelas1,
                kelas_2: req.body.kelas2,
                kelas_3: req.body.kelas3,
                kelas_khusus:req.body.kelasKhusus,
                user_id: req.user.id
            },
            {
                where:{
                    id: req.params.id
            }
        });
        res.status(200).json({
            status: true,
            message: update
        });
    }catch(error){
        console.log(error.message);
    }
}

export const deleteDataRLSatuTitikTiga = async(req, res) => {
    try {
        const count = await rlSatuTitikTigaDetail.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(201).send({
            status: true,
            message: "data deleted successfully",
            data: {
                'deleted_rows': count
            }
        })
    } catch (error) {
        res.status(404).send({
            status: false,
            message: error
        })
    }
}

export const getDataRLSatuTitikTigaKodeRSTahun = (req, res) => {
    if(req.user.jenis_user_id == 2){
        // console.log('provinsi')
        rumahSakit.findOne({
            where: {
                Propinsi: req.query.koders,
                provinsi_id : req.user.rsId
            }
        })
        .then((results) => {
            const getkoders = results.dataValues.Propinsi;
            rlSatuTitikTigaHeader.findAll({
                attributes: ['id','tahun'],
                where:{
                    rs_id: getkoders,
                    tahun: req.query.tahun,
                },
                include:{
                    model: rlSatuTitikTigaDetail,
                    required: true,
                    include: {
                        model: jenisPelayanan
                    }
                },
                order: [[{ model: rlSatuTitikTigaDetail }, 'jenis_pelayanan_id', 'ASC']]
            })
            .then((resultsdata) => {
                res.status(200).send({
                    status: true,
                    message: "data found",
                    dataRS: results,
                    data: resultsdata
                })
            })
            .catch((err) => {
                res.status(422).send({
                    status: false,
                    message: err
                })
                return
            })
        })
        .catch((err) => {
            res.status(422).send({
                status: false,
                message: err
            })
            return
        })
    } else if(req.user.jenis_user_id == 3){
        // console.log('kab')
        rumahSakit.findOne({
            where: {
                Propinsi: req.query.koders,
                kab_kota_id : req.user.rsId
            }
        })
        .then((results) => {
            const getkoders = results.dataValues.Propinsi;
            rlSatuTitikTigaHeader.findAll({
                attributes: ['id','tahun'],
                where:{
                    rs_id: getkoders,
                    tahun: req.query.tahun,
                },
                include:{
                    model: rlSatuTitikTigaDetail,
                    required: true,
                    include: {
                        model: jenisPelayanan
                    }
                },
                order: [[{ model: rlSatuTitikTigaDetail }, 'jenis_pelayanan_id', 'ASC']]
            })
            .then((resultsdata) => {
                res.status(200).send({
                    status: true,
                    message: "data found",
                    dataRS: results,
                    data: resultsdata
                })
            })
            .catch((err) => {
                res.status(422).send({
                    status: false,
                    message: err
                })
                return
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