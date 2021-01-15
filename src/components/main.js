import React from "react";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import configData from "./config.json";
import Cookies from 'js-cookie';

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      dbSize: 0,
      methods: [],
      subjectAreas: [],
      dbFoundRecords: 0,
      question: "",
      answer: "",
      method: "",
      subjectArea: "",
      sortBy: "",
      func: "",
      page: 1,
      pageCount: 0,
      pageArr: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);
  }

  componentDidMount() {
    console.log(document.cookie);
    axios({
      method: "get",
      url: configData.DEVELOMPENT_URL,
      params: {
        page: this.state.page,
      },
    })
      // .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data.records,
            dbSize: result.data.dbSize,
            methods: result.data.methods,
            subjectAreas: result.data.subjectAreas,
            dbFoundRecords: result.data.dbFoundRecords,
            pageCount: result.data.pageCount,
            pageArr: result.data.pageArr,
          });

          // for (let i = 0; i < this.state.pageCount; i++) {
          //   this.state.pageArr.push(i + 1);
          // }
          console.log(this.state.pageArr);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  clearHandler = (event) => {
    event.preventDefault();

    window.location = "/";
  };

  mySubmitHandler = (event) => {
    event.preventDefault();

    console.log(this.state);
    axios({
      method: "get",
      url: configData.DEVELOMPENT_URL,
      params: {
        question: this.state.question,
        answer: this.state.answer,
        method: this.state.method,
        subjectArea: this.state.subjectArea,
        sortBy: this.state.sortBy,
        func: this.state.func,
        page: this.state.page,
      },
    })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data.records,
            dbFoundRecords: result.data.dbFoundRecords,
            pageCount: result.data.pageCount,
            pageArr: result.data.pageArr,
          });
          console.log(this.state.pageArr);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  render() {
    const { error, isLoaded, items, pageArr } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div>
          <LoadingBar color="#f11946" progress={100} />
        </div>
      );
    } else {
      return (
        <div class="container">
          <h3 class="center">Просмотр базы данных фигур знания</h3>
          <blockquote class="left-align">
            База данных содержит{" "}
            <span style={{ fontWeight: "800" }}>{this.state.dbSize}</span> фигур
            знания.
            <br />
            Фигуры знания могут содержать неточности в значениях полей
            "Функция", "Способ" и "Область".
          </blockquote>
          <div class="row left-align">
            <form class="col s12" onSubmit={this.mySubmitHandler}>
              <div class="row">
                <div class="input-field col s7">
                  <input
                    placeholder="Введите формулу смысла"
                    id="question"
                    type="text"
                    class="validate"
                    name="question"
                    value={this.state.question}
                    onChange={this.handleInputChange}
                  />
                  {/* <label for="first_name">Формула смысла</label> */}
                </div>
                <div class="input-field col s5">
                  <input
                    placeholder="Введите знак"
                    id="answer"
                    type="text"
                    class="validate"
                    name="answer"
                    value={this.state.answer}
                    onChange={this.handleInputChange}
                  />
                  {/* <label for="first_name">Знак</label> */}
                </div>
              </div>
              <div class="row">
                <div class="col s6">
                  <label>Функция</label>
                  <p>
                    <label>
                      <input
                        name="func"
                        value="Рецепт"
                        id="Рецепт"
                        type="radio"
                        onChange={this.handleInputChange}
                      />
                      <span>Рецепт</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        name="func"
                        value="Ретушь"
                        id="Ретушь"
                        type="radio"
                        onChange={this.handleInputChange}
                      />
                      <span>Ретушь</span>
                    </label>
                  </p>
                </div>
                <div class="col s6">
                  <label>Сортировка</label>
                  <p>
                    <label>
                      <input
                        name="sortBy"
                        value="question"
                        type="radio"
                        id="questionSort"
                        onChange={this.handleInputChange}
                      />
                      <span>Формула смысла</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        name="sortBy"
                        value="answer"
                        type="radio"
                        id="answerSort"
                        onChange={this.handleInputChange}
                      />
                      <span>Знак</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        name="sortBy"
                        value="func"
                        type="radio"
                        id="funcSort"
                        onChange={this.handleInputChange}
                      />
                      <span>Функция</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        name="sortBy"
                        value="method"
                        type="radio"
                        id="methodSort"
                        onChange={this.handleInputChange}
                      />
                      <span>Способ</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        name="sortBy"
                        value="subjectArea"
                        type="radio"
                        id="subjectAreaSort"
                        onChange={this.handleInputChange}
                      />
                      <span>Область</span>
                    </label>
                  </p>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <label>
                      Способ:
                      <select
                        name="method"
                        style={{ display: "block" }}
                        onChange={this.handleInputChange}
                      >
                        <option value="" defaultValue>
                          Выберите способ
                        </option>
                        {this.state.methods.map((method) => {
                          return (
                            <option id={method} value={method}>
                              {method}
                            </option>
                          );
                        })}
                      </select>
                    </label>
                    {/* <h6 id="methodId"></h6> */}
                  </div>
                  <div class="input-field col s6">
                    <label>
                      Область:
                      <select
                        name="subjectArea"
                        style={{ display: "block" }}
                        onChange={this.handleInputChange}
                      >
                        <option value="" defaultValue>
                          Выберите область
                        </option>
                        {this.state.subjectAreas.map((area) => {
                          return (
                            <option id={area} value={area}>
                              {area}
                            </option>
                          );
                        })}
                      </select>
                    </label>
                    {/* <h6 id="subjectAreaId"></h6> */}
                  </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <button class="btn waves-effect waves-light" type="submit">
                  Применить
                  <i class="material-icons right">adjust</i>
                </button>
              </div>
              
              {/* <ul class="pagination">
    <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
    <li class="active"><a href="#!">1</a></li>
    <li class="waves-effect"><a href="#!">2</a></li>
    <li class="waves-effect"><a href="#!">3</a></li>
    <li class="waves-effect"><a href="#!">4</a></li>
    <li class="waves-effect"><a href="#!">5</a></li>
    <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
  </ul>
           {}  */}
            </form>
            <form
              class="clear"
              // style={{ marginTop: -100, float: "left", marginLeft: 180 }}
              onSubmit={this.clearHandler}
            >
              <button
                class="btn waves-effect waves-light pink darken-1"
                type="submit"
              >
                Очистить
                <i class="material-icons right">layers_clear</i>
              </button>
            </form>
          </div>
          <br></br>
          <h6 class="left-align">
            <i class="tiny material-icons">assignment</i>Найдено записей:{" "}
            <span class="bold">{this.state.dbFoundRecords}</span>
          </h6>
          {Cookies.get('success') === 'true' ? (
            <a class="white-text" href="/create">
              <button class="btn waves-effect waves-light blue" type="submit">
                Создать запись
              </button>
            </a>
          ) : (
            ""
          )}
          <br></br>
          <div class="scroll">
          <ul class="pagination">
            <form onSubmit={this.mySubmitHandler}>
              {pageArr.map((pageId) => (
                <li class="waves-effect">
                  {/* <input
                    hidden
                    name="page"
                    value={pageId}
                    onClick={this.handleInputChange}
                  /> */}
                  <button
                    class={"btn waves-effect waves-light btn-flat"}
                    type="submit"
                    name="page"
                    value={pageId}
                    onClick={this.handleInputChange}
                  >
                    {pageId}
                  </button>
                </li>
              ))}
            </form>
          </ul>
          </div>
          {/* <ul class="pagination">
            {pageArr.map((pageId) => (
              <li class="waves-effect">
                  <input
                    hidden
                    name="page"
                    value={pageId}
                    onChange={this.handleInputChange}
                  />
                  <button
                    class="btn waves-effect waves-light blue"
                    type="submit"
                  >
                    {pageId}
                  </button>
              </li>
            ))}
          </ul> */}
          <hr></hr>
          <div class="responsive-table">
            <table class="striped centered">
              <thead>
                <tr>
                  <th>Знак</th>
                  <th>Формула смысла</th>
                  <th>Функция</th>
                  <th>Способ</th>
                  <th>Область</th>
                  {Cookies.get('success') === 'true' ? <th>Ред.</th> : ""}
                  {Cookies.get('success') === 'true' ? <th>Удалить</th> : ""}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr>
                    <td>{item.answer}</td>
                    <td>{item.question}</td>
                    <td>{item.function}</td>
                    <td>{item.method}</td>
                    <td>{item.subjectArea}</td>
                    {Cookies.get('success') === 'true' ? (
                      <td>
                        <a href={"/edit/" + item.id}>
                          <i class="material-icons left">edit</i>
                        </a>
                      </td>
                    ) : (
                      ""
                    )}
                    {Cookies.get('success') === 'true' ? (
                      <td>
                        <a href={"/delete/" + item.id}>
                          <i class="material-icons left">delete</i>
                        </a>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}
