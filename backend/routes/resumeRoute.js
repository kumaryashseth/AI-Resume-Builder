import express from 'express'
import { createResume, deleteResume, getMyResumes, getSingleResume, updateResume } from '../controllers/resumeController.js'
import { requireSignIn } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/create', requireSignIn, createResume)
router.get('/my', requireSignIn, getMyResumes)
router.get('/:id', requireSignIn, getSingleResume)
router.put('/:id', requireSignIn, updateResume)
router.delete('/delete/:id', requireSignIn, deleteResume)

export default router