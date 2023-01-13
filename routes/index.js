import express from 'express'
import { getDataUser, insertDataUser, login, logout } from '../controllers/UsersController.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'
import { getDataJenisPelayanan } from '../controllers/JenisPelayananController.js'
import { getDataRLTigaTitikSatu, getDataRLTigaTitikSatuDetailById,
    insertDataRLTigaTitikSatu, updateDataRLTigaTitikSatu, deleteDataRLTigaTitikSatu } from '../controllers/RLTigaTitikSatuController.js'
import { getDataRumahSakit } from '../controllers/RumahSakitController.js'

// RL 3.7
import { insertDataRLTigaTitikTujuh , getDataRLTigaTitikTujuh,getRLTigaTitikTujuhById, getDataRLTigaTitikTujuhDetail, updateDataRLTigaTitikTujuh, deleteDataRLTigaTitikTujuh} 
    from '../controllers/RLTigaTitikTujuhController.js'
import { getKegiatan } from '../controllers/JenisKegiatanController.js'

const router = express.Router()

// Rumah Sakit
router.get('/api/rumahsakit/:id', verifyToken, getDataRumahSakit)

// User
router.get('/api/users', verifyToken, getDataUser)
router.post('/api/users', insertDataUser)

// Token
router.post('/api/login', login)
router.delete('/api/logout', logout)
router.get('/api/token', refreshToken)

// Jenis Pelayanan RL 3.1
router.get('/api/jenispelayanan', verifyToken,
    getDataJenisPelayanan)

// RL 3.1
router.post('/api/rltigatitiksatu', verifyToken, insertDataRLTigaTitikSatu)
router.get('/api/rltigatitiksatu', verifyToken, getDataRLTigaTitikSatu)
router.get('/api/rltigatitiksatudetail/:id', verifyToken, getDataRLTigaTitikSatuDetailById)
router.patch('/api/rltigatitiksatu/:id', verifyToken, updateDataRLTigaTitikSatu)
router.delete('/api/rltigatitiksatu/:id', deleteDataRLTigaTitikSatu)

// RL 3.7
router.post('/rltigatitiktujuh', verifyToken, insertDataRLTigaTitikTujuh)
router.get('/rltigatitiktujuh', verifyToken, getDataRLTigaTitikTujuh)
router.get('/rltigatitiktujuhdetail',verifyToken, getDataRLTigaTitikTujuhDetail)
router.get('/rltigatitiktujuhdetail/:id',verifyToken, getRLTigaTitikTujuhById)
router.patch('/rltigatitiktujuhdetail/:id',verifyToken, updateDataRLTigaTitikTujuh);
router.delete('/rltigatitiktujuhdetail/:id', deleteDataRLTigaTitikTujuh);

router.get('/getkegiatan', verifyToken, getKegiatan)


export default router