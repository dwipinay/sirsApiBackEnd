import express from 'express'

// Token
import { getDataUser, insertDataUser, login, logout } from '../controllers/UsersController.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'

// References
import { getDataRumahSakit } from '../controllers/RumahSakitController.js'
import { getDataJenisPelayanan } from '../controllers/JenisPelayananController.js'
import { getDataJenisKegiatan } from '../controllers/JenisKegiatanController.js'
import { getDataJenisTindakan } from '../controllers/JenisTindakanController.js'
import { getMetoda } from '../controllers/MetodaController.js'
import { getGolonganObat } from '../controllers/GolonganObatController.js'
import { getNoUrut } from '../controllers/NoUrutController.js'
import { getIcd10 } from '../controllers/Icd10Controller.js'

// RL 3.1
import { getDataRLTigaTitikSatu, getDataRLTigaTitikSatuDetailById,
    insertDataRLTigaTitikSatu, updateDataRLTigaTitikSatu, deleteDataRLTigaTitikSatu } from '../controllers/RLTigaTitikSatuController.js'

// RL 3.4
import { getDataRLTigaTitikEmpat, getRLTigaTitikEmpatById, 
    insertDataRLTigaTitikEmpat, updateDataRLTigaTitikEmpat, deleteDataRLTigaTitikEmpat } from '../controllers/RLTigaTitikEmpatController.js'

// RL 3.5
import { getDataRLTigaTitikLima, getRLTigaTitikLimaById, 
    insertDataRLTigaTitikLima, updateDataRLTigaTitikLima, deleteDataRLTigaTitikLima } from '../controllers/RLTigaTitikLimaController.js'

// RL 3.7
import { insertDataRLTigaTitikTujuh , getDataRLTigaTitikTujuh,getRLTigaTitikTujuhById, 
    getDataRLTigaTitikTujuhDetail, updateDataRLTigaTitikTujuh, deleteDataRLTigaTitikTujuh} 
    from '../controllers/RLTigaTitikTujuhController.js'

// RL 3.12
import { insertDataRLTigaTitikDuaBelas, getDataRLTigaTitikDuaBelas, getRLTigaTitikDuaBelasById, 
    getDataRLTigaTitikDuaBelasDetail, updateDataRLTigaTitikDuaBelas ,deleteDataRLTigaTitikDuaBelas} from '../controllers/RLTigaTitikDuaBelasController.js'

// RL 3.13A
import { insertDataRLTigaTitikTigaBelasA, getDataRLTigaTitikTigaBelasA, getRLTigaTitikTigaBelasAById, 
    getDataRLTigaTitikTigaBelasADetail, updateDataRLTigaTitikTigaBelasA ,deleteDataRLTigaTitikTigaBelasA } from '../controllers/RLTigaTitikTigaBelasAController.js'

// RL 3.13B
import { insertDataRLTigaTitikTigaBelasB, getDataRLTigaTitikTigaBelasB, getRLTigaTitikTigaBelasBById, 
    getDataRLTigaTitikTigaBelasBDetail, updateDataRLTigaTitikTigaBelasB ,deleteDataRLTigaTitikTigaBelasB } from '../controllers/RLTigaTitikTigaBelasBController.js'

// RL 5.1
import { getDataRLLimaTitikSatu, getRLLimaTitikSatuById, insertDataRLLimaTitikSatu, 
    updateDataRLLimaTitikSatu, deleteDataRLLimaTitikSatu } from '../controllers/RLLimaTitikSatuController.js'

// RL 5.2
import { getDataRLLimaTitikDua, getRLLimaTitikDuaById, insertDataRLLimaTitikDua, 
    updateDataRLLimaTitikDua, deleteDataRLLimaTitikDua } from '../controllers/RLLimaTitikDuaController.js'

// RL 5.4
import { insertDataRLLimaTitikEmpat, getDataRLLimaTitikEmpat, getRLLimaTitikEmpatById, 
    getDataRLLimaTitikEmpatDetail, updateDataRLLimaTitikEmpat ,deleteDataRLLimaTitikEmpat } from '../controllers/RLLimaTitikEmpatController.js'

