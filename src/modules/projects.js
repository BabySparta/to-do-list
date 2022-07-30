import { isToday, startOfToday, toDate } from "date-fns";

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
        const tasksToday = this.tasks.filter((task) => {console.log(new Date(toDate())); isToday(new Date(2022, 7, 30)) === true})
        console.log(isToday(new Date()))
        return tasksToday;
    }
}