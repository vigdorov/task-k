export const createElement = (tag, className, parent) => {
    const element = document.createElement(tag);
    element.className = className;
    parent.appendChild(element);
    return element;
}

export const isEmpty = (value) => {
    switch (value) {
        case undefined:
        case null:
        case '':
            return true;
    }

    switch (typeof value) {
        case 'number':
            if (isNaN(value)) {
                return true;
            }
            return false;
        default:
            return !Object.values(value).length;
    }
};

export const cloneDeep = variable => {
    if (Array.isArray(variable)) {
        return variable.map(cloneDeep);
    }

    if (typeof variable === 'object' && variable !== null) {
        return Object.keys(variable).reduce((memo, key) => {
            return {
                ...memo,
                [key]: cloneDeep(variable[key]),
            };
        }, {});
    }

    return variable;
};

export const prepareDate = date => {
    const [year, month, day] = date.split('-');
    return [day, month, year].join('.')
}
