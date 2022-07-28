import project from "./projects";
import task from "./task";

/* Modal */

const addBtn = document.querySelector('.newTask');
const modal = document.querySelector(".modal");
const span = document.querySelector(".close");
const form = document.querySelector('.modalForm');

addBtn.onclick = function() {
    form.reset();
    modal.style.display = "block"
}

span.onclick = function() {
    modal.style.display = "none";
}
  
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* Projects */

let projects = [];

const all = new project('all');
const today = new project('today');
const upcoming = new project('upcoming');
const important = new project('important');

projects.push(all);
projects.push(today);
projects.push(upcoming);
projects.push(important);

let currentProject = all;

/* Set Project */

const allBtn = document.querySelector('#all');
allBtn.addEventListener('click', () => {
    allBtn.classList.remove('active');
    upcomingBtn.classList.remove('active');
    todayBtn.classList.remove('active');
    importantBtn.classList.remove('active');

    allBtn.classList.add('active');
    currentProject = all;
    document.querySelector('.newTask').style.display = 'flex'
})

const todayBtn = document.querySelector('#today');
todayBtn.addEventListener('click', () => {
    allBtn.classList.remove('active');
    upcomingBtn.classList.remove('active');
    todayBtn.classList.remove('active');
    importantBtn.classList.remove('active');

    todayBtn.classList.add('active');
    currentProject = today;
    document.querySelector('.newTask').style.display = 'none'
})

const upcomingBtn = document.querySelector('#upcoming');
upcomingBtn.addEventListener('click', () => {
    allBtn.classList.remove('active');
    upcomingBtn.classList.remove('active');
    todayBtn.classList.remove('active');
    importantBtn.classList.remove('active');

    upcomingBtn.classList.add('active');
    currentProject = upcoming;
    document.querySelector('.newTask').style.display = 'none'
})

const importantBtn = document.querySelector('#important');
importantBtn.addEventListener('click', () => {
    allBtn.classList.remove('active');
    upcomingBtn.classList.remove('active');
    todayBtn.classList.remove('active');
    importantBtn.classList.remove('active');

    importantBtn.classList.add('active');
    currentProject = important;
    document.querySelector('.newTask').style.display = 'none'
});

/* Add Task */

const taskForm = document.querySelector('.modalForm');

taskForm.onsubmit = function() {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const desc = document.querySelector('#desc').value;
    const date = document.querySelector('#due').value;
    const priority = document.querySelector('#urgent').value;

    const newTask = new task(name, desc, date, priority);
    currentProject.addTask(newTask);
    modal.style.display = "none";   
    console.log(currentProject);
    console.log(projects);
};

/* Add Project */

const addProject = document.querySelector('#addProject');

addProject.addEventListener('click', () => {
    document.querySelector('.projectModal').style.display = 'flex'
})

const projForm = document.querySelector('.projForm');

projForm.onsubmit = function() {
    event.preventDefault();

    const projName = document.querySelector('#projName').value;
    const newProject = new project(projName);
    projects.push(newProject);
    document.querySelector('.projectModal').style.display = 'none'
}