import Component from '../../classes/Component';
import {createElement, prepareDate, cloneDeep} from '../../utils';
import IconButton from '../icon-button/IconButton';

const CN = {
    TASK: 'Task',
    HEADER: 'Task__header',
    BODY: 'Task__body',
    FOOTER: 'Task__footer',
    TITLE: 'Task__title',
    CONTROLS: 'Task__controls',
    DESCRIPTION: 'Task__description',
    DATE: 'Task__date',
    EDIT_BUTTON: 'fa-pencil',
    REMOVE_BUTTON: 'fa-trash',
};

class Task extends Component {
    constructor(info, parent) {
        super();
        let taskInfo = {
            ...info,
        };
        const id = taskInfo.id;

        const task = createElement('div', CN.TASK, parent);
        const header = createElement('div', CN.HEADER, task);
        const body = createElement('div', CN.BODY, task);
        const footer = createElement('div', CN.FOOTER, task);

        const title = createElement('h2', CN.TITLE, header);
        title.textContent = taskInfo.title;

        const description = createElement('p', CN.DESCRIPTION, body);
        description.textContent = taskInfo.description;

        const date = createElement('span', CN.DATE, footer);
        date.textContent = prepareDate(taskInfo.date);

        const controls = createElement('div', CN.CONTROLS, header);
        const editButton = new IconButton(CN.EDIT_BUTTON, controls);
        const removeButton = new IconButton(CN.REMOVE_BUTTON, controls);

        editButton.on('click', () => {
            this.emit('edit', taskInfo);
        });

        removeButton.on('click', () => {
            parent.removeChild(task);
            this.emit('remove', taskInfo);
        });

        this.update = function(info) {
            taskInfo = {
                ...taskInfo,
                ...info,
            };
            title.textContent = taskInfo.title;
            description.textContent = taskInfo.description;
            date.textContent = prepareDate(taskInfo.date);
        };

        this.getId = function() {
            return id;
        }
    }
}

export default Task;
