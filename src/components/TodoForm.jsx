import React, { Component, Fragment } from "react";
import TodoContext from "../store/TodoContext";
import styles from "./TodoForm.module.css";

export default class TodoForm extends Component {
  static contextType = TodoContext;
  constructor(props) {
    super();
    this.state = {
      task: "",
      date: "",
    };
  }
  taskChangeHandler(e) {
    this.setState((prevState) => ({ ...prevState, task: e.target.value }));
  }
  dateChangeHandler(e) {
    this.setState((prevState) => ({ ...prevState, date: e.target.value }));
  }
  submitHandler(e) {
    e.preventDefault();
    if (this.state.task.trim().length === 0 || !this.state.date) {
      return alert("Please enter task");
    }
    const todoItem = {
      task: this.state.task,
      date: this.state.date,
      id: Math.random().toString(),
      completed: false,
    };
    this.context.addTodo(todoItem);
    this.setState({ task: "", date: "" });
  }
  render() {
    return (
      <Fragment>
        <h1 className={styles.title}>Todo App</h1>
        <form className={styles.form} onSubmit={this.submitHandler.bind(this)}>
          <input
            type="text"
            className={styles.input}
            onChange={this.taskChangeHandler.bind(this)}
            value={this.state.task}
          />
          <input
            type="date"
            className={styles.input}
            onChange={this.dateChangeHandler.bind(this)}
            value={this.state.date}
          />
          <button type="submit" className={styles.button}>
            Add
          </button>
        </form>
      </Fragment>
    );
  }
}
