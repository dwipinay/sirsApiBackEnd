import { DataTypes, QueryTypes } from "sequelize"
import { databaseRSOnline } from "../config/Database.js"

export const rumahSakit = databaseRSOnline.define(`data`, 
    {
        RUMAH_SAKIT: {
            type: DataTypes.STRING
        },
        ALAMAT: {
            type: DataTypes.STRING
        },
        provinsi_id: {
            type: DataTypes.STRING,
            unique: true,
        },
        kab_kota_id: {
            type: DataTypes.STRING,
        },
        Propinsi:{
            type:DataTypes.STRING,
            primaryKey: true
        }
    }
)

export const propinsi = databaseRSOnline.define(`provinsi`, 
    {
        id:  {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nama: {
            type: DataTypes.STRING
        }
    }
)

export const kabKota = databaseRSOnline.define(`kab_kota`,
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nama: {
            type: DataTypes.STRING
        },
        provinsi_id: {
            type: DataTypes.STRING
        }
    }
)

export const dataRumahSakit = databaseRSOnline.define(`data`, 
{
    Propinsi:{
        type: DataTypes.STRING
    },
    RUMAH_SAKIT: {
        type: DataTypes.STRING
    },
    ALAMAT: {
        type: DataTypes.STRING
    },
    provinsi_id:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    kab_kota_id:{
        type: DataTypes.STRING
    },
    KLS_RS:{
        type:DataTypes.INTEGER
    }
})

export const getData = (data, callback) => {
    const sqlSelect = 'SELECT ' + 
        '`data`.RUMAH_SAKIT as nama, ' +
        '`data`.ALAMAT as alamat, ' +
        'propinsi.propinsi_name as namaPropinsi, ' +
        '`kab/kota`.`KAB/KOTA` as namaKabKota ' +
    'FROM ' +
        '`data` INNER JOIN propinsi ON  propinsi.propinsi_kode = `data`.usrpwd2 ' +
        'INNER JOIN `kab/kota` ON `kab/kota`.link = `data`.link ' +
    'WHERE `data`.Propinsi = ? '
    databaseRSOnline.query(sqlSelect, {
        type: QueryTypes.SELECT,
        replacements: [data]
    })
    .then((res) => {
        callback(null, res)
    })
    .catch((error) => {
        callback(error, null)
    })
}

rumahSakit.hasOne(propinsi, { 
    foreignKey: 'id',
    sourceKey: 'provinsi_id',
    as: 'propinsi'
})

rumahSakit.hasOne(kabKota, { 
    foreignKey: 'id',
    sourceKey: 'kab_kota_id',
    as: 'kabKota'
})