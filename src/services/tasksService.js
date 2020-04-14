import tasksApi from '../api/tasksAPI';
import storeService from './storeService';
import {FORM_STATUS} from '../consts';

class TaskService {
    loadTasksList() {
        return tasksApi.request();
    }

    createOrUpdateTask(data, status) {
        switch (status) {
            case FORM_STATUS.CREATE: {
                const dataWithId = {
                    ...data,
                    id: generateId(),
                };
                return tasksApi.create(dataWithId)
                    .then(() => {
                        taskList.addTask(dataWithId);
                    });
            }
            case FORM_STATUS.EDIT: {
                const dataWithId = {
                    ...data,
                    id: storeService.getEditTaskId(),
                };
                return tasksApi.update(dataWithId)
                    .then(() => {
                        taskList.updateTask(dataWithId);
                    });
            }
        }
    }

    removeTask(id) {
        return tasksApi.remove(id);
    }
}

const taskService = new TaskService();

export default taskService;
