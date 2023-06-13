import 'dotenv/config';
import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";



const main = async () => {

    console.clear();

    let opt = '';

    const busquedas = new Busquedas();




    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //mostrar mensaje 
                const terminoBusqueda = await leerInput('Ciudad: ');
                //Buscar Lugar
                const lugares = await busquedas.ciudad(terminoBusqueda);

                //seleccionar el lugar 
                const id = await listarLugares(lugares);
                const lugarSelect = lugares.find(lugar => lugar.id === id);

                //Clima
                const clima = await busquedas.climaLugar(lugarSelect.lat, lugarSelect.lng);

                //mostrar datos del clima
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSelect.nombre.green);
                console.log('Lat: ', lugarSelect.lat);
                console.log('Lng:', lugarSelect.lng);
                console.log('Como está el clima:', clima.desc.green);
                console.log('Temperatura:', clima.temp);
                console.log('Sensación térmica:', clima.sens);
                console.log('Minima:', clima.min);
                console.log('Maxima:', clima.max);

                break;
            case 2:
                //Historial
                console.log('Historial');
                break;
        }

        if (opt !== 3) await pausa();


    } while (opt !== 3);




};

main();
