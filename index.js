import 'dotenv/config';
import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js";
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
                const lugar = await leerInput('Ciudad: ');

                busquedas.ciudad(lugar);




                //Buscar Lugar
                //seleccionar el lugar 
                //Clima
                //mostrar datos del clima

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:');
                console.log('Lat:');
                console.log('Lng:');
                console.log('Temperatura:');
                console.log('Minima:');
                console.log('Maxima:');


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
