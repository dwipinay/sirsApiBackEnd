import express from 'express'
import { getDataUser, insertDataUser, login, logout } from '../controllers/UsersController.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'
import { getDataJenisPelayanan } from '../controllers/JenisPelayananController.js'
// RL 3.1
import { getDataRLTigaTitikSatu, getDataRLTigaTitikSatuDetailById,
    insertDataRLTigaTitikSatu, updateDataRLTigaTitikSatu, deleteDataRLTigaTitikSatu } from '../controllers/RLTigaTitikSatuController.js'

// RL 3.7
import { insertDataRLTigaTitikTujuh , getDataRLTigaTitikTujuh,getRLTigaTitikTujuhById, 
    getDataRLTigaTitikTujuhDetail, updateDataRLTigaTitikTujuh, deleteDataRLTigaTitikTujuh} 
    from '../controllers/RLTigaTitikTujuhController.js'
import { getKegiatan } from '../controllers/JenisKegiatanController.js'

const router = express.Router()

// Rumah Sakit
// router.get('/apisirs/rumahsakit/:id', verifyToken, getDataRumahSakit)

// User
router.get('/apisirs/users', verifyToken, getDataUser)
router.post('/apisirs/users', insertDataUser)

// Token
router.post('/apisirs/login', login)
router.delete('/apisirs/logout', logout)
router.get('/apisirs/token', refreshToken)

// Jenis Pelayanan RL 3.1
router.get('/apisirs/jenispelayanan', verifyToken,
    getDataJenisPelayanan)

// RL 3.1
router.post('/apisirs/rltigatitiksatu', verifyToken, insertDataRLTigaTitikSatu)
router.get('/apisirs/rltigatitiksatu', verifyToken, getDataRLTigaTitikSatu)
router.get('/apisirs/rltigatitiksatudetail/:id', verifyToken, getDataRLTigaTitikSatuDetailById)
router.patch('/apisirs/rltigatitiksatu/:id', verifyToken, updateDataRLTigaTitikSatu)
router.delete('/apisirs/rltigatitiksatu/:id', deleteDataRLTigaTitikSatu)

// RL 3.7
router.post('/apisirs/rltigatitiktujuh', verifyToken, insertDataRLTigaTitikTujuh)
router.get('/apisirs/rltigatitiktujuh', verifyToken, getDataRLTigaTitikTujuh)
router.get('/apisirs/rltigatitiktujuhdetail',verifyToken, getDataRLTigaTitikTujuhDetail)
router.get('/apisirs/rltigatitiktujuhdetail/:id',verifyToken, getRLTigaTitikTujuhById)
router.patch('/apisirs/rltigatitiktujuhdetail/:id',verifyToken, updateDataRLTigaTitikTujuh)
router.delete('/apisirs/rltigatitiktujuhdetail/:id', deleteDataRLTigaTitikTujuh)

router.get('/apisirs/getkegiatan', verifyToken, getKegiatan)


export default router