import {Router} from 'express';
import Contacts from '../../DAO/mongo/contacts.mongo.js';



const router = Router();
const contactsService = new Contacts();

router.get('/',async (req, res) => {
    let result = await contactsService.get();
    res.send({status:"success",payload:result});
});


export default router;