var alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
    'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

var cantidadVariables = 4;
var agregar = true;
var listaTabla = new Array();
var listaConGrupos = new Array();
var listaAdyacenciasOrden1 = new Array();
var listaConGruposAdyacenciasOrden1 = new Array();
var listaImplicantes = new Array();
var listaAdyacenciasOrden2 = new Array();
var activados = new Array();
var tablaBinaria = new Array();
var tempElevado = 0;
var filas = 0;
var columnas = 0;
var encabezadoFilas = new Array();

crearTabla(cantidadVariables);


function ajustCss(){
    
    let widthScreen = window.innerWidth;
   
    let elemento = document.getElementById('divMapa');
    
    if(widthScreen<=800){
        if(cantidadVariables>=7){

            elemento.style.marginTop = "50rem"
        }else{

            elemento.style.marginTop = "20rem"
        }
    }else{
      
        if(cantidadVariables > 7){
            
            elemento.style.marginLeft = "-30rem"
        
        }else if(cantidadVariables == 7 || cantidadVariables == 6){
            elemento.style.marginLeft = "-10rem"
       
        }else{
        
            elemento.style.marginLeft = "0rem"
                
        }
    }
 
}

function limpiarVariables() {

    agregar = true;
    tablaBinaria = new Array();
    resetearActivados();
    listaTabla = new Array();
    listaConGrupos = new Array();
    listaAdyacenciasOrden1 = new Array();
    listaConGruposAdyacenciasOrden1 = new Array();
    listaImplicantes = new Array();
    listaAdyacenciasOrden2 = new Array();
  
    tempElevado = 0;
    filas = 0;
    columnas = 0;
    encabezadoFilas = new Array();
    crearCuerpoTabla(cantidadVariables);
    $('#resultado').html("");
    
}

function resetearActivados() {

    for (let i = 0; i < activados.length; i++) {
        activados[i] = false;
        $("#" + i).prop('checked', false);
    }

}

function crearTabla(cantidadVariables) {

    var encabezado = "";

    encabezado += crearEncabezadoTabla(cantidadVariables);

    $('#encabezadoTabla').html(encabezado);

    crearCuerpoTabla(cantidadVariables);
}

//CUARTO PASO


function AsignarGrupo2(binario1, binario2) {

    var cantidadUnos = 0;
    for (let i = 0; i < binario1.length; i++) {
        if ((binario1[i] == 1) && (binario2[i] == 1)) {
            cantidadUnos++
        }
    }

    return cantidadUnos;
}


//SEGUNDO PASO
function clickFuncion() {
    var cantidadUnos = 0;

    if (listaTabla.length > 0) {
        for (let i = 0; i < listaTabla.length; i++) {
            cantidadUnos = 0;
            for (const binario of listaTabla[i].adyacencia) {
                if (binario == 1) {
                    cantidadUnos++
                }
            }
            listaTabla[i].grupo = cantidadUnos;
        }

        listaTabla = listaTabla.sort(function(a, b) {
            return (a.grupo - b.grupo);
        }); //ORDENAR POR GRUPOS


        listaConGrupos = agrupar(listaTabla);

        listaAdyacenciasOrden1 = adyacenciaOrdenUno(listaConGrupos, 1); //CAMBIO RECIENTE
      
        listaImplicantes = ordenarImplicantes(listaImplicantes); //y LES ASIGNA NOMBRE IMPLICANTE
    
        var resultadoArray = getResultadoImplicantes(listaTabla, listaImplicantes); //mandar al resultado en label
     
        var resultado_Final = concatenarResultado(resultadoArray);
    

        $('#resultado').html(resultado_Final);
        ajustCss()
        cantidadVariables = parseInt(cantidadVariables);

        if (cantidadVariables % 2 == 0) {
            tempElevado = (Math.pow(2, cantidadVariables));

            filas = Math.sqrt(tempElevado);
            columnas = filas;
        } else {

            cantidadVariables = parseInt(cantidadVariables);
            tempElevado = Math.pow(2, (cantidadVariables + 1));
            filas = Math.sqrt(tempElevado);
            columnas = (filas / 2);
        }
        filas = parseInt(filas);
        columnas = parseInt(columnas);
      
        crearMapa(tablaBinaria, cantidadVariables, filas, columnas);
    } else {
        $('#resultado').html("no hay valores agregados");

    }
}

