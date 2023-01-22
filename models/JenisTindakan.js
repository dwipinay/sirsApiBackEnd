import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS }  from "../config/Database.js"

export const jenisTindakan = databaseSIRS.define('jenis_tindakan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    rl_id: {
        type: DataTypes.INTEGER     
    },
    no: {
        type: DataTypes.INTEGER
    },
    nama: {
        type: DataTypes.STRING
    },
    group_jenis_tindakan_id: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
})

export const groupJenisTindakan = databaseSIRS.define('group_jenis_tindakan', {
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

jenisTindakan.hasOne(groupJenisTindakan,{
    foreignKey: 'id',
    sourceKey: 'group_jenis_tindakan_id',
    as: 'groupJenisTindakan'
})

groupJenisTindakan.belongsTo(jenisTindakan,{
    foreignKey: 'id',
    sourceKey: 'group_jenis_tindakan_id'
})