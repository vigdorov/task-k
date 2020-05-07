import {FORM_STATUS} from '../consts';
import tasksApi from '../api/temp';

class TasksService {
    loadTasksList() {
        return tasksApi.request().then(taskList => {
            if (taskList) {
                return taskList;
            }
            return [];
        });
    }

    createOrUpdate(data, status) {
        if (status === FORM_STATUS.CREATE) {
            tasksApi.create(data);
        } else if (status === FORM_STATUS.EDIT) {
            tasksApi.update(data);
        }
    }
}

const tasksService = new TasksService();

export default tasksService;
