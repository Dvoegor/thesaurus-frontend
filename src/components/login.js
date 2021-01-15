import React from "react";
import axios from "axios";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
// import { Redirect } from "react-router-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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

    const email = this.state.email;
    const password = this.state.password;

    axios({
      method: "post",
      url: "http://localhost:3000/login",
      data: {
        email: email,
        password: password,
      },
    }).then(function (response) {
      if (response.data) {
        document.cookie = "success=true"
        // <Redirect exact to="/" />;
        window.location = "/"
      } else {
        ToastsStore.error("Неверные данные");
      }
      //   console.log(response.data);
      //   document.cookie = `success=true`
    });
  };

  render() {
    if (document.cookie === `success=true`) {

      // <Redirect exact to="/" />;
      window.location = "/"
    } else {
      return (
        <div class="container mt-md-5 col-8">
          <form onSubmit={this.mySubmitHandler}>
            <div class="form-group">
              <label for="email">
                Email:
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Введите E-mail"
                  required
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div class="form-group">
              <label>
                Пароль:
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  id="password"
                  placeholder="Пароль"
                  required
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <button type="submit" class="btn btn-success btn-lg btn-block">
              Войти
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