const router = express.Router()

// Rumah Sakit
router.get('/apisirs/rumahsakit/:id', verifyToken, getDataRumahSakit)

// User
router.get('/apisirs/users', verifyToken, getDataUser)
router.post('/apisirs/users', insertDataUser)

// Token
router.post('/apisirs/login', login)
router.delete('/apisirs/logout', logout)
router.get('/apisirs/token', refreshToken)

// Jenis Pelayanan
router.get('/apisirs/jenispelayanan', verifyToken,
    getDataJenisPelayanan)

// Jenis Kegiatan
router.get('/apisirs/jeniskegiatan', verifyToken,
getDataJenisKegiatan)

// Jenis Tindakan
router.get('/apisirs/jenistindakan', getDataJenisTindakan)

// RL 3.1
router.post('/apisirs/rltigatitiksatu', verifyToken, insertDataRLTigaTitikSatu)
router.get('/apisirs/rltigatitiksatu', verifyToken, getDataRLTigaTitikSatu)
router.get('/apisirs/rltigatitiksatudetail/:id', verifyToken, getDataRLTigaTitikSatuDetailById)
router.patch('/apisirs/rltigatitiksatu/:id', verifyToken, updateDataRLTigaTitikSatu)
router.delete('/apisirs/rltigatitiksatu/:id', deleteDataRLTigaTitikSatu)

// RL 3.4
router.post('/apisirs/rltigatitikempat', verifyToken, insertDataRLTigaTitikEmpat)
router.get('/apisirs/rltigatitikempat', verifyToken, getDataRLTigaTitikEmpat)
router.get('/apisirs/rltigatitikempatdetail/:id',verifyToken, getRLTigaTitikEmpatById)
router.delete('/apisirs/rltigatitikempat/:id', deleteDataRLTigaTitikEmpat)
router.patch('/apisirs/rltigatitikempatdetail/:id',verifyToken, updateDataRLTigaTitikEmpat)

// RL 3.7
router.post('/apisirs/rltigatitiktujuh', verifyToken, insertDataRLTigaTitikTujuh)
router.get('/apisirs/rltigatitiktujuh', verifyToken, getDataRLTigaTitikTujuh)
router.get('/apisirs/rltigatitiktujuhdetail',verifyToken, getDataRLTigaTitikTujuhDetail)
router.get('/apisirs/rltigatitiktujuhdetail/:id',verifyToken, getRLTigaTitikTujuhById)
router.patch('/apisirs/rltigatitiktujuhdetail/:id',verifyToken, updateDataRLTigaTitikTujuh)
router.delete('/apisirs/rltigatitiktujuhdetail/:id', deleteDataRLTigaTitikTujuh)

// RL 3.5
router.post('/apisirs/rltigatitiklima', verifyToken, insertDataRLTigaTitikLima)
router.get('/apisirs/rltigatitiklima', verifyToken, getDataRLTigaTitikLima)
router.get('/apisirs/rltigatitiklimadetail/:id',verifyToken, getRLTigaTitikLimaById)
router.delete('/apisirs/rltigatitiklima/:id', deleteDataRLTigaTitikLima)
router.patch('/apisirs/rltigatitiklimadetail/:id',verifyToken, updateDataRLTigaTitikLima)

// RL 3.12
router.post('/apisirs/rltigatitikduabelas', verifyToken, insertDataRLTigaTitikDuaBelas)
router.get('/apisirs/rltigatitikduabelas', verifyToken, getDataRLTigaTitikDuaBelas)
router.get('/apisirs/rltigatitikduabelasdetail',verifyToken, getDataRLTigaTitikDuaBelasDetail)
router.get('/apisirs/rltigatitikduabelasdetail/:id',verifyToken, getRLTigaTitikDuaBelasById)
router.patch('/apisirs/rltigatitikduabelasdetail/:id',verifyToken, updateDataRLTigaTitikDuaBelas);
router.delete('/apisirs/rltigatitikduabelasdetail/:id', deleteDataRLTigaTitikDuaBelas);
router.get('/apisirs/getmetoda', verifyToken, getMetoda)

