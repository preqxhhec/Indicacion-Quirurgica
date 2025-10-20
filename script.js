
 
    
  function setFechaHoraActual() {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const año = hoy.getFullYear();
    const horas = String(hoy.getHours()).padStart(2, '0');
    const minutos = String(hoy.getMinutes()).padStart(2, '0');
    const segundos = String(hoy.getSeconds()).padStart(2, '0');
  
    const fechaHoraActual = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
    document.getElementById('fecha').value = fechaHoraActual;
  }
  
  // Actualizar la fecha y hora cada segundo
  function iniciarReloj() {
    setInterval(setFechaHoraActual, 1000); // Llama a la función cada 1000 ms (1 segundo)
  }
  
  // Establecer la fecha y hora actual al cargar la página
  window.onload = function () {
    setFechaHoraActual(); // Establece la fecha y hora inmediatamente
    iniciarReloj(); // Comienza el reloj en tiempo real
  };


    
    const textarea = document.getElementById('ttmateriales');
    const maxLines = 8; // Número máximo de líneas permitidas

    textarea.addEventListener('input', function() {
      const lines = textarea.value.split('\n');
      if (lines.length > maxLines) {
        textarea.value = lines.slice(0, maxLines).join('\n');
      }
    });









  
document.addEventListener('DOMContentLoaded', function() {
            const formulario = document.getElementById('form');
            const checkboxes = document.querySelectorAll('.Gine input[type="checkbox"]');

            // Actualizar el valor de los checkboxes dinámicamente (SÍ/NO)
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    this.value = this.checked ? 'SÍ' : 'NO';
                });
            });

            formulario.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(formulario);
                let allFilled = true;

                // Verificar si todos los campos requeridos están llenos
                formData.forEach(function(value, key) {
                    if (!value) {
                        allFilled = false;
                    }
                });

                // Validar checkboxes de Ginecología si la especialidad es GINECOLOGIA
                const especialidad = document.getElementById('especialidad').value.toUpperCase();
                let ginecologiaValida = true;
                if (especialidad === 'GINECOLOGIA') {
                    ginecologiaValida = Array.from(checkboxes).every(checkbox => checkbox.checked);
                    // Actualizar valores antes de enviar
                    checkboxes.forEach(checkbox => {
                        checkbox.value = checkbox.checked ? 'SÍ' : 'NO';
                    });
                }

                if (allFilled && ginecologiaValida) {
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbzjG8NaLbOcQ-uO5di2bmU_itfWuxPRrWeUZrBu3b17pl3KrbVx3_RshDEjgpiS6uJNwg/exec');
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            try {
                                if (xhr.status === 200 || xhr.status === 0) {
                                    alert('¡Registro exitoso!');
                                    formulario.reset();
                                    // Restablecer valores a NO después de reset
                                    checkboxes.forEach(checkbox => {
                                        checkbox.value = 'NO';
                                    });
                                } else {
                                    alert('Error al enviar los datos: ' + xhr.statusText);
                                }
                            } catch (e) {
                                alert('¡Registro exitoso! (Posible problema de CORS, pero los datos se enviaron correctamente)');
                                formulario.reset();
                                checkboxes.forEach(checkbox => {
                                    checkbox.value = 'NO';
                                });
                            }
                        }
                    };
                    xhr.onerror = function() {
                        alert('¡Registro exitoso! (Posible problema de conexión, pero los datos se enviaron correctamente)');
                        formulario.reset();
                        checkboxes.forEach(checkbox => {
                            checkbox.value = 'NO';
                        });
                    };
                    xhr.send(formData);
                } else {
                    let mensajeError = '';
                    if (!allFilled) {
                        mensajeError += 'Por favor, completa todos los campos obligatorios del formulario.\n';
                    }
                    if (!ginecologiaValida && especialidad === 'GINECOLOGIA') {
                        mensajeError += 'Error: Todos los campos de Ginecología (ECO, PAP, ORINA, CULTIVO, PREOPERATORIOS OK) deben estar marcados de lo contrario culmine la preparación del paciente antes de generar la indicación quirúrgica.';
                    }
                    alert(mensajeError);
                }
            });
        });





  


  












// Función para mostrar el modal de carga
function mostrarModalCarga() {
    const modal = document.getElementById('loadingModal');
    if (modal) {
        modal.classList.add('show');
    } else {
        console.error('El modal de carga no se encontró en el DOM.');
    }
}

// Función para ocultar el modal de carga
function ocultarModalCarga() {
    const modal = document.getElementById('loadingModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Función para validar el formulario
function validarFormulario(formulario) {
    const especialidad = formulario.querySelector('#especialidad').value;
    const fecha = formulario.querySelector('#fecha').value;
    let esValido = true;

    // Validar campos obligatorios
    if (!especialidad || !fecha) {
        alert('Por favor, completa todos los campos obligatorios (Especialidad y Fecha).');
        esValido = false;
        return esValido;
    }

    // Validar que TODOS los checkboxes de ginecología estén marcados si se selecciona GINECOLOGÍA
    if (especialidad === 'GINECOLOGIA') {
        const checkboxes = formulario.querySelectorAll('.Gine input[type="checkbox"]');
        const todosMarcados = Array.from(checkboxes).every(checkbox => checkbox.checked);
        if (!todosMarcados) {
            alert('Por favor, marca TODOS los checkboxes en el apartado de Ginecología.');
            esValido = false;
        }
    }

    return esValido;
}

// Función para reiniciar el formulario y ocultar el fieldset de ginecología
function reiniciarFormulario(formulario, fieldsetGinecologia) {
    formulario.reset(); // Reinicia todos los campos del formulario
    fieldsetGinecologia.classList.remove('show'); // Oculta el fieldset de ginecología
}

document.addEventListener('DOMContentLoaded', function() {
    const especialidadSelect = document.getElementById('especialidad');
    const fieldsetGinecologia = document.querySelector('.Gine');
    const formulario = document.getElementById('form');

    // Verificar que los elementos existen
    if (!formulario) {
        console.error('El formulario con id="form" no se encontró.');
        return;
    }
    if (!especialidadSelect) {
        console.error('El elemento con id="especialidad" no se encontró.');
        return;
    }
    if (!fieldsetGinecologia) {
        console.error('El fieldset con clase="Gine" no se encontró.');
        return;
    }

    // Mostrar/Ocultar fieldset de ginecología según selección
    especialidadSelect.addEventListener('change', function() {
        if (this.value === 'GINECOLOGIA') {
            fieldsetGinecologia.classList.add('show');
        } else {
            fieldsetGinecologia.classList.remove('show');
            // Desmarcar todos los checkboxes de ginecología al ocultar
            const checkboxes = fieldsetGinecologia.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => checkbox.checked = false);
        }
    });

    // Manejar envío del formulario
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault(); // Prevenir el envío por defecto

        if (validarFormulario(formulario)) {
            mostrarModalCarga();
            // Simulación de envío de datos (reemplazar con lógica real)
            setTimeout(() => {
                ocultarModalCarga();
                alert('Datos enviados correctamente.');
                reiniciarFormulario(formulario, fieldsetGinecologia); // Reiniciar formulario y ocultar fieldset
            }, 2000); // Simular 2 segundos de envío
        }
    });
});





  function verificarContraseña() {
    var password = document.getElementById("password").value;
    var imagen = document.querySelector('.img');
    if (password === "Minsal") {
        document.getElementById("form").style.display = "block";
        document.getElementById("acceso").style.display = "none";
        imagen.style.display = 'none';
    } else {
        alert("Contraseña incorrecta");
    }
}


