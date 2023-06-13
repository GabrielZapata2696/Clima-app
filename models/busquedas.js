import axios from 'axios';


class Busquedas {

    historial = [ 'San pelayo', 'Medellin', 'Bogotá' ];

    constructor() {

        //todo: leer db si existe
    }


    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es',
            'limit': 5
        };
    }


    async ciudad(lugar = '') {


        try {

            //peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json `,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            console.log(resp.data);


            return []; //retorna las ciudades que coincidan con el parametro lugar

        } catch (error) {
            console.log('Error: ', error);
            return [];
        }

    }



}


export { Busquedas };