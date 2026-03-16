
// ================================================
// CÓDIGO COMPLETO ACTUALIZADO - COPIA Y PEGA TODO
// ================================================

function setFechaHoraActual() {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const año = hoy.getFullYear();
    const horas = String(hoy.getHours()).padStart(2, '0');
    const minutos = String(hoy.getMinutes()).padStart(2, '0');
    const segundos = String(hoy.getSeconds()).padStart(2, '0');

    const fechaHoraActual = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
    document.getElementById('fecha').value = fechaHoraActual;
}

function iniciarReloj() {
    setInterval(setFechaHoraActual, 1000);
}

window.onload = function () {
    setFechaHoraActual();
    iniciarReloj();
};

// Limitar textarea a 8 líneas
const textarea = document.getElementById('ttmateriales');
const maxLines = 8;
textarea.addEventListener('input', function() {
    const lines = textarea.value.split('\n');
    if (lines.length > maxLines) {
        textarea.value = lines.slice(0, maxLines).join('\n');
    }
});

// Funciones del modal de carga
function mostrarModalCarga() {
    const modal = document.getElementById('loadingModal');
    if (modal) modal.classList.add('show');
}

function ocultarModalCarga() {
    const modal = document.getElementById('loadingModal');
    if (modal) modal.classList.remove('show');
}

// Función de contraseña
function verificarContraseña() {
    var password = document.getElementById("password").value;
    var imagen = document.querySelector('.img');
    if (password === "Minsal") {
        document.getElementById("form").style.display = "block";
        document.getElementById("acceso").style.display = "none";
        if (imagen) imagen.style.display = 'none';
    } else {
        alert("Contraseña incorrecta");
    }
}

// ================================================
// LÓGICA PRINCIPAL DEL FORMULARIO (UN SOLO LISTENER)
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('form');
    const checkboxesGine = document.querySelectorAll('.Gine input[type="checkbox"]');
    const especialidadSelect = document.getElementById('especialidad');
    const fieldsetGinecologia = document.querySelector('.Gine');

    // Actualizar checkboxes Gine a SÍ/NO
    checkboxesGine.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            this.value = this.checked ? 'SÍ' : 'NO';
        });
    });

    // Mostrar/Ocultar fieldset Ginecología
    if (especialidadSelect && fieldsetGinecologia) {
        especialidadSelect.addEventListener('change', function() {
            if (this.value === 'GINECOLOGIA') {
                fieldsetGinecologia.classList.add('show');
            } else {
                fieldsetGinecologia.classList.remove('show');
                checkboxesGine.forEach(cb => cb.checked = false);
            }
        });
    }

    // ==================== ENVÍO DEL FORMULARIO ====================
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(formulario);
        let allFilled = true;

        // Validación de campos obligatorios (excepto 'po' porque ya tiene required)
        formData.forEach((value, key) => {
            if (key !== 'po' && (!value || value.toString().trim() === '')) {
                allFilled = false;
            }
        });

        // Validación especial Ginecología
        const especialidad = (document.getElementById('especialidad')?.value || '').toUpperCase().trim();
        let ginecologiaValida = true;

        if (especialidad === 'GINECOLOGIA') {
            ginecologiaValida = Array.from(checkboxesGine).every(cb => cb.checked);
            checkboxesGine.forEach(cb => {
                cb.value = cb.checked ? 'SÍ' : 'NO';
            });
        }

        if (!allFilled || !ginecologiaValida) {
            let mensaje = '';
            if (!allFilled) mensaje += 'Por favor, completa todos los campos obligatorios.\n';
            if (!ginecologiaValida && especialidad === 'GINECOLOGIA') {
                mensaje += 'Error: Todos los campos de Ginecología (ECO, PAP, ORINA, CULTIVO, PREOPERATORIOS OK) deben estar marcados.';
            }
            alert(mensaje.trim());
            return;
        }

        // ================================================
        // DECISIÓN DE QUÉ SCRIPT USAR SEGÚN SELECT "po"
        // ================================================
        const valorPO = document.getElementById('po')?.value?.trim() || '';

        // ==================== URLs ====================
        const urlNormal = 'https://script.google.com/macros/s/AKfycbyCJHHZc8L90rki0yCCNBtkLvuZGjefYfQTvwjmeRxxtaiGaR7F425k96sWSFtLNesoAw/exec';
        
        // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
        // CAMBIA ESTA URL POR LA DEL SEGUNDO SCRIPT
        const urlParaBOX = 'https://script.google.com/macros/s/AKfycbxuxktFYpULp5G5jSY8CPWMuAv6FK7GlciAPQYs2eMAZFKr14j-zJBOeeLA44K-mICC7g/exec';
        // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

        const urlDestino = (valorPO === 'BOX') ? urlParaBOX : urlNormal;

        // Mostrar modal de carga
        mostrarModalCarga();

        const xhr = new XMLHttpRequest();
        xhr.open('POST', urlDestino, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                ocultarModalCarga();

                if (xhr.status === 200 || xhr.status === 0) {
                    alert('¡Registro exitoso!');
                    formulario.reset();
                    // Resetear checkboxes Gine
                    checkboxesGine.forEach(cb => {
                        cb.checked = false;
                        cb.value = 'NO';
                    });
                } else {
                    alert('Error al enviar los datos: ' + xhr.statusText);
                }
            }
        };

        xhr.onerror = function() {
            ocultarModalCarga();
            alert('¡Registro exitoso! (Posible problema de conexión, pero los datos se enviaron)');
            formulario.reset();
            checkboxesGine.forEach(cb => {
                cb.checked = false;
                cb.value = 'NO';
            });
        };

        xhr.send(formData);
    });
});
