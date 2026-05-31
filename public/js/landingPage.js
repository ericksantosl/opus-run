const formDuvida = document.getElementById('formDuvida');
const modalMensagemEnviada = document.getElementById('modalMensagemEnviada');
const btnFecharMensagemEnviada = document.getElementById('fecharMensagemEnviada');
const btnLogin = document.getElementById('btnLogin');
const btnEmBreve = document.querySelectorAll('.btn-em-breve');
const modalEmBreve = document.getElementById('modalEmBreve');
const btnFecharEmBreve = document.getElementById('fecharEmBreve');

formDuvida.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const duvida = document.getElementById('duvida').value;

    if(!nome || !email || !duvida){
        alert('Todos os campos precisam estar preenchidos!');
        return;
    }

    if(nome.length < 3) {
        alert('O nome é muito curto.');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert('Digite um e-mail válido.');
        return;
    }

    if(duvida.length < 10){
        alert('Sua dúvida deve ter pelo menos 10 caracteres.');
        return;
    }

    modalMensagemEnviada.classList.remove('hidden');
    formDuvida.reset();
});

btnFecharMensagemEnviada.addEventListener('click', () => {
    modalMensagemEnviada.classList.add('hidden');
});

btnEmBreve.forEach((btn) => {
    btn.addEventListener('click', () => {
        modalEmBreve.classList.remove('hidden');
    })
})
    
btnFecharEmBreve.addEventListener('click', () => {
    modalEmBreve.classList.add('hidden');
})