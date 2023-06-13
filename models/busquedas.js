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

    get paramsOpenWeathermap() {
        return {
            appid: process.env.OPEN_WEATHER_MAP_KEY,
            units: 'metric',
            lang: 'es'
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
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[ 0 ],
                lat: lugar.center[ 1 ]
            }));


        } catch (error) {
            console.log('Error: ', error);
            return [];
        }

    }

    async climaLugar(lat, lon) {
        try {

            //peticion http

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeathermap, lat, lon }
            });

            const resp = await instance.get();
            const { temp, feels_like, temp_min, temp_max } = resp.data.main;
            const { description } = resp.data.weather[ 0 ];

            const climaLugar = {
                temp: temp,
                sens: feels_like,
                min: temp_min,
                max: temp_max,
                desc: description
            };

            return climaLugar;

        } catch (error) {
            console.log('Error: ', error);
            return [];
        }
    }


}


export { Busquedas };