import React from "react";
import axios from "axios";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import configData from "./config.json";
// import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      method: "",
      subjectArea: "",
      function: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  mySubmitHandler = (event) => {
    event.preventDefault();

    axios({
      method: "POST",
      url: `${configData.DEVELOMPENT_URL}/create`,
      withCredentials: true,
      data: {
        question: this.state.question,
        answer: this.state.answer,
        method: this.state.method,
        subjectArea: this.state.subjectArea,
        function: this.state.function,
      },
    }).then(
      (result) => {
        ToastsStore.success("Запись создана");
      },
      (error) => {
        ToastsStore.error("Ошибка");
      }
    );
  };

  render() {
    if (Cookies.get("success") === "false") {
      window.location = "/";
    } else {
      return (
        <div class="container mt-md-5 col-10">
          <a href="/" class="badge badge-info">
            Вернуться
          </a>
          <h3>Создание</h3>
          <form class="left-align" onSubmit={this.mySubmitHandler}>
            <input type="hidden" name="id" value="{{row.id}}" />
            <div class="form-group">
              <label for="question">Формула смысла</label>
              <input
                type="text"
                name="question"
                class="form-control"
                id="question"
                onChange={this.handleInputChange}
                value={this.state.question}
              />
            </div>
            <div class="form-group">
              <label for="answer">Знак</label>
              <input
                type="text"
                name="answer"
                class="form-control"
                id="answer"
                onChange={this.handleInputChange}
                value={this.state.answer}
              />
            </div>
            <div class="form-group">
              <label for="function">Функция</label>
              <input
                type="text"
                name="function"
                class="form-control"
                id="function"
                onChange={this.handleInputChange}
                value={this.state.function}
              />
            </div>
            <div class="form-group">
              <label for="method">Способ</label>
              <input
                type="text"
                name="method"
                class="form-control"
                id="method"
                onChange={this.handleInputChange}
                value={this.state.method}
              />
            </div>
            <div class="form-group">
              <label for="subjectArea">Область</label>
              <input
                type="text"
                name="subjectArea"
                class="form-control"
                id="subjectArea"
                onChange={this.handleInputChange}
                value={this.state.subjectArea}
              />
            </div>
            <button type="submit" class="btn waves-effect waves-light blue">
              Создать
            </button>
          </form>
          <ToastsContainer
            style={{ position: "absolute" }}
            store={ToastsStore}
            position={ToastsContainerPosition.TOP_RIGHT}
          />
        </div>
      );
    }
  }
}
