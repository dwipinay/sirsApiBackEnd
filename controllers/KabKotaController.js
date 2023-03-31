// import {}
import { Sequelize } from "sequelize";
import { kabKota, propinsi} from "../models/KabKota.js";
import joi from "joi"
const Op = Sequelize.Op;

export const getDataKabKota = (req, res) => {
  // const count = req.user.rsId.length;
  // res.status(200).send({
  //   message: req.user.jenis_user_id
  // })
  let kategori = req.user.jenis_user_id;
  if(kategori === 2){
    kabKota.findAll({
      where: {
        // id: req.user.rsId
        provinsi_id:{
          [Op.like] : '%'+req.user.rsId+'%'
        }, 
      }
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
  } else if (kategori === 3){
    kabKota.findAll({
        where: {
            // provinsi_id: req.user.rsId
            id:{
              [Op.like] : '%'+req.user.rsId+'%'
            }, 
        }
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
  } else {
    res.status(200).send({
      message: req.user
    })
  }
  
}

export const getDataKabKotabyID = (req, res) => {
  kabKota.findOne({
    where: {

    }
  })
}