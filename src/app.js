import './app.css';

import Modal from './components/modal/Modal';
import AddTaskButton from './components/add-task-button/AddTaskButton';
import FormModal from './components/form-modal/FormModal';
import TaskList from './components/tasks-list/TasksList';

import storeService from './services/storeService';
import tasksService from './services/tasksService';

import {FORM_TITLE, FORM_STATUS} from './consts';

const taskList = new TaskList();
const modal = new Modal();
const addTaskButton = new AddTaskButton();
const formModal = new FormModal();

modal
    .on('hide', () => {
        formModal.clearForm();
    })
    .on('show', () => {
        const status = storeService.getFormStatus();
        const title = FORM_TITLE[status];
        formModal.setTitle(title);
    });

addTaskButton
    .on('click', () => {
        storeService.setCreateForm();
        modal.show();
    });

formModal
    .on('submit', data => {
        const status = storeService.getFormStatus();
        tasksService.createOrUpdateTask(data, status)
            .then((dataWithId) => {
                if (status === FORM_STATUS.CREATE) {
                    taskList.addTask(dataWithId);
                }
                if (status === FORM_STATUS.EDIT) {
                    taskList.updateTask(dataWithId);
                }
                
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
        tasksService.removeTask(taskInfo.id);
    });
