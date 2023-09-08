
function crearMapa(tablaBinaria, cantidadVariables, filas, columnas) {

    var filaTablaBinaria = 0;

    var indice = Math.ceil(cantidadVariables / 2);

    var matrizNumeros = crearMatriz(tablaBinaria, filas, columnas);
    var parada = (Math.pow(2, cantidadVariables) - 1);
    matrizNumeros = matrizOrdenFilasNumeros(matrizNumeros, 4, 1); //matriz mapa
    matrizNumeros = matrizOrdenColumnasNumeros(matrizNumeros, 4, 1, 0, parada);

    var encabezado = "<th>  </th>";
    var cuerpo = "";


    for (let i = 0; i < filas; i++) {
        encabezado += columnaEncabezado(matrizNumeros, cantidadVariables, i, columnas, indice);
       
        cuerpo += filaEncabezado(matrizNumeros, i, indice);
        for (let j = 0; j < columnas; j++) {

            cuerpo += agregarNumero_A_Fila(matrizNumeros[i][j].decimal);

        }
     
        cuerpo += '</tr>';
    }

    $('#encabezadoMapa').html(encabezado);
    $('#tbodyMapa').html(cuerpo);
}

function agregarNumero_A_Fila(decimal) {
    var fila = "";

    fila += '<td>' + decimal + '</td>';

    return fila;
}

function crearMatriz(tablaBinaria, filas, columnas) {

    var tabla = new Array();
    var indice = 0;

    for (var i = 0; i < filas; i++) {
        var columna = new Array();

        for (var j = 0; j < columnas; j++) {

            columna.push(tablaBinaria[indice]);
            indice++;
        }
        tabla.push(columna);
    }

    return tabla
}

function matrizOrdenFilasNumeros(matriz, limite, n) {

    for (let fila = 0; fila < matriz.length; fila++) {

        if ((fila + 1) == limite - 1) {

            var temp = matriz[fila];

            matriz[fila] = matriz[fila + 1];

            matriz[fila + 1] = temp;

            n += 1;
            limite = ((limite * n));
        }

    }

    return matriz;
}

function matrizOrdenColumnasNumeros(matriz, limite, n, termino, parada) {


    for (let i = 0; i < matriz.length; i++) {

        for (let columna = 0; columna < matriz[i].length; columna++) {
            if ((columna + 1) == limite - 1) {

                var temp = matriz[i][columna];
                matriz[i][columna] = matriz[i][columna + 1];
                matriz[i][columna + 1] = temp;


            }
            if (columna < limite - 1) {
                termino++;
            }
        }
    }

    if (termino >= parada) {
        return matriz;
    } else {
        n += 1;
        limite = (limite * n);
        matrizOrdenColumnasNumeros(matriz, limite, n, termino, parada);
    }
    return matriz;
}

function filaEncabezado(matrizNumeros, filaTablaBinaria, indice) {
    var filaEmcabezado = "";

    for (let i = 0; i < indice; i++) {

        if (matrizNumeros[filaTablaBinaria][0].binario[i] == 1) {
            filaEmcabezado += matrizNumeros[filaTablaBinaria][0].expresion[i];
        } else {
            filaEmcabezado += matrizNumeros[filaTablaBinaria][0].expresion[i];

        }

    }
    filaEmcabezado = '<tr>' + '<td>' + filaEmcabezado + '</td>';
    return filaEmcabezado;

}

function columnaEncabezado(matrizNumeros, cantidadVariables, filaTablaBinaria, columnas, indice) {
  
    if (filaTablaBinaria < columnas) {
        var columnaEmcabezado = "";

        for (let j = indice; j < cantidadVariables; j++) {
          
            if (matrizNumeros[0][filaTablaBinaria].binario[j] == 1) {

                columnaEmcabezado += matrizNumeros[0][filaTablaBinaria].expresion[j];
            } else {
                columnaEmcabezado += matrizNumeros[0][filaTablaBinaria].expresion[j];

            }
        }

        columnaEmcabezado += '<th>' + columnaEmcabezado + '</th>';
        return columnaEmcabezado;
    } else
        return null;
}

function ordenarTablaParaMapa(tablaBinaria) { //PARA LOS NUMEROS
    var indice = 0;
    for (let i = 0; i < filas; i++) {

        if ((i + 1) == filas - 1) {
            if (tablaBinaria[indice] != undefined) {
                var temp = tablaBinaria[indice + 1];
                tablaBinaria[indice + 1] = tablaBinaria[indice];
                tablaBinaria[indice] = temp;
            }

        }
        for (let j = 0; j < columnas; j++) {

            if ((j + 1) == columnas - 1) {
                if (tablaBinaria[indice] != undefined) {
                    var temp = tablaBinaria[indice + 1];
                    tablaBinaria[indice + 1] = tablaBinaria[indice];
                    tablaBinaria[indice] = temp;
                }
            }

            indice++;
        }

    }

    //devuelve la lista modificada para el mapa
    return tablaBinaria;
}