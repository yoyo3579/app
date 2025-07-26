let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) li.style.textDecoration = 'line-through';

    // Mark as complete
    li.onclick = () => {
      todos[idx].completed = !todos[idx].completed;
      saveAndRender();
    };

    // Delete
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = e => {
      e.stopPropagation();
      todos.splice(idx, 1);
      saveAndRender();
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, completed: false });
  input.value = '';
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

// Initial render on page load
renderTodos();