function concatenarResultado(resultadoArray) {
    var resultado = "";
    for (let i = 0; i < resultadoArray.length; i++) {

        resultado += resultadoArray[i];

    }
    return resultado;
}

function ordenarNumeros(anterior, siguente) {
    if (anterior.rango > siguente.rango) {
        return 1;
    }
    if (anterior.rango < siguente.rango) {
        return -1;
    }
    return 0;
}

function eliminarColados2(listaImplicantes) {

    for (let i = 0; i < listaImplicantes.length; i++) {

        if (listaImplicantes[i]['estado'] == true) {

            listaImplicantes.splice(i, 1);

        }
    }
    return listaImplicantes;
}

function iSinsertarObjeto(encabezadoColumna, rangoFila) {

    var tempRango = "";
    if (rangoFila.length > 1) {
        var tempRango = rangoFila.split(",");
        for (let i = 0; i < tempRango.length; i++) {

            if (tempRango[i] == encabezadoColumna) {

                return true;
            }
        }
    } else {
        tempRango = rangoFila;
        if (tempRango == encabezadoColumna) {

            return true;
        }
    }

    return false;
}

function getResultadoImplicantes(listaTabla, listaImplicantes) {

    var tablaImplicantes = new Array();
    var listaTablaOrdena = listaTabla.sort(ordenarNumeros);
   
    listaImplicantes = eliminarColados2(listaImplicantes);
 
    for (let i = 0; i < listaImplicantes.length; i++) {
        var tablaImplicantesColumnas = new Array();
        for (let j = 0; j < listaTablaOrdena.length; j++) {

            if (iSinsertarObjeto(listaTablaOrdena[j].rango, listaImplicantes[i].rango)) {
                var objTablaImplicante = {
                    marca: "x",
                    fila: listaImplicantes[i].rango,
                    columna: listaTablaOrdena[j].rango,
                    adyacencia: listaImplicantes[i].adyacencia,
                    nombre: listaImplicantes[i].nombre // Linea agregada reciente
                }
                tablaImplicantesColumnas.push(objTablaImplicante);
            } else {
             
                var objTablaImplicante = {
                    marca: "vacio",
                    fila: listaImplicantes[i].rango,
                    columna: listaTablaOrdena[j].rango
                }
                tablaImplicantesColumnas.push(objTablaImplicante);

            } //fin if
        }

        tablaImplicantes.push(tablaImplicantesColumnas);
    }

    var expresion = verificarTabla(tablaImplicantes);
  
    return expresion;
}

function verificarTabla(tablaImplicantes) {
    var implicantesDominantes = new Array();
    var listaImplicantesNoEsenciales = new Array();
    var n = 0;

    for (let i = 0; i < tablaImplicantes[0].length; i++) {
        var temp = tablaImplicantes[n][i]['columna'];

        for (let j = 0; j < tablaImplicantes.length; j++) {

            if (tablaImplicantes[j][i]['marca'] == "x" && tablaImplicantes[j][i]['columna'] == temp) {
               
                if (ganeLineal(tablaImplicantes, j, i) <= 1) { //is implicante Dominante

                    tablaImplicantes[j][i].marca = "implicanteDominante";
                    implicantesDominantes.push(tablaImplicantes[j][i]);

                    marcarHorizontal(tablaImplicantes, j, i); //marcar vertical y horizontal
                   
                }
            }

        }
        if (n < tablaImplicantes.length - 1)
            n++;
    }

    listaImplicantesNoEsenciales = getImplicantesNoEsenciales(tablaImplicantes);
 
    var terminoFaltante = getTerminoTablaReducida(listaImplicantesNoEsenciales);
   
    //VERFICAR CON OTROS GRUPOS

    implicantesDominantes = implicantesDominantes.sort(ordenarPorNombre);
 
    implicantesDominantes.unshift(terminoFaltante);
  
    implicantesDominantes = EliminarGruposRepetidos(implicantesDominantes);
  
    return getResultado(implicantesDominantes);
}

