import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from "../config/Database.js"

export const validasi = databaseSIRS.define('validasi',
    {
        rs_id: {
            type: DataTypes.STRING
        },
        rl_id: {
            type: DataTypes.STRING
        },
        tahun: {
            type: DataTypes.INTEGER
        },
        status_validasi_id: {
            type: DataTypes.INTEGER
        },
        catatan: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER
        },
    }
)

export const statusValidasi = databaseSIRS.define('status_validasi',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nama: {
            type: DataTypes.STRING
        }
    }
)

statusValidasi.hasMany(validasi, { foreignKey: 'id' })
validasi.belongsTo(statusValidasi, { foreignKey: 'status_validasi_id' })