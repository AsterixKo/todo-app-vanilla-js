import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementIDs = {
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
};
/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
  };

  //Cuando la función App() se llama
  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // Referencias HTML
  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUL = document.querySelector(ElementIDs.TodoList);

  //Listeners
  newDescriptionInput.addEventListener('keyup', (event) => {
    // console.log(event);
    // console.log(event.target);
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value.trim());
    displayTodos();
    event.target.value = '';
  });

  todoListUL.addEventListener('click', (event) => {
    // console.log(event.target);

    const element = event.target.closest('[data-id]');
    // console.log(element);
    // console.log(element.getAttribute('data-id'));
    todoStore.toggleTodo(element.getAttribute('data-id'));
    displayTodos();
  });

  todoListUL.addEventListener('click', (event) => {
    // console.log(event);
    // console.log(event.target);
    if (
      event.target.tagName === 'BUTTON' &&
      event.target.classList.contains('destroy')
    ) {
      console.log('is destroy');
      const element = event.target.closest('[data-id]');
      // console.log(element);
      // console.log(element.getAttribute('data-id'));
      todoStore.deleteTodo(element.getAttribute('data-id'));
      displayTodos();
    }
  });
};
