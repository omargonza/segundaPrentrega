import contactsModel from '../models/contacts.model.js'

export default class Contacts{
    constructor(){

    }
    get = async() => {
         let contacts = await contactsModel.find()
         return contacts;
    } 
}