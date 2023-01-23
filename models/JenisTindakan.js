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
    jenis_tindakan_group_id: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
})

export const jenisTindakanGroup = databaseSIRS.define('jenis_tindakan_group', {
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

jenisTindakan.hasOne(jenisTindakanGroup,{
    foreignKey: 'id',
    sourceKey: 'jenis_tindakan_group_id',
    as: 'jenisTindakanGroup'
})

jenisTindakanGroup.belongsTo(jenisTindakan,{
    foreignKey: 'id',
    sourceKey: 'jenis_tindakan_group_id'
})