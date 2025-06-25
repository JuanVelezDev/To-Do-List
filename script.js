const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const pendingCount = document.getElementById('pending-count');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    let pending = 0;
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="complete-btn">${task.completed ? 'Desmarcar' : 'Completar'}</button>
            <button class="delete-btn">Eliminar</button>
        `;
        // Completar
        li.querySelector('.complete-btn').onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };
        // Eliminar
        li.querySelector('.delete-btn').onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };
        if (!task.completed) pending++;
        taskList.appendChild(li);
    });
    pendingCount.textContent = pending;
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        alert('No puedes agregar una tarea vacía.');
        return;
    }
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

// Inicializar
renderTasks();
