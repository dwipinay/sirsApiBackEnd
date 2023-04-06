import Joi from "joi";
import { databaseSIRS } from "../config/Database.js";
import { statusValidasi, validasi } from "../models/Validasi.js";

export const getDataValidasiByRsId = (req, res) => {
    validasi
        .findOne({
            where: {
                rs_id: req.query.rsid,
                rl_id: req.query.rlid,
                tahun: req.query.tahun,
            },
            include: {
                model: statusValidasi,
                attributes: ["id", "nama"],
            },
        })
        .then((results) => {
            res.status(200).send({
                status: true,
                message: "data found",
                data: results,
            });
        })
        .catch((err) => {
            res.status(422).send({
                status: false,
                message: err,
            });
            return;
        });
};

export const insertValidasi = async (req, res) => {
    const schema = Joi.object({
        rsId: Joi.number().required(),
        rlId: Joi.number().required(),
        tahun: Joi.string().required(),
        statusValidasiId: Joi.number().required(),
        catatan: Joi.any()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        res.status(404).send({
            status: false,
            message: error.details[0].message,
        });
        return;
    }

    try {
        const dataValidasi = {
            "rs_id": req.body.rsId,
            "rl_id": req.body.rlId,
            "tahun": req.body.tahun,
            "status_validasi_id": req.body.statusValidasiId,
            "catatan": req.body.catatan,
            "user_id": req.user.id,
        }

        const rlInsertHeader = await validasi.create(
            dataValidasi
        );

        res.status(201).send({
            status: true,
            message: "data berhasil di input",
            data: {
                id: rlInsertHeader.id
            }
        });
    } catch (error) {
        console.log(error)
        if (error.name === 'SequelizeUniqueConstraintError') {
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
};

export const updateValidasi = async (req, res) => {
    const schema = Joi.object({
        statusValidasiId: Joi.number().required(),
        catatan: Joi.any()
    }).required();
    const { error, value } = schema.validate(req.body);
    if (error) {
        res.status(404).send({
            status: false,
            message: error.details[0].message,
        });
        return;
    }
    try {
        const dataUpd = {
            "status_validasi_id": req.body.statusValidasiId,
            "catatan": req.body.catatan
        }
        await validasi.update(dataUpd, {
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({ message: "Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const getStatusValidasi = (req, res) => {
    statusValidasi.findAll({
        attributes:[
            ['id', 'id'],
            ['nama', 'nama']
        ]
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