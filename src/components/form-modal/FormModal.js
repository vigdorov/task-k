import Component from '../../classes/Component';
import {isEmpty} from '../../utils';

const CN = {
    FORM: 'FormModal',
    CLOSE_BUTTON: 'IconButton',
    INPUT: 'FormField__input',
    ERROR: 'FormModal__error',
};

const getErrors = (inputsList) => {
    return inputsList.reduce((memo, {value, name}) => {
        if (isEmpty(value)) {
            return [
                ...memo,
                `Поле ${name} не заполнено!`,
            ]
        }

        return memo;
    }, []);
};

class FormModal extends Component {
    constructor() {
        super();

        const form = document.querySelector(`.${CN.FORM}`);
        const closeButton = form.querySelector(`.${CN.CLOSE_BUTTON}`);

        const inputsList = Object.values(form.querySelectorAll(`.${CN.INPUT}`));

        const errorSpan = form.querySelector(`.${CN.ERROR}`);

        const showError = message => {
            errorSpan.textContent = message;
        };

        inputsList.forEach(input => {
            input.addEventListener('focus', () => showError(''));
        });

        form.addEventListener('submit', event => {
            event.preventDefault();

            const errors = getErrors(inputsList);

            const data = inputsList.reduce((memo, {name, value}) => {
                return {
                    ...memo,
                    [name]: value,
                }
            }, {});

            if (isEmpty(errors)) {
                this.clearForm();
                this.emit('submit', data);
            } else {
                showError(errors.join('\n'));
            }
        });

        closeButton.addEventListener('click', () => {
            this.clearForm();
            this.emit('closeForm');
        });

        this.clearForm = function() {
            inputsList.forEach(input => {
                input.value = '';
            });
            showError('');
        };

        this.put = function(taskInfo) {
            inputsList.forEach(input => {
                input.value = taskInfo[input.name];
            });
        };
    }
}

export default FormModal;
