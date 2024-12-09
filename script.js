function setFechaHoraActual() {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const año = hoy.getFullYear();
    const horas = String(hoy.getHours()).padStart(2, '0');
    const minutos = String(hoy.getMinutes()).padStart(2, '0');
    const segundos = String(hoy.getSeconds()).padStart(2, '0');
  
    const fechaHoraActual = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    document.getElementById('fecha').value = fechaHoraActual;
  }
  
  window.onload = setFechaHoraActual;
  
 
    
    
    
    const textarea = document.getElementById('ttmateriales');
    const maxLines = 8; // Número máximo de líneas permitidas

    textarea.addEventListener('input', function() {
      const lines = textarea.value.split('\n');
      if (lines.length > maxLines) {
        textarea.value = lines.slice(0, maxLines).join('\n');
      }
    });

















    // recargar el formulario //
document.getElementById('BTN').addEventListener('click', function(e) {
    e.preventDefault();
    var formData = new FormData(document.getElementById('form'));
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbyCVsw4-YUYRHNe4IxPJBcZk0ZjwzfpLFmhJahyXxqb-LXIfuaerQlV_Pu-nXrrH9W8AA/exec');
    xhr.reload = function() {
      document.getElementById('form').reload(); 
     
    };
    xhr.send(formData);

    
  });








  
  document.getElementById('BTN').addEventListener('click', function() {
    // Obtener todos los campos del formulario
    const form = document.getElementById('form');
    const inputs = form.querySelectorAll('input, textarea, select');
    let allFilled = true;

    // Verificar si todos los campos están llenos
    inputs.forEach(function(input) {
        if (input.value === '') {
            allFilled = false;
        }
    });

    // Si todos los campos están llenos, ejecutar el código
    if (allFilled) {
        alert('¡Registro exitoso!');
        form.reset();
        window.location.reload();
    } else {
        alert('Por favor, completa todos los campos del formulario.');
    }
});
  

  



















  function verificarContraseña() {
    var password = document.getElementById("password").value;
    if (password === "Minsal") {
        document.getElementById("form").style.display = "block";
        document.getElementById("acceso").style.display = "none";
    } else {
        alert("Contraseña incorrecta");
    }
}
