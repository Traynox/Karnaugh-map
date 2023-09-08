listarComboBox();

$('#seleccionVariables').click(function() {

    cantidadVariables = $('#seleccionVariables').val();
    limpiarVariables();
    crearTabla(cantidadVariables);
 
    
});

function listarComboBox() {
    let box = "";
    for (let i = 4; i < 9; i++) {
        box += '<option value="' + i + '" class="">' + i + '</option>';
    }
    $('#seleccionVariables').html(box);
}

