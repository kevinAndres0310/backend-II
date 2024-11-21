document
  .getElementById('loginform')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const response = await fetch('/api/sessions/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      // Aquí puedes manejar la respuesta, por ejemplo, redirigir al usuario
      window.location.href = '/users/current';
    } else {
      // Manejar errores
      console.error('Error en el inicio de sesión');
    }
  });