function ordenarPorNombre(anterior, siguente) {
    if (anterior.nombre < siguente.nombre) {
        return 1;
    }
    if (anterior.nombre > siguente.nombre) {
        return -1;
    }
    return 0;
}

function getResultado(implicantesDominantes) {
  
    var expresion = new Array();

    for (let i = 0; i < implicantesDominantes.length; i++) {
        for (let j = 0; j < implicantesDominantes[i].adyacencia.length; j++) {
            if (implicantesDominantes[i].adyacencia[j] == 1) {
                expresion.push(alfabeto[j]);
              
            } else if (implicantesDominantes[i].adyacencia[j] == 0) {
                expresion.push((alfabeto[j] + "'"));
               
            }
        }
       
        expresion.push(" + ");
    }
   
    expresion.pop();
    return expresion;
}

function getTerminoTablaReducida(listaImplicantesNoEsenciales) {

    var minTerminoDominante = new Array();

    for (let i = 0; i < listaImplicantesNoEsenciales.length; i++) {
        var cantidad = 0;
        for (let j = 0; j < listaImplicantesNoEsenciales.length; j++) {
            if (listaImplicantesNoEsenciales[i]['fila'] == listaImplicantesNoEsenciales[j]['fila']) {
                cantidad += 1;
            }
        }

        var objminTermino = {
            marca: "implicanteDominante",
            fila: listaImplicantesNoEsenciales[i]['fila'],
            cantidades_X: cantidad,
            columna: listaImplicantesNoEsenciales[i]['columna'],
            adyacencia: listaImplicantesNoEsenciales[i].adyacencia,
            nombre: listaImplicantesNoEsenciales[i].nombre
        }
        minTerminoDominante.push(objminTermino);
    }

    minTerminoDominante = minTerminoDominante.sort(ordenarPorCantidad_X);

    return minTerminoDominante[0];
}

function ordenarPorCantidad_X(anterior, siguente) {
    if (anterior.cantidades_X < siguente.cantidades_X) {
        return 1;
    }
    if (anterior.cantidades_X > siguente.cantidades_X) {
        return -1;
    }
    return 0;
}

function getImplicantesNoEsenciales(tablaImplicantes) {
    var listaImplicantesNoEsenciales = new Array();

    for (let i = 0; i < tablaImplicantes.length; i++) {
        for (let j = 0; j < tablaImplicantes[i].length; j++) {
            if (tablaImplicantes[i][j].marca == "x") {
                listaImplicantesNoEsenciales.push(tablaImplicantes[i][j]);
            }
        }
    }
    return listaImplicantesNoEsenciales;
}

function EliminarRepetidos(listaImplicantesNoEsenciales, implicantesDominantes) {

    for (let i = 0; i < implicantesDominantes.length; i++) {
        var rango1 = implicantesDominantes[i].adyacencia;

        for (let j = 0; j < listaImplicantesNoEsenciales.length; j++) {
            var rango2 = listaImplicantesNoEsenciales[j].adyacencia;

            if (JSON.stringify(rango1) === JSON.stringify(rango2)) {

                listaImplicantesNoEsenciales.splice(j, 1);

            }
        }
    }
    return listaImplicantesNoEsenciales;
}


function marcarHorizontal(tablaImplicantes, filaActual, columnaActual) {

    for (var columna = columnaActual; columna < tablaImplicantes[filaActual].length; columna++) {
        if (tablaImplicantes[filaActual][columna].marca == "x") {
            tablaImplicantes[filaActual][columna].marca = "DominadoPorFila";
            marcarVertical(tablaImplicantes, filaActual, columna);

        }
    }
}

function marcarVertical(tablaImplicantes, filaActual, columna) {
    marcarVertical_1(tablaImplicantes, columna);
    marcarganeVertical_2(tablaImplicantes, filaActual, columna);
}

function marcarVertical_1(tablaImplicantes, columna) {

    for (var fila = 0; fila < tablaImplicantes.length; fila++) {

        if (tablaImplicantes[fila][columna]['marca'] == "x") {

            tablaImplicantes[fila][columna].marca = "DominadoPorColumna";

        }
    }

}

