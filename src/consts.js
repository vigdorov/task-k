export const STORE_KEYS = {
    FORM_STATUS: 'FORM_STATUS',
    EDIT_TASK_ID: 'EDIT_TASK_ID',
};

export const FORM_STATUS = {
    CREATE: 'CREATE',
    EDIT: 'EDIT',
};

export const FORM_TITLE = {
    [FORM_STATUS.CREATE]: 'Создание новой задачи',
    [FORM_STATUS.EDIT]: 'Редактирование задачи',
};

export const STATUSES = {
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING',
    DANGER: 'DANGER',
};
