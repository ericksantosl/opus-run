const API_URL = 'https://opusrun-backend.onrender.com';

const listaTarefas = document.getElementById('listaTarefas');
const totalPendentes = document.getElementById('totalPendentes');

const modalTarefaConcluida = document.getElementById('modalTarefaConcluida');
const btnFecharTarefaConcluida = document.getElementById('fecharTarefaConcluida');


async function verificarSessao() {
    try {
        const response = await fetch(`${API_URL}/me`, {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();

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


async function carregarTarefasPendentes() {
    try {
        const response = await fetch(`${API_URL}/task`, {
            method: 'GET',
            credentials: 'include'
        });

        if (response.status === 401) {
            window.location.href = 'login.html';
            return;
        }

        const tarefas = await response.json();

        if (!response.ok) {
            console.error(tarefas.erro);
            return;
        }

        const tarefasPendentes = tarefas.filter((tarefa) => tarefa.status === 0);

        totalPendentes.innerText = tarefasPendentes.length;

        mostrarTarefasPendentes(tarefasPendentes);

    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);

        listaTarefas.innerHTML = `
            <p class="px-8 text-zinc-400">
                Erro ao carregar as tarefas.
            </p>
        `;
    }
}


function mostrarTarefasPendentes(tarefas) {
    listaTarefas.innerHTML = '';

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = `
            <p class="px-8 text-zinc-400">
                Nenhuma tarefa pendente.
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

        const botao = document.createElement('button');

        botao.classList.add(
            'btn-concluir',
            'text-green-600',
            'hover:text-green-500',
            'transition',
            'duration-300'
        );

        botao.innerHTML = `
            <i class="fa-solid fa-square-check text-2xl"></i>
        `;

        botao.addEventListener('click', () => {
            concluirTarefa(tarefa.id);
        });

        artigo.appendChild(titulo);
        artigo.appendChild(botao);

        listaTarefas.appendChild(artigo);
    });
}


async function concluirTarefa(id) {
    try {
        const response = await fetch(`${API_URL}/task/${id}`, {
            method: 'PATCH',
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.erro);
            return;
        }

        modalTarefaConcluida.classList.remove('hidden');

        await carregarTarefasPendentes();

    } catch (error) {
        console.error('Erro ao concluir tarefa:', error);

        alert('Erro ao conectar com o servidor.');
    }
}


btnFecharTarefaConcluida.addEventListener('click', () => {
    modalTarefaConcluida.classList.add('hidden');
});


async function iniciarPagina() {
    const autenticado = await verificarSessao();

    if (!autenticado) {
        return;
    }

    await carregarTarefasPendentes();
}


iniciarPagina();