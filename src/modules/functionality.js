import project from './projects';
import task from './task';

/* Modal */

const addBtn = document.querySelector('.newTask');
const modal = document.querySelector('.modal');
const span = document.querySelector('.close');
const form = document.querySelector('.modalForm');

const projModal = document.querySelector('.projectModal');
const projSpan = document.querySelector('.closeProj');

addBtn.onclick = function () {
  form.reset();
  modal.style.display = 'block';
  projModal.style.display = 'none';
};

span.onclick = function () {
  modal.style.display = 'none';
};

projSpan.onclick = function () {
  projModal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

/* Projects */

const projects = [];

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
});

const todayBtn = document.querySelector('#today');
todayBtn.addEventListener('click', () => {
  tasksForToday();
  addEvent(today, todayBtn);
  document.querySelector('.newTask').style.display = 'none';
});

const upcomingBtn = document.querySelector('#upcoming');
upcomingBtn.addEventListener('click', () => {
  tasksForWeek();
  addEvent(upcoming, upcomingBtn);
  document.querySelector('.newTask').style.display = 'none';
});

const importantBtn = document.querySelector('#important');
importantBtn.addEventListener('click', () => {
  tasksForImportant();
  addEvent(important, importantBtn);
  document.querySelector('.newTask').style.display = 'none';
});

const addEvent = (name, query) => {
  const allPro = document.querySelectorAll('.project');
  allPro.forEach((item) => {
    item.classList.remove('active');
  });

  query.classList.add('active');
  currentProject = name;
  document.querySelector('.newTask').style.display = 'flex';
  document.querySelector('.tasks').textContent = '';
  const currTasks = name.tasks;
  currTasks.forEach((item) => displayTask(item.title, item.desc, item.dueDate, item.priority));
  const changeHeader = document.querySelector('.taskWrapTitle');
  changeHeader.textContent = currentProject.name;
};

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
  remove.textContent = 'X';
  remove.classList.add('remove');

  button.appendChild(text);
  button.appendChild(remove);
  allProjects.appendChild(button);

  remove.addEventListener('click', () => {
    const deleteProj = () => {
      const projText = remove.parentElement.firstChild;
      const projToRemove = projects.find(
        (proj) => proj.name === projText.textContent,
      );
      const index = projects.indexOf(projToRemove);
      if (index > -1) {
        projects.splice(index, 1);
      }
    };
    const delDOM = () => {
      remove.parentElement.remove();
    };
    deleteProj();
    delDOM();
    saveProjects(projects);
  });
};

/* Add Task */

const taskForm = document.querySelector('.modalForm');

taskForm.onsubmit = function () {
  event.preventDefault();

  const name = document.querySelector('#name').value;
  const desc = document.querySelector('#desc').value;
  const date = document.querySelector('#due').value;
  const priority = document.querySelector('#urgent').value;

  const newTask = new task(name, desc, date, priority);
  newTask.name = name;
  if (currentProject.tasks.find((task) => task.name === newTask.name)) {
    alert('You can not have two tasks with identical names');
    return;
  }
  currentProject.tasks.push(newTask);
  displayTask(name, desc, date, priority);

  modal.style.display = 'none';
  saveProjects(projects);
};

/* Date Functions */

const tasksForToday = () => {
  today.tasks = [];
  projects.forEach((proj) => {
    if (proj === today || proj === upcoming || proj === important) {
      return;
    }
    const todayTasks = proj.getTasksToday();
    todayTasks.forEach((task) => {
      today.tasks.push(task);
    });
  });
};

const tasksForWeek = () => {
  upcoming.tasks = [];
  projects.forEach((proj) => {
    if (proj === today || proj === upcoming || proj === important) {
      return;
    }
    const weekTasks = proj.getTasksWeek();
    weekTasks.forEach((task) => {
      upcoming.tasks.push(task);
    });
  });
};

const tasksForImportant = () => {
  important.tasks = [];
  projects.forEach((proj) => {
    if (proj === today || proj === upcoming || proj === important) {
      return;
    }
    const importantTasks = proj.getTasksImportant();
    importantTasks.forEach((task) => {
      important.tasks.push(task);
    });
  });
};

/* Add Project */

const addProject = document.querySelector('#addProject');

addProject.addEventListener('click', () => {
  document.querySelector('.projectModal').style.display = 'flex';
});

const projForm = document.querySelector('.projForm');

projForm.onsubmit = function () {
  event.preventDefault();

  const projName = document.querySelector('#projName').value;
  const newProject = new project(projName);
  newProject.name = projName;
  appendProject(newProject, projName);
  const buttonElement = document.getElementById(projName.split(' ').join(''));
  buttonElement.addEventListener('click', () => {
    addEvent(newProject, buttonElement);
  });

  document.querySelector('.projectModal').style.display = 'none';
  saveProjects(projects);
};

