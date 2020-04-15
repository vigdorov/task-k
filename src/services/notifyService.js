import NotifyMessage from '../components/notify/NotifyMessage';
import {STATUSES} from '../consts';

class NotifyService {
    constructor() {
        const showNotify = (message, status) => {
            new NotifyMessage(message, status);
        };

        this.successNotify = function(message) {
            showNotify(message, STATUSES.SUCCESS);
        };

        this.warningNotify = function(message) {
            showNotify(message, STATUSES.WARNING);
            console.warn(message);
        };

        this.dangerNotify = function(message) {
            showNotify(message, STATUSES.DANGER);
            console.error(message);
        };

        this.secondaryNotify = function(message) {
            showNotify(message);
        };
    }
}

const notifyService = new NotifyService();

export default notifyService;