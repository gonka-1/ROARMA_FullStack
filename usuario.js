document.addEventListener('DOMContentLoaded', function () {

  // ----------------------------------------------------
  // 1. PÁGINA 1: Usuario.html (Datos Personales)
  // ----------------------------------------------------
  const formDatosPersonales = document.getElementById('formDatosPersonales');

  if (formDatosPersonales) {
    formDatosPersonales.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validar campos vacíos
      const campos = formDatosPersonales.querySelectorAll('input, select');
      let esValido = true;

      campos.forEach(campo => {
        if (!campo.value.trim()) {
          campo.classList.add('is-invalid');
          esValido = false;
        } else {
          campo.classList.remove('is-invalid');
        }
      });

      if (!esValido) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
      }

      // Validar Edad (mayoría de edad)
      const diaInput = document.getElementById('diaNacimiento');
      const mesSelect = document.getElementById('mesNacimiento');
      const anioInput = document.getElementById('anioNacimiento');

      if (diaInput && mesSelect && anioInput) {
        const dia = parseInt(diaInput.value);
        const mes = parseInt(mesSelect.value);
        const anio = parseInt(anioInput.value);

        const fechaNac = new Date(anio, mes, dia);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const diffMeses = hoy.getMonth() - fechaNac.getMonth();

        if (diffMeses < 0 || (diffMeses === 0 && hoy.getDate() < fechaNac.getDate())) {
          edad--;
        }

        if (edad < 18) {
          alert('Debes ser mayor de 18 años para registrarte.');
          return;
        }
      }

      window.location.href = 'Usuario-conf.html';
    });
  }


  // ----------------------------------------------------
  // 2. PÁGINA 2: Usuario-conf.html (Crear Usuario / Pass)
  // ----------------------------------------------------
  const formUsuario = document.getElementById('formUsuario');

  if (formUsuario) {
    formUsuario.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = document.getElementById('typeEmail');
      const passInput = document.getElementById('typePassword');

      if (!emailInput || !passInput) return;

      const email = emailInput.value.trim();
      const pass = passInput.value.trim();

      // Validaciones
      if (!email || !pass) {
        alert('Por favor, ingresa correo y contraseña.');
        return;
      }

      const tieneMinuscula = /[a-z]/.test(pass);
      const tieneMayuscula = /[A-Z]/.test(pass);
      const tieneNumero = /[0-9]/.test(pass);

      if (pass.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
      }

      if (!tieneMinuscula || !tieneMayuscula || !tieneNumero) {
        alert('La contraseña debe incluir al menos una letra mayúscula, una minúscula y un número.');
        return;
      }

      // Toast de Bootstrap o Alerta
      const toastEl = document.getElementById('toastUsuarioCreado');
      
      if (toastEl && typeof bootstrap !== 'undefined') {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();

        setTimeout(() => {
          window.location.href = 'Principal.html';
        }, 2000);
      } else {
        alert('¡Usuario creado con éxito!');
        window.location.href = 'Principal.html';
      }
    });

    // Mostrar / Ocultar Contraseña
    const btnToggle = document.getElementById('togglePassword');
    if (btnToggle) {
      btnToggle.addEventListener('click', function () {
        const passInput = document.getElementById('typePassword');
        const icon = document.getElementById('toggleIcon');

        if (passInput && icon) {
          const esPassword = passInput.type === 'password';
          passInput.type = esPassword ? 'text' : 'password';
          icon.classList.toggle('bi-eye');
          icon.classList.toggle('bi-eye-slash');
        }
      });
    }
  }


  // ----------------------------------------------------
  // 3. PÁGINA 3: Usuario-ingresar.html (Iniciar Sesión)
  // ----------------------------------------------------
  const formIngresar = document.getElementById('formIngresar');

  if (formIngresar) {
    formIngresar.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = document.getElementById('typeEmail');
      const passInput = document.getElementById('typePassword');

      if (!emailInput || !passInput) return;

      const email = emailInput.value.trim();
      const pass = passInput.value.trim();

      // 1. Validar campos vacíos
      if (!email || !pass) {
        alert('Por favor, ingresa tu correo y contraseña para ingresar.');
        return;
      }

      // 2. Validaciones de la contraseña
      const tieneMinuscula = /[a-z]/.test(pass);
      const tieneMayuscula = /[A-Z]/.test(pass);
      const tieneNumero = /[0-9]/.test(pass);

      if (pass.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
      }

      if (!tieneMinuscula || !tieneMayuscula || !tieneNumero) {
        alert('La contraseña debe incluir al menos una letra mayúscula, una minúscula y un número.');
        return;
      }

      // 3. Confirmación de inicio de sesión exitoso y redirección
      alert('¡Bienvenido de nuevo! Has ingresado con éxito.');
      window.location.href = 'Principal.html';
    });
  }

});