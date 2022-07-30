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

const inbox = new project('Inbox');
const today = new project('Today');
const upcoming = new project('Upcoming');
const important = new project('Important');

projects.push(inbox);
projects.push(today);
projects.push(upcoming);
projects.push(important);

let currentProject = inbox;

/* Set Project */

const inboxBtn = document.querySelector('#all');
inboxBtn.addEventListener('click', () => {
    addEvent(inbox, inboxBtn);
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
    document.querySelector('.tasks').textContent = '';
    const currTasks = currentProject.getTasks();
    currTasks.forEach((item) => displayTask(item.title, item.desc, item.dueDate, item.priority));
    const changeHeader = document.querySelector('.taskWrapTitle');
    changeHeader.textContent = currentProject.getName();
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
    newTask.setName(name);  
    currentProject.addTask(newTask);
    checkSpecial(date, newTask, priority);
    displayTask(name, desc, date, priority)
    modal.style.display = "none";   
};

const checkSpecial = (date, task, prio) => {
    const todayForm = new Date().toLocaleDateString();
    const todayArray = todayForm.split('/');
    const month = todayArray[0];
    const day = todayArray[1];
    const year = todayArray[2];
    let todayFormatted = year + '-' + month + '-' + day;
    if (parseInt(month) < 10) {todayFormatted = year + '-0' + month + '-' + day}
    console.log(today);
    console.log(date);
    if (date === todayFormatted) {today.addTask(task)}
    if (isDateInThisWeek(date)) {upcoming.addTask(task)}
    if (prio === 'High') {important.addTask(task)}
}

function isDateInThisWeek(date) {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();
  
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
  
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  }

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
    newProject.name = projName;
    appendProject(newProject, projName);
    const buttonElement = document.getElementById(projName.split(' ').join(''));
    buttonElement.addEventListener('click', () => {
        addEvent(newProject, buttonElement);  
    })
    appendProject(newProject, projName);
    console.log(projects);

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
 
    const taskTitle = document.createElement('div');
    taskTitle.classList.add('taskTitle');
    const taskDesc = document.createElement('div');
    taskDesc.classList.add('taskDesc');
    const taskDue = document.createElement('div');
    taskDue.classList.add('taskDue');
    const taskPriority = document.createElement('div');
    taskPriority.classList.add('taskPriority');
    const removeTask = document.createElement('button');
    removeTask.classList.add('taskRemove');
    removeTask.textContent = 'X';
    removeTask.addEventListener('click', () => {
        currentProject.deleteTask(title);
        taskBody.remove();
    })

    const formattedDate = date.split('-').join('/');

    taskTitle.textContent = title;
    taskDesc.textContent = desc;
    taskPriority.textContent = "Priority: " + priority;
    if (priority === 'Low') {taskPriority.style.textDecoration = "underline 3px solid green"}
    if (priority === 'Medium') {taskPriority.style.textDecoration = "underline 3px solid yellow"}
    if (priority === 'High') {taskPriority.style.textDecoration = "underline 3px solid red"}
    if (formattedDate === '') {taskDue.textContent = "Due On: Whenever"}
    else {taskDue.textContent = "Due On: " + formattedDate}


    const wrapper1 = document.createElement('div');
    wrapper1.classList.add('wrapperTask');
    wrapper1.appendChild(taskTitle);
    wrapper1.appendChild(removeTask);
    const wrapper2 = document.createElement('div');
    wrapper2.classList.add('wrapperTask');
    wrapper2.appendChild(taskDesc);
    const wrapper3 = document.createElement('div');
    wrapper3.classList.add('wrapperTask');
    wrapper3.appendChild(taskDue);
    wrapper3.appendChild(taskPriority);

    taskBody.appendChild(wrapper1);
    taskBody.appendChild(wrapper2);
    taskBody.appendChild(wrapper3);
}
