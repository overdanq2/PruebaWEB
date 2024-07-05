document.getElementById('FormularioRegistrar').addEventListener('submit', function(event) {
    // Obtener los valores de los campos del formulario
 
    var correo = document.getElementById('correo').value;
    var contraseña = document.getElementById('contraseña').value;


    // Validación del correo electrónico
    if (!emailRegex.test(correo)) {
        alert('Por favor, introduce un correo electrónico válido');
        event.preventDefault();
        return;
    }

    // Validación de la dirección (alfanumérica y permite espacios)
    if (!direccionRegex.test(contraseña)) {
        alert('La dirección solo puede contener caracteres alfanuméricos y espacios');
        event.preventDefault();
        return;
    }

});

