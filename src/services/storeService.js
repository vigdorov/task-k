import Store from '../classes/Store';
import {FORM_STATUS, STORE_KEYS} from '../consts';

const INIT_STORE = {
    [STORE_KEYS.FORM_STATUS]: FORM_STATUS.CREATE,
    [STORE_KEYS.EDIT_TASK_ID]: null,
};

const store = new Store(INIT_STORE);

export default Object.assign(store, {
    setCreateForm: function() {
        this.set(STORE_KEYS.FORM_STATUS, FORM_STATUS.CREATE);
        this.set(STORE_KEYS.EDIT_TASK_ID, null);
    },
    setEditForm: function(id) {
        this.set(STORE_KEYS.FORM_STATUS, FORM_STATUS.EDIT);
        this.set(STORE_KEYS.EDIT_TASK_ID, id)
    },
    getFormStatus: function() {
        return this.get(STORE_KEYS.FORM_STATUS);
    },
    getEditTaskId: function() {
        return this.get(STORE_KEYS.EDIT_TASK_ID);
    }
});
