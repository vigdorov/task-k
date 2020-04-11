import Component from '../../classes/Component';

const CN = {
    BUTTON: 'AddTaskButton',
};

class AddTaskButton extends Component {
    constructor() {
        super();

        const button = document.querySelector(`.${CN.BUTTON}`);

        button.addEventListener('click', event => {
            this.emit('click', event);
        });
    }
}

export default AddTaskButton;
