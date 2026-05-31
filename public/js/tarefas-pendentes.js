const modalTarefaConcluida = document.getElementById('modalTarefaConcluida');
const btnMarcarTarefaConcluida = document.querySelectorAll('.btn-concluir');
const btnFecharTarefaConcluida = document.getElementById('fecharTarefaConcluida')

btnMarcarTarefaConcluida.forEach((btn) => {
    btn.addEventListener('click', () => {
        modalTarefaConcluida.classList.remove('hidden');
    });
});

btnFecharTarefaConcluida.addEventListener('click', () => {
    modalTarefaConcluida.classList.add('hidden');
});