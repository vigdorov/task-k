import Component from '../../classes/Component';
import {createElement} from '../../utils';

const CN = {
    BUTTON: 'IconButton',
    FA: 'fa',
};

class IconButton extends Component {
    constructor(iconClass, parent) {
        super();

        const button = createElement('button', CN.BUTTON, parent);

        const iconClassNames = `${CN.FA} ${iconClass}`;
        const icon = createElement('i', iconClassNames, button);
        icon.setAttribute('aria-hidden', 'true');

        button.addEventListener('click', event => {
            this.emit('click', event);
        });
    }
}

export default IconButton;
