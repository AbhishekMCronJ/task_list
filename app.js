let input = document.getElementById('input-feild');
let submit = document.getElementById('button');
let show = document.getElementById('show-tasks');
const taskList = document.querySelector('.list-group');


submit.addEventListener('click', addTask);


document.addEventListener('DOMContentLoaded', getTasks);

function addTask(e) {

    if (input.value === '') {
        alert('Add a task')
    } else {

        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(input.value));
        show.appendChild(li);

        const link = document.createElement('a');
        link.className = 'delete-item float-right';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        storeLS(input.value);
    }
    e.preventDefault();
}

function storeLS(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(task));
        show.appendChild(li);
        const link = document.createElement('a');
        link.className = 'delete-item float-right';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
    })
}

taskList.addEventListener('click', removeTask);


function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        console.log(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();

        removeTaskLS(e.target.parentElement.parentElement);
    }
}

function removeTaskLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);

        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}