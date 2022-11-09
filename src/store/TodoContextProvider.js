import React, { Component } from "react";
import TodoContext from "./TodoContext";

export default class TodoContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  addTodoHandler(todo = {}) {
    this.setState((prevState) => ({
      ...prevState,
      todos: [...prevState.todos, todo],
    }));
  }
  removeTodoHandler(todoId) {
    console.log(todoId);
    let newArr = [...this.state.todos].filter((todo) => todo.id !== todoId);
    this.setState({ todos: newArr });
  }
  completedTodoHandler(todoId) {
    let newArr = [...this.state.todos].map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({ todos: newArr });
  }

  editTodoHandler(id, editedTask, editedDate) {
    let newArr = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: editedTask, date: editedDate };
      }
      return todo;
    });
    this.setState({ todos: newArr });
  }

  componentDidMount() {
    const todosFromLS = JSON.parse(localStorage.getItem("todo"));
    this.setState({ todos: todosFromLS || [] });
  }
  componentDidUpdate(prevState, propsState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem("todo", JSON.stringify(this.state.todos));
    }
  }
  componentWillUnmount() {
    this.setState({
      todos: localStorage.getItem("todos"),
    });
  }

  render() {
    return (
      <div>
        <TodoContext.Provider
          value={{
            todos: this.state.todos,
            addTodo: this.addTodoHandler.bind(this),
            removeTodo: this.removeTodoHandler.bind(this),
            completedTodo: this.completedTodoHandler.bind(this),
            editTodo: this.editTodoHandler.bind(this),
          }}
        >
          {this.props.children}
        </TodoContext.Provider>
      </div>
    );
  }
}