function marcarganeVertical_2(tablaImplicantes, filaActual, columna) {

    for (var fila = filaActual - 1; fila >= 0; fila--) {

        if (tablaImplicantes[fila][columna]['marca'] == "x") {

            tablaImplicantes[fila][columna].marca = "DominadoPorColumna";
        }
    }

}

function ganeVertical_1(tablaImplicantes, columna) {
    var cont = 0;

    for (var fila = 0; fila < tablaImplicantes.length; fila++) {

        if (tablaImplicantes[fila][columna]['marca'] == "x" ||
            tablaImplicantes[fila][columna]['marca'] == "DominadoPorFila" ||
            tablaImplicantes[fila][columna]['marca'] == "DominadoPorColumna" ||
            tablaImplicantes[fila][columna]['marca'] == "implicanteDominante") {

            cont++;

        }
    }

    return cont;
}

function ganeVertical_2(tablaImplicantes, filaActual, columna) {
    var cont = 0;

    for (var fila = filaActual - 1; fila >= 0; fila--) {

        if (tablaImplicantes[fila][columna]['marca'] == "x" ||
            tablaImplicantes[fila][columna]['marca'] == "DominadoPorFila" ||
            tablaImplicantes[fila][columna]['marca'] == "DominadoPorColumna" ||
            tablaImplicantes[fila][columna]['marca'] == "implicanteDominante") {
            cont++;
        }
    }

    return cont;
}

function ganeLineal(tablaImplicantes, filaActual, columna) {
   
    return ((ganeVertical_1(tablaImplicantes, columna) + ganeVertical_2(tablaImplicantes, filaActual, columna)));
}




function diferencia(binario1, binario2) {

    var diferencia = 0;
    for (let i = 0; i < binario1.length; i++) {

        if (!(binario1[i] === binario2[i])) {

            diferencia++;
        }
    }

    return diferencia;
}

function agrupar(lista) {

    listaConGruposAdyacencias = new Array();

    for (let i = 0; i <= cantidadVariables; i++) { //Verificar con otros grupos
        var grupo = new Array();
        for (let j = 0; j < lista.length; j++) {
            if (lista[j]['grupo'] == i) {
                grupo.push(lista[j]);
            }
        }
        listaConGruposAdyacencias[i] = grupo;
    }

    return listaConGruposAdyacencias;

}

function ordenarImplicantes(listaImplicantes) {
    lista = new Array();

    for (let i = listaImplicantes.length - 1, n = 0; i >= 0; i--, n++) {

        var objImplicante = {
            orden: listaImplicantes[i].orden,
            rango: listaImplicantes[i].rango,
            adyacencia: listaImplicantes[i].adyacencia,
            grupo: listaImplicantes[i].grupo,
            estado: listaImplicantes[i].estado,
            nombre: "pl" + (n + 1)
        }

        lista.push(objImplicante);
       
    }

    return lista;
}

function nextAdyacenciaOrden(listaConGruposAdyacenciasOrden1) {

    var listaAdyacenciasOrden2 = new Array();

    for (let i = 0; i < listaConGruposAdyacenciasOrden1.length - 1; i++) {
        for (let j = 0; j < listaConGruposAdyacenciasOrden1[i].length; j++) {
            for (let k = 0; k < listaConGruposAdyacenciasOrden1[i + 1].length; k++) {

                var binario1 = listaConGruposAdyacenciasOrden1[i][j].adyacencia;
                var binario2 = listaConGruposAdyacenciasOrden1[(i + 1)][k].adyacencia

                if (diferencia(binario1, binario2) <= 1) {

                    listaConGruposAdyacenciasOrden1[i][j].estado = true;
                    listaConGruposAdyacenciasOrden1[(i + 1)][k].estado = true;

                    var rango = listaConGruposAdyacenciasOrden1[i][j].rango + "," +
                        listaConGruposAdyacenciasOrden1[(i + 1)][k].rango;

                    var adyacencia = compararBinarios(binario1, binario2); //AQUI VERIFICAR CON OTROS RANGOS

                    var objAdyacencia = {
                        rango: rango,
                        adyacencia: adyacencia,
                        grupo: 0,
                        estado: false
                    }
                    listaAdyacenciasOrden2.push(objAdyacencia);
                }
            }
        }
    }
    if (listaAdyacenciasOrden2.length == 0)
        return false;
    else
        return true;

}

