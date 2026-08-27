const API_URL = 'https://opusrun-backend.onrender.com';

const totalTarefas = document.getElementById('totalTarefas');
const listaTarefas = document.getElementById('listaTarefas');


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

        totalTarefas.innerText = data.length;

        mostrarTarefas(data);

    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);

        listaTarefas.innerHTML = `
            <p class="px-8 text-zinc-400">
                Erro ao carregar as tarefas.
            </p>
        `;
    }
}


function mostrarTarefas(tarefas) {
    listaTarefas.innerHTML = '';

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = `
            <p class="px-8 text-zinc-400">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return;
    }

    tarefas.forEach((tarefa, index) => {
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

        if (index === tarefas.length - 1) {
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

        listaTarefas.appendChild(artigo);
    });
}


async function iniciarPagina() {
    const autenticado = await verificarSessao();

    if (!autenticado) {
        return;
    }

    await carregarTarefas();
}


iniciarPagina();