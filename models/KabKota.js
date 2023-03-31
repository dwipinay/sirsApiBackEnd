import { DataTypes, QueryTypes } from "sequelize"
import { databaseRSOnline, databaseSIRS } from "../config/Database.js"

export const kabKota = databaseRSOnline.define(`kab_kota`, 
{
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nama : {
        type: DataTypes.STRING,
    },
    provinsi_id : {
        type: DataTypes.STRING
    }
})

export const propinsi = databaseRSOnline.define(`provinsi`, 
{
    nama : {
        type: DataTypes.STRING
    }
})


