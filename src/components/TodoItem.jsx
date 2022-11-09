import React, { Component } from "react";
import TodoContext from "../store/TodoContext";
import styles from "./TodoItem.module.css";

export default class TodoItem extends Component {
  static contextType = TodoContext;

  constructor(props) {
    super(props);
    this.state = {
      editTask: true,
      task: props.task,
      date: props.date,
    };
  }

  toggleTodoHandler() {
    this.setState({
      editTask: !this.state.editTask,
      task: this.state.task,
    });
  }

  render() {
    const { task, date, id, completed } = this.props;
    const { removeTodo, completedTodo, editTodo } = this.context;
    return (
      <li className={styles.task_block}>
        {this.state.editTask ? (
          <>
            <span className={`${styles.text} ${completed && styles.done}`}>
              {task}
            </span>
            <span>{date}</span>
            <label className={styles.container}>
              <input
                type="checkbox"
                checked={completed}
                onChange={() => completedTodo(id)}
              />
              <div className={styles.checkmark}></div>
            </label>
            <div className={styles.main}>
              <button className={styles.btn} onClick={() => removeTodo(id)}>
                DELETE
              </button>
              <button
                className={styles.btn}
                onClick={this.toggleTodoHandler.bind(this)}
              >
                EDIT
              </button>
            </div>
          </>
        ) : (
          <>
            <label htmlFor="" className={styles.editTask}>
              <input
                type="text"
                className={styles.text}
                value={this.state.task}
                onChange={(e) =>
                  this.setState({
                    task: e.target.value,
                  })
                }
              />
              <input
                type="date"
                className={styles.text}
                value={this.state.date}
                onChange={(e) =>
                  this.setState({
                    date: e.target.value,
                  })
                }
              />
            </label>
            <button
              className={styles.btn}
              onClick={() => {
                editTodo(id, this.state.task, this.state.date);
                this.setState({
                  editTask: true,
                });
              }}
            >
              SAVE
            </button>
            <button
              className={styles.btn}
              onClick={this.toggleTodoHandler.bind(this)}
            >
              CANCEL
            </button>
          </>
        )}
      </li>
    );
  }
}
