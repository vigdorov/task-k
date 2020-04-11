export default class Component {
    constructor() {
        const events = {};

        this.on = function (eventName, listener) {
            if (!events[eventName]) {
                events[eventName] = [];
            }
            events[eventName].push(listener);

            return this;
        };

        this.emit = function (eventName, ...props) {
            const listeners = events[eventName] || [];
            listeners.forEach(listener => listener(...props));

            return this;
        };
    }
}
