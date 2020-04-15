import Component from '../../classes/Component';

const CN = {
    MODAL: 'Modal',
    MODAL_SHOW: 'Modal_show',
};

class Modal extends Component {
    constructor() {
        super();

        const modal = document.querySelector(`.${CN.MODAL}`);

        this.isOpen = function() {
            return modal.classList.contains(CN.MODAL_SHOW);
        };

        this.show = function() {
            modal.classList.add(CN.MODAL_SHOW);
            this.emit('show');
        };

        this.hide = function() {
            modal.classList.remove(CN.MODAL_SHOW);
            this.emit('hide');
        };

        modal.addEventListener('click', event => {
            if (event.target === modal) {
                this.hide();
            }
        });
    }
}

export default Modal;
