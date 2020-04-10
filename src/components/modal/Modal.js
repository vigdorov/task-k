export const modalWindow = {
    mainDiv: document.getElementById('modalWindow'),
    closeButton: document.getElementById('modalCloseButton'),
    saveButton: document.getElementById('modalSaveButton'),
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
    const isMainDiv = event.target.getAttribute('id') === 'modalWindow';
    if (modalWindow.isOpen() && isMainDiv) {
        modalWindow.closeWindow();
    }
});

modalWindow.closeButton.addEventListener('click', () => modalWindow.closeWindow());