import { entorno } from "../config/env-config.js";
import mongoose from 'mongoose';

export let Contacts;

switch (entorno.persistence) {
  case 'MONGODB_URI':
     try {
        connectionUrl = entorno.mongoUrl;
        await mongoose.connect(connectionUrl);
        console.log("Plug to mongo 2!");
        
        const { default: ContactsMongo } = await import('./mongo/contacts.mongo.js');
        Contacts = ContactsMongo;

      } catch (e) {
        console.log(e);
        throw "can not connect to the database 2";
      }
   
    break;
  case 'MEMORY':
    console.log('Persistence with Memory');
    const { default: ContactsMemory } = await import('./memory/contacts.memory.js');
    Contacts = ContactsMemory;

    break;
  default:
    break;
}