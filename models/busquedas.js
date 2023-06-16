import fs from 'fs';
import axios from 'axios';

class Busquedas {

    historial = [];
    dBPath = './db/database.json';

    constructor() {

        //todo: leer db si existe
        this.leerDB();

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

    get historialCapitalizado() {
        // let capitalizado = '';
        // this.historial.forEach((lugar, i) => {
        //     capitalizado = lugar[ 0 ].toUpperCase() + lugar.substring(1);
        //     this.historial[ i ] = capitalizado;
        //     capitalizado = '';
        // });

        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[ 0 ].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        });
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


    agregarHistorial(lugar = '') {

        //prevernir duplicados
        if (!this.historial.includes(lugar.toLowerCase())) {
            this.historial = this.historial.splice(0, 5);
            this.historial.unshift(lugar.toLowerCase());
            //Grabar en db/archivo de texto
            this.guardarDB();
        }
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync(this.dBPath, JSON.stringify(payload));
    }

    leerDB() {

        if (fs.existsSync(this.dBPath)) {
            const info = fs.readFileSync(this.dBPath, { encoding: 'utf-8' });
            const data = JSON.parse(info);
            this.historial = data.historial;

        }

    }

}


export { Busquedas };