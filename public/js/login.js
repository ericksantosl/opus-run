const formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {

        const response = await fetch('https://opusrun-backend.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                senha
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.erro);
            return;
        }

        alert(data.success);

        formLogin.reset();

        window.location.href = 'dashboard.html';

    } catch (error) {
        console.error(error);
        alert('Erro ao conectar com o servidor.');
    }
});