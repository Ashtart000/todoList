// TODO LIST
const toDoList = document.querySelector('#todo-list');
const toDoForm = document.querySelector('#todo-form');
const toDoUl = document.querySelector('#todo-ul');

toDoForm.addEventListener('submit', toDoAdd);

function toDoAdd(event) {
    event.preventDefault();
    const li = document.createElement('li');
    li.classList.add('todo-li');
    const removeBtn = document.createElement('button');
    removeBtn.append('Видалити');
    const editBtn = document.createElement('button');
    editBtn.append('Редагувати');
    const task = document.querySelector('#task').value;
    
    li.append(task, removeBtn, editBtn);
    toDoUl.append(li);
    event.target.reset();

    removeBtn.addEventListener('click', removeTask);
    editBtn.addEventListener('click', editTask);
}

// toDoUl.addEventListener('click', removeTask);

function removeTask({target: {parentNode}}) {
    parentNode.remove();
}

function editTask({target, target: {parentNode}}) {
    const inputEdit = document.createElement('input');
    parentNode.append(inputEdit);
    inputEdit.focus();
    inputEdit.classList.add('edit-input');
    inputEdit.value = parentNode.childNodes[0].nodeValue;
    target.removeEventListener('click', editTask);
    target.textContent = 'Зберегти';
    // console.dir(target);
    target.addEventListener('click', saveTask);
}

function saveTask({target, target: {parentNode, nextSibling}}) {
    console.dir(target);
    parentNode.childNodes[0].nodeValue = nextSibling.value;
    nextSibling?.remove();
    target.textContent = 'Редагувати';
    target.removeEventListener('click', saveTask);
    target.addEventListener('click', editTask);
}