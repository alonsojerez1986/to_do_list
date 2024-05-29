let idCounter = 0; // El contador de ID
const input = document.querySelector('input[type="text"]');
const list = document.getElementById('list');
const stats = document.getElementById('stats');
const header = document.querySelector(".header");
const corpse = document.querySelector("body");

window.addEventListener("load", function () {
    corpse.style.opacity = 1;
    header.style.position = "fixed";
    header.style.top = "0";
    window.scrollTo(0, 0);
    header.style.height = "20%";
});

// Cargar tareas desde localStorage al iniciar
document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks();
    actualizarStats();
});

// Añadir evento al formulario para añadir tareas
document.getElementById('userInput').addEventListener('submit', (event) => {
    event.preventDefault();
    addTask();
});

// Evento para manejar clicks en la lista
list.addEventListener("click", (event) => {
    if (event.srcElement.nodeName == "INPUT") {
        actualizarStats();
    } else if (event.srcElement.nodeName == "IMG") {
        let borrar = event.srcElement.parentNode;
        borrar.remove();
        saveTasks();
    }
    actualizarStats();
});

// Función para añadir tareas
function addTask() {
    idCounter++;
    if (input.value != "") {
        const newTaskHTML = `
        <div class="task-container" id="${idCounter}">
            <label>
                <input type="checkbox" id="done">
                ${input.value}
            </label>
            <img class="close-btn" src="img/cubo-de-basura.png">
        </div>`;
        list.insertAdjacentHTML('afterbegin', newTaskHTML); // Insertar al principio
        input.value = "";
        saveTasks();
        actualizarStats();
        list.scrollTop = 0; // Desplazarse al principio
    }
}

// Función para actualizar las estadísticas
function actualizarStats() {
    let checkbox = document.querySelectorAll('input[type="checkbox"]:checked');
    let listElement = list.querySelectorAll("div");
    stats.innerHTML = `<p>Tareas pendientes ${listElement.length - checkbox.length} | Tareas realizadas ${checkbox.length}</p>`;
}

// Función para guardar tareas en localStorage
function saveTasks() {
    let tasks = [];
    list.querySelectorAll('.task-container').forEach(task => {
        tasks.push({
            id: task.id,
            text: task.querySelector('label').innerText,
            done: task.querySelector('input[type="checkbox"]').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar tareas desde localStorage
function loadTasks() {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
        tasks.reverse().forEach(task => { // Invertir el orden para añadir desde el principio
            const taskHTML = `
            <div class="task-container" id="${task.id}">
                <label>
                    <input type="checkbox" id="done" ${task.done ? 'checked' : ''}>
                    ${task.text}
                </label>
                <img class="close-btn" src="img/cubo-de-basura.png">
            </div>`;
            list.insertAdjacentHTML('afterbegin', taskHTML);
        });
    }
}

// Generar y mostrar la fecha actual
let fechaActual = new Date();
let fechaElemento = document.getElementById("fecha");
let formatoFecha = (fechaActual.getDate() < 10 ? '0' : '') + fechaActual.getDate() + '/' + (fechaActual.getMonth() < 10 ? '0' : '') + (fechaActual.getMonth() + 1) + "/" + fechaActual.getFullYear();
fechaElemento.innerHTML = "Fecha: " + formatoFecha;