function adyacenciaOrdenUno(listaConGrupos, n) {

    var listaAdyacenciasOrden1 = new Array();

    for (let i = 0; i < listaConGrupos.length - 1; i++) {
        for (let j = 0; j < listaConGrupos[i].length; j++) {
            for (let k = 0; k < listaConGrupos[i + 1].length; k++) {

                var binario1 = listaConGrupos[i][j].adyacencia;
                var binario2 = listaConGrupos[(i + 1)][k].adyacencia

                if (diferencia(binario1, binario2) <= 1) {

                    listaConGrupos[i][j].estado = true;
                    listaConGrupos[(i + 1)][k].estado = true;

                    var rango = listaConGrupos[i][j].rango + "," + listaConGrupos[(i + 1)][k].rango;
                    var adyacencia = compararBinarios(binario1, binario2); //AQUI VERIFICAR CON OTROS RANGOS

                    var objAdyacencia = {
                        orden: n,
                        rango: rango,
                        adyacencia: adyacencia,
                        grupo: AsignarGrupo2(binario1, binario2),
                        estado: false
                    }

                    listaAdyacenciasOrden1.push(objAdyacencia);
                }
            }
        }
    }

    listaAdyacenciasOrden1 = EliminarGruposRepetidos(listaAdyacenciasOrden1); //PROBAR CON OTROS GRUPOS

    añadirImplicantes(listaConGrupos, listaAdyacenciasOrden1);
    var nextAdyacencia = nextAdyacenciaOrden(agrupar(listaAdyacenciasOrden1)); //);

    if (nextAdyacencia == false) {

        return listaAdyacenciasOrden1;

    } else {

        n += 1;
        adyacenciaOrdenUno(agrupar(listaAdyacenciasOrden1), n);

    }

    return listaAdyacenciasOrden1; // = adyacenciaOrdenUno(agrupar(listaAdyacenciasOrden1), n);

}



function añadirImplicantes(listaConGrupos, listaAdyacenciasOrden1) {
    listaConGruposAdyacenciasOrden1 = limpiarArrayUndefined(listaConGruposAdyacenciasOrden1);
    listaConGrupos = limpiarArrayUndefined(listaConGrupos);

    for (let i = 0; i < listaConGrupos.length; i++) {
        for (let j = 0; j < listaConGrupos[i].length; j++) {
            if (listaConGrupos[i][j]['estado'] == false) {

                listaImplicantes.push(listaConGrupos[i][j]);
            }
        }
    }
   

    listaImplicantes = eliminarColados2(listaImplicantes);
   
  
    for (let i = 0; i < listaAdyacenciasOrden1.length; i++) {

        if (listaAdyacenciasOrden1[i]['estado'] == false) {

            if (listaAdyacenciasOrden1[i]['orden'] >= 1) {
                listaImplicantes.push(listaAdyacenciasOrden1[i]);
            }
        }
    }

    listaImplicantes = EliminarGruposRepetidos(listaImplicantes);
    listaImplicantes = eliminarColados2(listaImplicantes);
}



function EliminarGruposRepetidos(listaAdyacenciasOrden1) {

    listaConGruposAdyacenciasOrden1 = limpiarArrayUndefined(listaAdyacenciasOrden1);
    for (let i = 0; i < listaAdyacenciasOrden1.length; i++) {
        var rango1 = listaAdyacenciasOrden1[i].adyacencia;

        for (let j = 0; j < listaAdyacenciasOrden1.length; j++) {
            var rango2 = listaAdyacenciasOrden1[j].adyacencia;

            if (JSON.stringify(rango1) === JSON.stringify(rango2) && i != j) {
                listaAdyacenciasOrden1.splice(j, 1);
            }
        }
    }
    return listaAdyacenciasOrden1;
}

