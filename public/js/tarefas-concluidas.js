const API_URL = 'https://opusrun-backend.onrender.com';

const listaTarefas = document.getElementById('listaTarefas');
const totalConcluidas = document.getElementById('totalConcluidas');

const modalTarefaExcluida = document.getElementById('modalTarefaExcluida');
const btnFecharTarefaExcluida = document.getElementById('fecharTarefaExcluida');


async function verificarSessao() {
    try {
        const response = await fetch(`${API_URL}/me`, { method: 'GET', credentials: 'include' });

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


async function carregarTarefasConcluidas() {
    try {
        const response = await fetch(`${API_URL}/task`, { method: 'GET', credentials: 'include' });

        if (response.status === 401) {
            window.location.href = 'login.html';
            return;
        }

        const tarefas = await response.json();

        if (!response.ok) {
            console.error(tarefas.erro);
            return;
        }

        const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.status === 1);

        totalConcluidas.innerText = tarefasConcluidas.length;

        mostrarTarefasConcluidas(tarefasConcluidas);

    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);

        listaTarefas.innerHTML = `<p class="px-8 text-zinc-400">Erro ao carregar as tarefas.</p>`;
    }
}


function mostrarTarefasConcluidas(tarefas) {
    listaTarefas.innerHTML = '';

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = `<p class="px-8 text-zinc-400">Nenhuma tarefa concluída.</p>`;
        return;
    }

    tarefas.forEach((tarefa, index) => {
        const artigo = document.createElement('article');

        artigo.classList.add('flex', 'justify-between', 'px-8', 'items-center', 'py-4', 'border-b', 'border-zinc-800');

        if (index === tarefas.length - 1) {
            artigo.classList.remove('border-b');
        }

        const titulo = document.createElement('span');

        titulo.innerText = tarefa.titulo;

        const botao = document.createElement('button');

        botao.classList.add('text-red-600', 'hover:text-red-500', 'transition', 'duration-300');

        botao.innerHTML = `<i class="fa-solid fa-trash text-2xl"></i>`;

        botao.addEventListener('click', () => {
            excluirTarefa(tarefa.id);
        });

        artigo.appendChild(titulo);
        artigo.appendChild(botao);

        listaTarefas.appendChild(artigo);
    });
}


async function excluirTarefa(id) {
    try {
        const response = await fetch(`${API_URL}/task/${id}`, { method: 'DELETE', credentials: 'include' });

        const data = await response.json();

        if (!response.ok) {
            alert(data.erro);
            return;
        }

        modalTarefaExcluida.classList.remove('hidden');

        await carregarTarefasConcluidas();

    } catch (error) {
        console.error('Erro ao excluir tarefa:', error); 
        alert('Erro ao conectar com o servidor.');
    }
}


btnFecharTarefaExcluida.addEventListener('click', () => {
    modalTarefaExcluida.classList.add('hidden');
});


async function iniciarPagina() {
    const autenticado = await verificarSessao();

    if (!autenticado) {
        return;
    }

    await carregarTarefasConcluidas();
}


iniciarPagina();