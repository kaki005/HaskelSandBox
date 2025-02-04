import TodoTask from "./TodoTask";
import TodoTasks from "./TodoTask";


type parseSubject = {
        name : string,
        date : string,
        finished : boolean,
}
const STORAGE_NAME = "Tasks";

class JsonManager {
    
    public SaveTasks (taskList: TodoTasks[]) {
        // eslint-disable-next-line
        let json = JSON.stringify(
            taskList.map(task => {
                return {
                    name : task.Name(),
                    date : task.Date().toLocaleDateString(),
                    finished : task.IsChecked(),
                }
            })
        );
        localStorage.setItem(STORAGE_NAME, json);
    }
    
    public GetTasks() : TodoTasks[] {
        var json:string = localStorage.getItem(STORAGE_NAME) ?? "null";
        var taskList = JSON.parse(json) as parseSubject[];
        if(taskList == null) { return new Array<TodoTask>(); }
        return taskList.map(task => new TodoTask(task.name, task.finished, new Date(task.date)));
    }
}

export default JsonManager;