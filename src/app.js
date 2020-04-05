import {modalWindow} from './components/modal/Modal';

import './app.css';

// Форма модального окна
const modalForm = document.getElementById('modalForm');
modalForm.addEventListener('submit', (event) => {
    event.preventDefault();

    modalWindow.closeWindow();
});

// Кнопка добавления задачи
const addTaskButton = document.getElementById('addTaskButton');
addTaskButton.addEventListener('click', () => modalWindow.showWindow());