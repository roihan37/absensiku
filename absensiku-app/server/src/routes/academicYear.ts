import express from 'express'
import { Controller } from '../controllers/academicYearController'
const router = express.Router()

router.get('/', Controller.getAll);       // GET semua
router.get('/:id', Controller.getOne);   // GET by ID
router.post('/', Controller.create);      // POST
router.put('/:id', Controller.update);    // PUT
router.delete('/:id', Controller.delete); // DELETE


export default router