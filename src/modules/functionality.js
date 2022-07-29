import project from "./projects";
import task from "./task";

/* Modal */

const addBtn = document.querySelector('.newTask');
const modal = document.querySelector(".modal");
const span = document.querySelector(".close");
const form = document.querySelector('.modalForm');

const projModal = document.querySelector('.projectModal');
const projSpan = document.querySelector('.closeProj');

addBtn.onclick = function() {
    form.reset();
    modal.style.display = "block"
    projModal.style.display = 'none'
}

span.onclick = function() {
    modal.style.display = "none";
}

projSpan.onclick = function() {
    projModal.style.display = "none"
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
    addEvent(all, allBtn);
})

const todayBtn = document.querySelector('#today');
todayBtn.addEventListener('click', () => {
    addEvent(today, todayBtn);
    document.querySelector('.newTask').style.display = 'none'
})

const upcomingBtn = document.querySelector('#upcoming');
upcomingBtn.addEventListener('click', () => {
    addEvent(upcoming, upcomingBtn);
    document.querySelector('.newTask').style.display = 'none'
})

const importantBtn = document.querySelector('#important');
importantBtn.addEventListener('click', () => {
    addEvent(important, importantBtn);
    document.querySelector('.newTask').style.display = 'none';
});

const addEvent = (name, query) => {
    const allPro = document.querySelectorAll('.project');
    allPro.forEach((item) => {item.classList.remove('active')})

    query.classList.add('active');
    currentProject = name;
    document.querySelector('.newTask').style.display = 'flex';
    const currTasks = currentProject.getTasks();
    currTasks.forEach((item) => displayTask(item.title, item.desc, item.dueDate, item.priority))
}


/* Display project */

const displayProject = (name) => {
    const allProjects = document.querySelector('.projectsDisplay');

    const button = document.createElement('button');
    button.classList.add('btnCustom');
    button.classList.add('project');
    button.id = name.split(' ').join('');
    const text = document.createElement('div');
    text.classList.add('btnTxt');
    text.textContent = name;
    const remove = document.createElement('button');
    remove.textContent = 'X'
    remove.classList.add('remove');

    button.appendChild(text);
    button.appendChild(remove);
    allProjects.appendChild(button);

    remove.addEventListener('click', () => {
        const deleteProj = () => {
            const projText = remove.parentElement.firstChild
            const projToRemove = projects.find((proj) => proj.getName() === projText.textContent); 
                const index = projects.indexOf(projToRemove);
                if (index > -1) { 
                  projects.splice(index, 1);
                }
            
        }
        const delDOM = () => {
            remove.parentElement.remove();
        }
        deleteProj();
        delDOM();
    })
}

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
    
    displayTask(name, desc, date, priority)
    modal.style.display = "none";   
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
    appendProject(newProject, projName);
    const buttonElement = document.getElementById(projName.split(' ').join(''));
    buttonElement.addEventListener('click', () => {
        addEvent(projName, buttonElement);  
    })
    appendProject(newProject, projName);

    document.querySelector('.projectModal').style.display = 'none';
}

const appendProject = (newProject, projName) => {
    if (projects.find((proj) => proj.getName() === newProject.getName())) {return}
    else {projects.push(newProject); displayProject(projName);}
}

/* Display Tasks */

const displayTask = (title, desc, date, priority) => {
    const taskDiv = document.querySelector('.tasks');
    const taskBody = document.createElement('div');
    taskBody.classList.add('taskBody');
    taskDiv.appendChild(taskBody);
    taskBody.innerHTML = `
            <div class="wrapperTask">
                <div class="taskTitle"></div>
            </div>
            <div class="wrapperTask">
                <div class="taskDesc"></div>
            </div>
            <div class="wrapperTask">
                <input type="date" class="taskDue" id="due" value="2000-01-01">
            </div>
            <div class="wrapperTask">
                <div class="taskPriority"></div>
            </div>`
    const taskTitle = document.createElement('div');
    taskTitle.classList.add('taskTitle');
    const taskDesc = document.createElement('div');
    taskDesc.classList.add('taskDesc');
    const taskDue = document.createElement('input');
    taskDue.classList.add('taskDue');
    const taskPriority = document.createElement('div');
    taskPriority.classList.add('taskPriority');

    taskTitle.textContent = title;
    taskDesc.textContent = desc;
    taskPriority.textContent = priority;
    taskDue.value = date
}