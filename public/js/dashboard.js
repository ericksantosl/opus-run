const API_URL = 'https://opusrun-backend.onrender.com';

const modalNovaTarefa = document.getElementById('modalNovaTarefa');
const btnAbrirNovaTarefa = document.getElementById('abrirNovaTarefa');
const btnFecharNovaTarefa = document.getElementById('fecharNovaTarefa');
const formNovaTarefa = document.getElementById('formNovaTarefa');
const tituloNovaTarefa = document.getElementById('tituloNovaTarefa');

const modalTarefaAdicionada = document.getElementById('modalTarefaAdicionada');
const btnFecharTarefaAdicionada = document.getElementById('fecharTarefaAdicionada');

const totalTarefas = document.getElementById('totalTarefas');
const tarefasPendentes = document.getElementById('tarefasPendentes');
const tarefasConcluidas = document.getElementById('tarefasConcluidas');
const listaTarefasRecentes = document.getElementById('listaTarefasRecentes');


btnAbrirNovaTarefa.addEventListener('click', () => {
    modalNovaTarefa.classList.remove('hidden');
});

btnFecharNovaTarefa.addEventListener('click', () => {
    modalNovaTarefa.classList.add('hidden');
    tituloNovaTarefa.value = '';
});


btnFecharTarefaAdicionada.addEventListener('click', () => {
    modalTarefaAdicionada.classList.add('hidden');
});


async function verificarSessao() {
    try {
        const response = await fetch(`${API_URL}/me`, {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();

        console.log('Sessão:', data);

        if (!data.userId) {
            window.location.href = 'login.html';
            return false;
        }

        console.log('Usuário autenticado:', data.userName);

        return true;

    } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        window.location.href = 'login.html';
        return false;
    }
}


async function carregarTarefas() {
    try {
        const response = await fetch(`${API_URL}/task`, {
            method: 'GET',
            credentials: 'include'
        });

        if (response.status === 401) {
            window.location.href = 'login.html';
            return;
        }

        const data = await response.json();

        if (!response.ok) {
            console.error(data.erro);
            return;
        }

        console.log('Tarefas:', data);

        atualizarEstatisticas(data);
        mostrarTarefasRecentes(data);

    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);

        listaTarefasRecentes.innerHTML = `
            <p class="px-8 text-zinc-400">
                Erro ao carregar as tarefas.
            </p>
        `;
    }
}


function atualizarEstatisticas(tarefas) {
    const total = tarefas.length;

    const pendentes = tarefas.filter((tarefa) => {
        return tarefa.status === 0;
    }).length;

    const concluidas = tarefas.filter((tarefa) => {
        return tarefa.status === 1;
    }).length;

    totalTarefas.innerText = total;
    tarefasPendentes.innerText = pendentes;
    tarefasConcluidas.innerText = concluidas;
}


function mostrarTarefasRecentes(tarefas) {
    listaTarefasRecentes.innerHTML = '';

    if (tarefas.length === 0) {
        listaTarefasRecentes.innerHTML = `
            <p class="px-8 text-zinc-400">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return;
    }

    const tarefasRecentes = [...tarefas].reverse().slice(0, 7);

    tarefasRecentes.forEach((tarefa, index) => {
        const artigo = document.createElement('article');

        artigo.classList.add(
            'flex',
            'justify-between',
            'px-8',
            'items-center',
            'pb-4',
            'border-b',
            'border-zinc-800'
        );

        if (index === tarefasRecentes.length - 1) {
            artigo.classList.remove('border-b');
        }

        const titulo = document.createElement('span');
        titulo.innerText = tarefa.titulo;

        const status = document.createElement('span');

        status.classList.add(
            'w-24',
            'text-center',
            'text-sm',
            'px-2',
            'py-1',
            'rounded-xl'
        );

        if (tarefa.status === 0) {
            status.innerText = 'Pendente';

            status.classList.add(
                'bg-yellow-100',
                'text-yellow-600'
            );
        } else {
            status.innerText = 'Concluída';

            status.classList.add(
                'bg-green-100',
                'text-green-600'
            );
        }

        artigo.appendChild(titulo);
        artigo.appendChild(status);

        listaTarefasRecentes.appendChild(artigo);
    });
}


formNovaTarefa.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = tituloNovaTarefa.value.trim();

    if (!titulo) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                titulo
            })
        });

        const data = await response.json();

        if (response.status === 401) {
            window.location.href = 'login.html';
            return;
        }

        if (!response.ok) {
            alert(data.erro);
            return;
        }

        console.log('Tarefa criada:', data);

        modalNovaTarefa.classList.add('hidden');
        modalTarefaAdicionada.classList.remove('hidden');

        tituloNovaTarefa.value = '';

        await carregarTarefas();

    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        alert('Erro ao conectar com o servidor.');
    }
});


fetch('https://api.open-meteo.com/v1/forecast?latitude=-9.6658&longitude=-35.7353&current=temperature_2m')
    .then(response => response.json())
    .then(data => {
        const temperatura = data.current.temperature_2m;

        document.getElementById('temperatura').innerText = `${temperatura}°C`;
    })
    .catch(() => {
        document.getElementById('temperatura').innerText = 'Erro ao carregar';
    });


async function iniciarDashboard() {
    const autenticado = await verificarSessao();

    if (!autenticado) {
        return;
    }

    await carregarTarefas();
}


iniciarDashboard();