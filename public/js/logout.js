const btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click', async () => {
    try {
        const response = await fetch('https://opusrun-backend.onrender.com/auth/logout',{ method: 'POST', credentials: 'include'});

        const data = await response.json();

        if (!response.ok) {
            alert(data.erro || 'Erro ao realizar logout.');
            return;
        }

        window.location.href = 'login.html';

    } catch (error) {
        console.error('Erro ao realizar logout:', error);
        alert('Erro ao conectar com o servidor.');
    }
});