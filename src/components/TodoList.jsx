import React, { Component } from "react";
import TodoContext from "../store/TodoContext";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

export default class TodoList extends Component {
  static contextType = TodoContext;
  render() {
    return (
      <div>
        <ul className={styles.list}>
          {this.context.todos.map((task) => {
            return <TodoItem key={task.id} {...task} />;
          })}
        </ul>
      </div>
    );
  }
}
