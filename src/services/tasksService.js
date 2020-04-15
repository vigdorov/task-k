import tasksApi from '../api/tasksAPI';
import storeService from './storeService';
import {FORM_STATUS} from '../consts';
import notifyService from './notifyService';
import {generateId} from '../utils';

class TasksService {
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
                        notifyService.successNotify('Задача создана');
                        return dataWithId;
                    })
                    .catch(error => notifyService.dangerNotify(error));
            }
            case FORM_STATUS.EDIT: {
                const dataWithId = {
                    ...data,
                    id: storeService.getEditTaskId(),
                };
                return tasksApi.update(dataWithId)
                    .then(() => {
                        notifyService.successNotify('Задача обновлена');
                        return dataWithId;
                    })
                    .catch(error => notifyService.dangerNotify(error));
            }
        }
    }

    removeTask(id) {
        return tasksApi.remove(id)
            .then(() => {
                notifyService.successNotify('Задача удалена');
            })
            .catch(error => notifyService.dangerNotify(error));
    }
}

const tasksService = new TasksService();

export default tasksService;
