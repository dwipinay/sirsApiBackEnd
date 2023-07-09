import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS }  from "../config/Database.js"

export const kriteriaUser = databaseSIRS.define('kriteria_user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nama: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})