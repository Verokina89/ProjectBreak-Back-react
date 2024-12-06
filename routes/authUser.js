import express from 'express';
import authUsersControllers from '../controllers/authUsersControllers.js';
const router= express.Router()

router.get('/',authUsersControllers.getAllUser)
router.get('/:uid',authUsersControllers.getUser)
router.get('/username/:username',authUsersControllers.getUserByName)
router.post('/newuser',authUsersControllers.createUser)
router.put('/:id',authUsersControllers.updateUser)
router.delete('/:id',authUsersControllers.deleteUser)

export default router