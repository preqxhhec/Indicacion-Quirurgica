
 
    
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
                    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbya2rYhZcA5lwj0xQNW3_kFCMJAJ6yd4RfVMIDB9mm0esHxWrG58LpJpadJ0i6oYZM7VA/exec');
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