// RL 3.13a
router.post('/apisirs/rltigatitiktigabelasa', verifyToken, insertDataRLTigaTitikTigaBelasA)
router.get('/apisirs/rltigatitiktigabelasa', verifyToken, getDataRLTigaTitikTigaBelasA)
router.get('/apisirs/rltigatitiktigabelasadetail',verifyToken, getDataRLTigaTitikTigaBelasADetail)
router.get('/apisirs/rltigatitiktigabelasadetail/:id',verifyToken, getRLTigaTitikTigaBelasAById)
router.patch('/apisirs/rltigatitiktigabelasadetail/:id',verifyToken, updateDataRLTigaTitikTigaBelasA);
router.delete('/apisirs/rltigatitiktigabelasadetail/:id', deleteDataRLTigaTitikTigaBelasA);
router.get('/apisirs/getgolonganobat', verifyToken, getGolonganObat)


// RL 3.13b
router.post('/apisirs/rltigatitiktigabelasb', verifyToken, insertDataRLTigaTitikTigaBelasB)
router.get('/apisirs/rltigatitiktigabelasb', verifyToken, getDataRLTigaTitikTigaBelasB)
router.get('/apisirs/rltigatitiktigabelasbdetail',verifyToken, getDataRLTigaTitikTigaBelasBDetail)
router.get('/apisirs/rltigatitiktigabelasbdetail/:id',verifyToken, getRLTigaTitikTigaBelasBById)
router.patch('/apisirs/rltigatitiktigabelasbdetail/:id',verifyToken, updateDataRLTigaTitikTigaBelasB);
router.delete('/apisirs/rltigatitiktigabelasbdetail/:id', deleteDataRLTigaTitikTigaBelasB);
router.get('/apisirs/getgolonganobat', verifyToken, getGolonganObat)

// RL 5.1
router.post('/apisirs/rllimatitiksatu', verifyToken, insertDataRLLimaTitikSatu)
router.get('/apisirs/rllimatitiksatu', verifyToken, getDataRLLimaTitikSatu)
router.get('/apisirs/rllimatitiksatudetail/:id',verifyToken, getRLLimaTitikSatuById)
router.delete('/apisirs/rllimatitiksatu/:id', deleteDataRLLimaTitikSatu)
router.patch('/apisirs/rllimatitiksatudetail/:id',verifyToken, updateDataRLLimaTitikSatu)

// RL 5.2
router.post('/apisirs/rllimatitikdua', verifyToken, insertDataRLLimaTitikDua)
router.get('/apisirs/rllimatitikdua', verifyToken, getDataRLLimaTitikDua)
router.get('/apisirs/rllimatitikduadetail/:id',verifyToken, getRLLimaTitikDuaById)
router.delete('/apisirs/rllimatitikdua/:id', deleteDataRLLimaTitikDua)
router.patch('/apisirs/rllimatitikduadetail/:id',verifyToken, updateDataRLLimaTitikDua)

// RL 5.4
router.post('/apisirs/rllimatitikempat', verifyToken, insertDataRLLimaTitikEmpat)
router.get('/apisirs/rllimatitikempat', verifyToken, getDataRLLimaTitikEmpat)
router.get('/apisirs/rllimatitikempatdetail',verifyToken, getDataRLLimaTitikEmpatDetail)
router.get('/apisirs/rllimatitikempatdetail/:id',verifyToken, getRLLimaTitikEmpatById)
router.patch('/apisirs/rllimatitikempatdetail/:id',verifyToken, updateDataRLLimaTitikEmpat);
router.delete('/apisirs/rllimatitikempatdetail/:id', deleteDataRLLimaTitikEmpat);
router.get('/apisirs/getnourut', verifyToken, getNoUrut)
router.get('/apisirs/geticd10', verifyToken, getIcd10)

export default router