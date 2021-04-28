import {TodoListModel} from "./model/TodoListModel.js";
import {TodoItemModel} from "./model/TodoItemModel.js";
import {TodoListView} from "./view/TodoListView.js";
import {render} from "./view/html-util.js";

export class App {
  constructor() {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();
  }

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
      this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{ id:number, completed: boolean }}
   */
  handleUpdate({ id, completed }) {
      this.todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  handleDelete({ id }) {
      this.todoListModel.deleteTodo({ id });
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    //TodoListModelの状態が更新されたらひょうじを更新
    this.todoListModel.onChange(() => {
      const todoItems = this.todoListModel.getTodoItems();
      //todoItemsに対するTodoListViewをさくせい
      const todoListElement = this.todoListView.createElement(todoItems,{
        //Todoアイテムが更新イベントを発生したときに呼ばれるリスナー関数
        onUpdateTodo: ({id, completed}) => {
          this.handleUpdate({ id, completed});
        },
        //Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
        onDeleteTodo: ({ id }) => {
          this.handleDelete({id});
        }
      });
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        this.handleAdd(inputElement.value);
        inputElement.value = "";
    });
  }
}
