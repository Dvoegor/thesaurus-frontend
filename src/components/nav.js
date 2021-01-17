import React from "react";
import Cookies from "js-cookie";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();

    Cookies.set("success", "false");
    Cookies.set("email", "");
    window.location = "/";
  };

  render() {
    if (Cookies.get("success") === "true") {
      return (
        <nav class="deep-purple lighten-4">
          <a class="clear" href="/" style={{ float: "left", marginLeft: 10 }}>
            <button
              class="btn waves-effect waves-light blue-grey darken-3"
              type="submit"
            >
              Главная
            </button>
          </a>
          <a
            class="clear"
            href="/about"
            style={{ float: "left", marginLeft: 10 }}
          >
            <button
              class="btn waves-effect waves-light light-green darken-4"
              type="submit"
            >
              О проекте
            </button>
          </a>
          <a
            class="clear logs"
            href="/admin"
            style={{ float: "left", marginLeft: 10 }}
          >
            <button
              class="btn waves-effect waves-light blue lighten-1"
              type="submit"
            >
              Панель администратора
            </button>
          </a>
          <a
            class="clear"
            href="/login"
            style={{ float: "right", marginRight: 10 }}
          >
            <form class="clear logs" onSubmit={this.mySubmitHandler}>
              <button
                class="btn waves-effect waves-light pink lighten-1"
                type="submit"
              >
                Выйти
              </button>
            </form>
          </a>
          <a
            class="clear logs"
            href="/"
            onclick="return false;"
            style={{ float: "right", marginRight: 10 }}
          >
            <button
              disabled
              class="btn waves-effect waves-light blue lighten-1"
              type="submit"
              style={{ borderRadius: 10 }}
            >
              {Cookies.get("email")}
            </button>
          </a>
        </nav>
      );
    } else {
      return (
        <nav class="deep-purple lighten-4">
          <a class="clear" href="/" style={{ float: "left", marginLeft: 10 }}>
            <button
              class="btn waves-effect waves-light blue-grey darken-3"
              type="submit"
            >
              Главная
            </button>
          </a>
          <a
            class="clear"
            href="/about"
            style={{ float: "left", marginLeft: 10 }}
          >
            <button
              class="btn waves-effect waves-light light-green darken-4"
              type="submit"
            >
              О проекте
            </button>
          </a>
          <a
            class="clear"
            href="/login"
            style={{ float: "right", marginRight: 10 }}
          >
            <button class="btn waves-effect waves-light green" type="submit">
              Войти
            </button>
          </a>
        </nav>
      );
    }
  }
}
