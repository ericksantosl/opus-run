const modalNovaTarefa = document.getElementById('modalNovaTarefa');
const btnAbrirNovaTarefa = document.getElementById('abrirNovaTarefa');
const btnFecharNovaTarefa = document.getElementById('fecharNovaTarefa');
const formNovaTarefa = document.getElementById('formNovaTarefa');
const tituloNovaTarefa = document.getElementById('tituloNovaTarefa');
const modalTarefaAdicionada = document.getElementById('modalTarefaAdicionada');
const btnFecharTarefaAdicionada = document.getElementById('fecharTarefaAdicionada')

btnAbrirNovaTarefa.addEventListener('click', () => {
    modalNovaTarefa.classList.remove('hidden');
});

btnFecharNovaTarefa.addEventListener('click', () => {
    modalNovaTarefa.classList.add('hidden');
    tituloNovaTarefa.value = '';
});

formNovaTarefa.addEventListener('submit', (e) => {
    e.preventDefault();
    modalNovaTarefa.classList.add('hidden');
    modalTarefaAdicionada.classList.remove('hidden');
    tituloNovaTarefa.value = '';
});

btnFecharTarefaAdicionada.addEventListener('click', () => {
    modalTarefaAdicionada.classList.add('hidden');
});

fetch('https://api.open-meteo.com/v1/forecast?latitude=-9.6658&longitude=-35.7353&current=temperature_2m').then(response => response.json()).then(data => {
    const temperatura = data.current.temperature_2m;
    document.getElementById('temperatura').innerText = `${temperatura}°C`;
}).catch(() => {
    document.getElementById('temperatura').innerText = 'Erro ao carregar';
});

