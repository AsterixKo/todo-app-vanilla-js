import './style.css';
import {App} from './src/todos/app.js';
import todoStore from './src/store/todo.store';

todoStore.initStore();

App('#app');
