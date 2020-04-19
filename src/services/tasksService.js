import localStorageApi from '../api/localStorageAPI';
import {isEmpty} from '../utils';

const ROUTE = 'TASKS_SERVICE_API';

const findTask = (tasksList, findId) => tasksList.find(task => task.id === findId);

class TasksService {
    // Возвращает полный список данных
    request() {
        return localStorageApi.get(ROUTE)
            .then(tasksList => isEmpty(tasksList) ? [] : tasksList);
    }

    // Возвращает один элемент по id
    find(id) {
        return this.request()
            .then(tasksList => {
                const task = findTask(tasksList, id);
                if (task) {
                    return task;
                }
                throw new Error(`Задача с id "${id}" не найдена`);
            });
    }

    // Создает таску
    create(taskInfo) {
        return this.request()
            .then(tasksList => {
                const task = findTask(tasksList, taskInfo.id);
                if (task) {
                    throw new Error(`Задача с id "${taskInfo.id}" уже создана`);
                }
                return localStorageApi.post(ROUTE, [
                    ...tasksList,
                    taskInfo,
                ]);
            });
    }

    // Обновление таски
    update(taskInfo) {
        return this.request()
            .then(tasksList => {
                const task = findTask(tasksList, taskInfo.id);
                if (task) {
                    return localStorageApi.post(ROUTE, tasksList.map(task => {
                        if (task.id === taskInfo.id) {
                            return taskInfo;
                        }
                        return task;
                    }));
                }
                throw new Error(`Задача с id "${taskInfo.id}" не найдена`);
            });
    }

    // Удаление таски
    remove(id) {
        return this.request()
            .then(tasksList => {
                const task = findTask(tasksList, id);
                if (task) {
                    return localStorageApi.post(ROUTE, [
                        ...tasksList.filter(task => task.id !== id),
                    ]);
                }
                throw new Error(`Задача с id "${id}" не найдена`);
            });
    }
}

const tasksService = new TasksService();

export default tasksService;