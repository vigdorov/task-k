import localStorageApi from '../api/localStorageAPI';

const path = 'API_TASKS';

class TasksAPI {
    request() {
        return localStorageApi.get(path);
    }

    create(data) {
        this.request().then(taskList => {
            taskList.push(data);
            localStorageApi.post(path, taskList);
        });
    }

    update(data) {
        this.request().then(taskList => {
            const index = taskList.findIndex(task => task.id === data.id);
            if (index > -1) {
                taskList.splice(index, 1, data);
                localStorageApi.post(path, taskList);
            }
        });
    }

    delete(data) {
        this.request().then(taskList => {
            const index = taskList.findIndex(task => task.id === data.id);
            if (index > -1) {
                taskList.splice(index, 1);
                localStorageApi.post(path, taskList);
            }
        });
    }
}

const tasksApi = new TasksAPI();

export default tasksApi;
