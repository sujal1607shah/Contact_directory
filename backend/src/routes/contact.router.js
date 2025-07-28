import { Router } from "express";
import {
    createContact,
  getAllContacts,
  updateContact,
  getContact,
  
  deleteContact
} from "../controllers/contact.controllers.js"


const router=Router()

router.post('/', createContact);
router.get('/', getAllContacts);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);


export default router