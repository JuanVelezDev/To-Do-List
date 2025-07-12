
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const pendingCount = document.getElementById('pending-count');

// Recupera las tareas almacenadas en el Local Storage o inicializa un array vacío si no hay datos previos.
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTasks() {
    taskList.innerHTML = ''; // Limpia la lista antes de renderizar las tareas.
    let pending = 0; // Contador de tareas pendientes.

    // Itera sobre cada tarea en el array "tasks".
    tasks.forEach((task, index) => {
        const li = document.createElement('li'); // Crea un nuevo elemento <li> para cada tarea.
        li.className = task.completed ? 'completed' : ''; // Agrega la clase 'completed' si la tarea está completada.

        // Establece el contenido HTML del elemento <li>.
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="complete-btn">${task.completed ? 'Desmarcar' : 'Completar'}</button>
            <button class="delete-btn">Eliminar</button>
        `;

        // Asigna la funcionalidad del botón
        li.querySelector('.complete-btn').onclick = () => {
            tasks[index].completed = !tasks[index].completed; // Cambia el estado "completed" de la tarea.
            saveTasks(); // Guarda los cambios en el Local Storage.
            renderTasks(); // Vuelve a renderizar las tareas.
        };

        // Asigna la funcionalidad del botón "Eliminar".
        li.querySelector('.delete-btn').onclick = () => {
            tasks.splice(index, 1); // Elimina la tarea del array
            saveTasks(); // Actualiza el almacenamiento en el Local Storage.
            renderTasks(); // Vuelve a renderizar las tareas.
        };

        // Incrementa el contador de pendientes si la tarea no está completada.
        if (!task.completed) pending++;

        // Agrega el elemento <li> a la lista de tareas en el DOM.
        taskList.appendChild(li);
    });

    // Actualiza el contador de tareas pendientes en el DOM.
    pendingCount.textContent = pending;
}

// se agrega una nueva tarea
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        alert('No puedes agregar una tarea vacía.');
        return;
    }

    // Agrega una nueva tarea al array "tasks".
    tasks.push({ text, completed: false });

    saveTasks(); // Guarda la nueva tarea en el Local Storage.
    renderTasks(); // Renderiza la lista de tareas actualizada en el DOM.

    // Limpia el campo de entrada de texto y lo enfoca para una nueva tarea.
    taskInput.value = '';
    taskInput.focus();
}

// Asigna el evento "click" al botón de agregar tareas.
addTaskBtn.addEventListener('click', addTask);


taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

// Llama a la función para renderizar las tareas almacenadas al cargar la página.
renderTasks();