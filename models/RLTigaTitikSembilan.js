import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from "../config/Database.js"

export const rlTigaTitikSembilanHeader = databaseSIRS.define('rl_tiga_titik_sembilan', 
    {
        rs_id: {
            type: DataTypes.STRING
        },
        tahun: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        },
    }
)

export const rlTigaTitikSembilanDetail = databaseSIRS.define('rl_tiga_titik_sembilan_detail',{
    rs_id: {
        type: DataTypes.STRING
    },
    tahun: {
        type: DataTypes.INTEGER
    },
    rl_tiga_titik_sembilan_id: {
        type: DataTypes.INTEGER
    },
    rs_id: {
        type: DataTypes.STRING
    },
    tahun: {
        type: DataTypes.INTEGER
    },
    jenis_tindakan_id: {
        type: DataTypes.INTEGER
    },
    jumlah: {
        type: DataTypes.INTEGER
    }
})

export const jenisTindakan = databaseSIRS.define('jenis_tindakan', 
    {
        nama: {
            type: DataTypes.STRING
        },
        jenis_tindakan_group_id: {
            type: DataTypes.INTEGER
        }
    }
)

rlTigaTitikSembilanHeader.hasMany(rlTigaTitikSembilanDetail, {
    foreignKey:'rl_tiga_titik_sembilan_id'
})
rlTigaTitikSembilanDetail.belongsTo(rlTigaTitikSembilanHeader, {
    foreignKey:'id',
})

jenisTindakan.hasMany(rlTigaTitikSembilanDetail, {
    foreignKey:'id'
})
rlTigaTitikSembilanDetail.belongsTo(jenisTindakan, {
    foreignKey:'jenis_tindakan_id'
})