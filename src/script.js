// Объект Модального окна
const modalWindow = {
    mainDiv: document.getElementById('modal-window'),
    closeButton: document.getElementById('modal-close-button'),
    saveButton: document.getElementById('modal-save-button'),
    isOpen: function() {
        return this.mainDiv.style.display === 'flex';
    },
    showWindow: function() {
        this.mainDiv.style.display = 'flex';
    },
    closeWindow: function() {
        this.mainDiv.style.display = 'none';
    }
};

modalWindow.mainDiv.addEventListener('click', (event) => {
    const isMainDiv = event.target.getAttribute('id') === 'modal-window';
    if (modalWindow.isOpen() && isMainDiv) {
        modalWindow.closeWindow();
    }
});

modalWindow.closeButton.addEventListener('click', () => modalWindow.closeWindow());



// Форма модального окна
const modalForm = document.getElementById('modal-form');
modalForm.addEventListener('submit', (event) => {
    event.preventDefault();

    modalWindow.closeWindow();
});

// Кнопка добавления задачи
const addTaskButton = document.getElementById('add-task-button');
addTaskButton.addEventListener('click', () => modalWindow.showWindow());

