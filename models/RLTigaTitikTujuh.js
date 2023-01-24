import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from '../config/Database.js'

export const rlTigaTitikTujuh = databaseSIRS.define(
    "rl_tiga_titik_tujuh",
    {
      rs_id: {
        type: DataTypes.STRING,
      },
      tahun: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      }
    },
  );
  
  export const rlTigaTitikTujuhDetail = databaseSIRS.define(
    "rl_tiga_titik_tujuh_detail",
    {
      rl_tiga_titik_tujuh_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      jenis_kegiatan_id: {
        type: DataTypes.INTEGER,
      },
      jumlah: {
        type: DataTypes.INTEGER,
      }, 
      tahun: {
        type: DataTypes.INTEGER,
      },
      rs_id: {
        type: DataTypes.INTEGER,
      }
    },
   
  );
  export const jenisKegiatan = databaseSIRS.define('jenis_kegiatan', 
    {
        nama: {
            type: DataTypes.STRING
        },
        no: {
          type: DataTypes.NUMBER
      },
    }
)


rlTigaTitikTujuh.hasMany(rlTigaTitikTujuhDetail, {
    foreignKey:'rl_tiga_titik_tujuh_id'
})
rlTigaTitikTujuhDetail.belongsTo(rlTigaTitikTujuh, {
    foreignKey:'id'
})

jenisKegiatan.hasMany(rlTigaTitikTujuhDetail, {
    foreignKey:'id'
})
rlTigaTitikTujuhDetail.belongsTo(jenisKegiatan, {
    foreignKey:'jenis_kegiatan_id'
})