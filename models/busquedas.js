
class Busquedas {

    historial = [ 'San pelayo', 'Medellin', 'Bogotá' ];

    constructor() {

        //todo: leer db si existe
    }

    async ciudad(lugar = '') {
        //peticion http


        console.log(lugar);
        return []; //retorna las ciudades que coincidan con el parametro lugar
    }



}


export { Busquedas };