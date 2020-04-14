import Modal from './components/modal/Modal';
import AddTaskButton from './components/add-task-button/AddTaskButton';
import FormModal from './components/form-modal/FormModal';
import TaskList from './components/tasks-list/TasksList';

import './app.css';
import storeService from './services/storeService';
import {FORM_STATUS} from './consts';
import tasksService from './services/tasksService';
import {generateId} from './utils';

const taskList = new TaskList();
const modal = new Modal();
const addTaskButton = new AddTaskButton();
const formModal = new FormModal();

const createOrUpdate = (data, status) => {
    switch (status) {
        case FORM_STATUS.CREATE: {
            const dataWithId = {
                ...data,
                id: generateId(),
            };
            return tasksService.create(dataWithId)
                .then(() => {
                    taskList.addTask(dataWithId);
                });
        }
        case FORM_STATUS.EDIT: {
            const dataWithId = {
                ...data,
                id: storeService.getEditTaskId(),
            };
            return tasksService.update(dataWithId)
                .then(() => {
                    taskList.updateTask(dataWithId);
                });
        }
    }
    throw new Error(`Не обработанный status - "${status}"`);
}

modal
    .on('hide', () => {
        formModal.clearForm();
    });

addTaskButton
    .on('click', () => {
        storeService.setCreateForm();
        modal.show();
    });

formModal
    .on('submit', data => {
        const status = storeService.getFormStatus();
        createOrUpdate(data, status)
            .then(() => {
                modal.hide();
                storeService.setCreateForm();
            });
    })
    .on('closeForm', () => {
        modal.hide();
    });

taskList
    .on('editTask', taskInfo => {
        formModal.put(taskInfo);
        storeService.setEditForm(taskInfo.id);
        modal.show();
    })
    .on('removeTask', taskInfo => {
        tasksService.remove(taskInfo.id);
    });
