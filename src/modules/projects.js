import { isThisWeek, toDate} from "date-fns";

export default class project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    setName(name) {
        this.name = name
    }

    getName() {
        return this.name
    }

    setTasks(tasks) {
        this.tasks = tasks
    }

    getTasks() {
        return this.tasks
    }

    addTask(newTask) {
        if (this.tasks.find((task) => task.getName() === newTask)) {return}
        else {this.tasks.push(newTask)};
    }

    deleteTask(delTask) {
        this.tasks = this.tasks.filter((task) => task.getName() !== delTask)
    }

    getTasksToday() {
        const todayForm = new Date().toLocaleDateString();
        const todayArray = todayForm.split('/');
        const month = todayArray[0];
        const day = todayArray[1];
        const year = todayArray[2];
        let todayFormatted = year + '-' + month + '-' + day;
        if (parseInt(month) < 10) {todayFormatted = year + '-0' + month + '-' + day}
            const tasksToday = this.tasks.filter((task) => task.getDate() === todayFormatted)
            return tasksToday;
    }

    getTasksWeek() {
        const tasksWeek = this.tasks.filter((task) => isThisWeek(toDate(new Date(task.getDate()))))
        return tasksWeek;
    }

    getTasksImportant() {
        const tasksImportant = this.tasks.filter((task) => task.getPriority() === 'High');
        return tasksImportant
    }
}