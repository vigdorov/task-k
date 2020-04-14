import Component from '../../classes/Component';
import Task from '../task/Task';
import tasksService from '../../services/tasksService';

const CN = {
    TASKS_LIST: 'TasksList',
};

class TasksList extends Component {
    constructor() {
        super();

        const container = document.querySelector(`.${CN.TASKS_LIST}`);

        const taskModels = [];

        const editTask = taskInfo => {
            this.emit('editTask', taskInfo);
        };

        const removeTask = taskInfo => {
            this.emit('removeTask', taskInfo);
        };

        const renderTask = function(taskInfo) {
            const task = new Task(taskInfo, container);
            taskModels.push(task);

            task.on('edit', editTask);

            task.on('remove', removeTask);
        };

        tasksService.loadTasksList().then(tasksList => {
            tasksList.forEach(taskInfo => {
                renderTask(taskInfo);
            });
        });

        this.addTask = function(taskInfo) {
            renderTask(taskInfo);
        };

        this.updateTask = function({id, ...taskInfo}) {
            const task = taskModels.find(task => task.getId() === id);
            if (task) {
                task.update(taskInfo);
            }
        };
    }
}

export default TasksList;
