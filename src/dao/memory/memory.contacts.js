export default class Contacts {

    constructor() {
        this.data = [];
    }
    get = () => { 
        //la diferencia de mongo, acceder a un arreglo solo implica
        //retomar dicho arreglo, sin embargo, lo abstraemos con
        //el nombre "get" para que sea identico al DAO de mongo
        return this.data;
    }
    
}