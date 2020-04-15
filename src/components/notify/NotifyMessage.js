import Component from '../../classes/Component';
import {createElement} from '../../utils';
import {STATUSES} from '../../consts';
import IconButton from '../icon-button/IconButton';

const CN = {
    CONTAINER: 'Notify',
    MESSAGE: 'Notify__message',
    TEXT: 'Notify__text',
    CROSS: 'Notify__cross fa-times',
    [STATUSES.SUCCESS]: 'Notify__message_success',
    [STATUSES.WARNING]: 'Notify__message_warning',
    [STATUSES.DANGER]: 'Notify__message_danger',
};

class NotifyMessage extends Component {
    constructor(message, status = '') {
        super();

        const container = document.querySelector(`.${CN.CONTAINER}`);

        const typedClass = status ? CN[status] : '';

        const notify = createElement('div', `${CN.MESSAGE} ${typedClass}`, container);
        const text = createElement('span', CN.TEXT, notify);
        const cross = new IconButton(CN.CROSS, notify);

        text.textContent = message;

        const removeMessage = () => {
            container.removeChild(notify);
        };

        const timeout = setTimeout(removeMessage, 3000);

        cross.on('click', () => {
            clearTimeout(timeout);
            removeMessage();
        });        
    }
}

export default NotifyMessage;
