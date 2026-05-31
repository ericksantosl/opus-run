const modalTarefaExcluida = document.getElementById('modalTarefaExcluida');
const btnMarcarTarefaExcluida = document.querySelectorAll('.btn-excluir');
const btnFecharTarefaExcluida = document.getElementById('fecharTarefaExcluida')

btnMarcarTarefaExcluida.forEach((btn) => {
    btn.addEventListener('click', () => {
        modalTarefaExcluida.classList.remove('hidden');
    });
});

btnFecharTarefaExcluida.addEventListener('click', () => {
    modalTarefaExcluida.classList.add('hidden');
});