const appendProject = (newProject, projName) => {
  if (projects.find((proj) => proj.name === newProject.name)) {
    alert('You can not have two Projects with identical names');
  } else {
    projects.push(newProject);
    displayProject(projName);
  }
};

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
  const editContainer = document.createElement('div');
  editContainer.classList.add('editContainer');
  const editTask = document.createElement('button');
  editTask.classList.add('editTask');
  editTask.addEventListener('click', () => {
    editTaskModal(title, desc, date, priority);
  });
  const editImg = document.createElement('img');
  editImg.classList.add('editImg');
  editImg.src = './imgFont/edit.png';
  editImg.alt = 'edit';
  const removeTask = document.createElement('button');
  removeTask.classList.add('taskRemove');
  removeTask.textContent = 'X';
  removeTask.addEventListener('click', () => {
    currentProject.tasks = currentProject.tasks.filter(
      (task) => task.name !== title,
    );
    taskBody.remove();
    saveProjects(projects);
  });
  const formattedDate = date.split('-').join('/');
  if (date.split('-') === undefined) {
    formattedDate = date;
  }

  taskTitle.textContent = title;
  taskDesc.textContent = desc;
  taskPriority.textContent = `Priority: ${priority}`;
  if (priority === 'Low') {
    taskPriority.style.textDecoration = 'underline 3px solid green';
  }
  if (priority === 'Medium') {
    taskPriority.style.textDecoration = 'underline 3px solid yellow';
  }
  if (priority === 'High') {
    taskPriority.style.textDecoration = 'underline 3px solid red';
  }
  if (formattedDate === '') {
    taskDue.textContent = 'Due On: Whenever';
  } else {
    taskDue.textContent = `Due On: ${formattedDate}`;
  }

  const wrapper1 = document.createElement('div');
  wrapper1.classList.add('wrapperTask');
  wrapper1.appendChild(taskTitle);
  wrapper1.appendChild(editContainer);
  editContainer.appendChild(editTask);
  editTask.appendChild(editImg);
  editContainer.appendChild(removeTask);
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
};

/* Edit Task */

const editTaskModal = (title, desc, date, priority) => {
  const editModal = document.querySelector('.editModal');
  editModal.style.display = 'block';
  projModal.style.display = 'none';

  const editName = document.querySelector('.editName');
  const editDesc = document.querySelector('.editDesc');
  const editDate = document.querySelector('.editDate');
  const editPrio = document.querySelector('.editPrio');

  editName.value = title;
  editDesc.value = desc;
  editDate.value = date;
  editPrio.value = priority;

  const editClose = document.querySelector('.editClose');
  editClose.addEventListener('click', () => {
    editModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === editModal) {
      editModal.style.display = 'none';
    }
  });

  const editForm = document.querySelector('.modalEditForm');
  editForm.onsubmit = function () {
    event.preventDefault();

    const name = document.querySelector('.editName').value;
    const desc = document.querySelector('.editDesc').value;
    const date = document.querySelector('.editDate').value;
    const priority = document.querySelector('.editPrio').value;

    const thisTask = currentProject.tasks.filter(
      (task) => task.name === title,
    )[0];
    thisTask.title = name;
    thisTask.desc = desc;
    thisTask.dueDate = date;
    thisTask.priority = priority;
    thisTask.name = name;

    const taskContainer = document.querySelector('.tasks');
    taskContainer.textContent = '';
    currentProject.tasks.forEach((task) => {
      displayTask(task.title, task.desc, task.dueDate, task.priority);
    });

    editModal.style.display = 'none';
    tasksForToday();
    tasksForWeek();
    tasksForImportant();
    saveProjects(projects);
  };
};

/* Local Storage */

const saveProjects = (array) => {
  localStorage.setItem('projects', JSON.stringify(array));
};

const displayStored = () => {
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  const inboxStored = storedProjects.filter((proj) => proj.name === 'Inbox')[0];
  inbox.setTasks(inboxStored.tasks);

  storedProjects.forEach((project) => {
    if (
      project.name !== 'Today'
      && project.name !== 'Upcoming'
      && project.name !== 'Important'
      && project.name !== 'Inbox'
    ) {
      displayProject(project.name);
      const nameFormatted = document.getElementById(
        project.name.split(' ').join(''),
      );
      nameFormatted.addEventListener('click', () => {
        addEvent(project, nameFormatted);
      });
    }
  });

  inboxStored.tasks.forEach((task) => {
    displayTask(task.title, task.desc, task.dueDate, task.priority);
  });
};

displayStored();

window.addEventListener('dragend', () => {});
