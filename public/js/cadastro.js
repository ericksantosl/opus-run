const formCadastro = document.getElementById('formCadastro');

formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    try {

        const response = await fetch('https://opusrun-backend.onrender.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                email,
                senha,
                confirmarSenha
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.erro);
            return;
        }

        alert(data.success);

        formCadastro.reset();

        window.location.href = 'login.html';

    } catch (error) {
        console.error(error);
        alert('Erro ao conectar com o servidor.');
    }
});