function limpiarArrayUndefined(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == undefined || array[i].length == 0) { //CAMBIADA RECIENTE AGREADO EL ||
            array.splice(i, 1);

        }
    }
    return array;
}

function compararBinarios(binario1, binario2) {
  
    adyacencia = new Array();
    var diferencia = 0;
    for (let i = 0; i < binario1.length; i++) {
        if (diferencia < 1) {
            if (binario1[i] === binario2[i]) {
                adyacencia.push(binario1[i]);

            } else {
                adyacencia.push('-');
                diferencia++;
            }
        } else {

            if (binario1[i] === binario2[i]) {
                adyacencia.push(binario1[i]);

            } else {
                adyacencia.push('-');
                diferencia++;
            }
        }
    }

    return adyacencia;
}



function eliminarNumerosDuplicados(ListaTabla) {

    var tamano = listaTabla.length;

    for (var i = 0; i < tamano; i++) {
        for (var j = 0; j < tamano; j++) {
            if (listaTabla[i] == listaTabla[j] && i != j) {
                listaTabla.splice(j, 1);
            }
        }
    }
    //ORDENA EL ARRAYLIST
   
    return ListaTabla;
}

function agregarBinario_A_Fila(binario) {
    var fila = "";

    for (let i = 0; i < binario.length; i++) {
        fila += '<td>' + binario[i] + '</td>';

    }
    return fila;
}

function de_cadena_A_array(binario) {
    var binarioArray = new Array();

    for (let i = 0; i < binario.length; i++) {
        binarioArray.push(binario[i]);

    }
    return binarioArray;
}

function agregarcerosIzquierda(binario) {

    binarioArray = de_cadena_A_array(binario);

    for (let i = binario.length; i < cantidadVariables; i++) {
        binarioArray.unshift('0');

    }
    return binarioArray;
}

function crearEncabezadoTabla(cantidadVariables) {

    var encabezado = "<th>#</th>";

    for (var i = 0; i < cantidadVariables; i++) {
        encabezado += '<th>' + alfabeto[i] + '</th>';
    }
    encabezado += '<th> x </th>';

    return encabezado;
}


function crearCuerpoTabla(cantidadVariables) {
    var elevado = Math.pow(2, cantidadVariables);
    var tabla = "";
    var binario;
    for (let i = 0; i < elevado; i++) {
        binario = i.toString(2);
        binario = agregarcerosIzquierda(binario);
      
        tabla += '<tr>' + '<td>' + i + '</td>';
        tabla += agregarBinario_A_Fila(binario);
        tabla += '<td>' + '<input type="radio" class="radio" id="' + i + '" name="' + i + '" value="' + i + '"></input>' + '</td>';
        tabla += '</tr>';
        activados[i] = false;

        var objBinario = {
            expresion: getExpresion(binario), //devuelve ejemplo AB'C'D'
            binario: binario,
            decimal: i
        }

        tablaBinaria.push(objBinario);
    }

    $('#tbody').html(tabla);
}

function getExpresion(binario) {
    var expresion = new Array();
    for (let i = 0; i < binario.length; i++) {

        if (binario[i] == 0)
            expresion[i] = (alfabeto[i] + "'");
        else
            expresion[i] = alfabeto[i];
    }
    return expresion;
}


$(document).on('click', '.radio', function() {

    let fila = $(this).closest("tr");
    var id = parseInt(fila.find('td:eq(0)').text());

    var binario = id.toString(2);
    binario = agregarcerosIzquierda(binario);
    if (activados[id] == false) {
        var numero = {
            rango: id,
            adyacencia: binario,
            grupo: 0,
            estado: false
        }
        listaTabla.push(numero);
        activados[id] = true;
    } else {

        listaTabla = eliminarElemento(listaTabla, id);
        activados[id] = false;
        $(this).prop('checked', false);
    }
   

    $('#resultado').html("");
});

function eliminarElemento(listaTabla, id) {

    for (let i = 0; i < listaTabla.length; i++) {
        if (listaTabla[i].rango == id) {
            listaTabla.splice(i, 1);
        }
    }
    return listaTabla;
}