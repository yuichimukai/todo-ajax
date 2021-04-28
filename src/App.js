import {element} from "./view/html-util.js";

export class App {
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    //Todoアイテム数
    let todoItemCount = 0;
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      //Todoアイテムの要素を作成する
      const todoItemElement = element`<li>${inputElement.value}</li>`;
      //Todoアイテムをcontainerに追加
      containerElement.appendChild(todoItemElement);
      //Todoアイテム数を+1し、表示されているテキストの更新
      todoItemCount +=1
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
      //入力欄を空文字列にしてリセット
      inputElement.value = "";
    });
  }
}
