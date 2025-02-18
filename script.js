/*function setFechaHoraActual() {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const año = hoy.getFullYear();
    const horas = String(hoy.getHours()).padStart(2, '0');
    const minutos = String(hoy.getMinutes()).padStart(2, '0');
    const segundos = String(hoy.getSeconds()).padStart(2, '0');
  
    const fechaHoraActual = `${dia}-${mes}-${año} ${horas}:${minutos}:${segundos}`;
    document.getElementById('fecha').value = fechaHoraActual;
  }
  
  window.onload = setFechaHoraActual;*/
  
 
    
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










   /* document.getElementById('BTN').addEventListener('click', function(e) {
      e.preventDefault();
      var formData = new FormData(document.getElementById('form'));
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://script.google.com/macros/s/AKfycbzgzgmhIge2Yzqol2mMg-rTnO5_jkqE0TsWPI3AYJ74TsGUJ92jGB4kg4VTuypeBE8r8A/exec');
      xhr.reload = function() {
        document.getElementById('form').reload(); 
       
      };
      xhr.send(formData);
  
      
    });*/
  
  
  
  
  
  
  
  
    
    document.getElementById('BTN').addEventListener('click', function(e) {
      e.preventDefault();
      var form = document.getElementById('form');
      var formData = new FormData(form);
      var allFilled = true;
  
      // Verificar si todos los campos están llenos
      formData.forEach(function(value, key) {
          if (!value) {
              allFilled = false;
          }
      });
  
      if (allFilled) {
          var xhr = new XMLHttpRequest();
          xhr.open('post','https://script.google.com/macros/s/AKfycbx-OUSje44omDuOboKt-0RJib6Jf2k2DoOs3HF0UXdIlIqh4kDMs6AEEyG_5pGN_0aM4g/exec');
          xhr.onload = function() {
              if (xhr.status === 200) {
                  alert('¡Registro exitoso!'); // Alerta de confirmación
                  form.reset(); // Borrar los campos del formulario
              } else {
                  console.error('Error al enviar los datos:', xhr.statusText);
              }
          };
          xhr.send(formData);
          alert('¡Registro exitoso!'); 
          form.reset();
      } else {
          alert('Por favor, completa todos los campos del formulario.');
      }
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
