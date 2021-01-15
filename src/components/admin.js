import React from "react";
import axios from "axios";
import configData from "./config.json";
import Cookies from 'js-cookie';
const FileDownload = require('js-file-download');
// import { Redirect } from "react-router-dom";



export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
    //   fileFormat: ''
    };
    // this.state = this.state.bind(this)
  }
  getTxt = (event) => {
    event.preventDefault();

    axios({
        method: "get",
        withCredentials: true,
        url: `${configData.DEVELOMPENT_URL}/admin/txt`,
        responseType: 'blob', // Important
      }).then(
        (response) => {
            FileDownload(response.data, 'crossWords.txt');
        }
      );
  }

  getJson = (event) => {
    event.preventDefault();

    axios({
        method: "get",
        withCredentials: true,
        url: `${configData.DEVELOMPENT_URL}/admin/json`,
        responseType: 'blob', // Important
      }).then(
        (response) => {
            FileDownload(response.data, 'crossWords.json');
        }
      );
  }

  getCsv = (event) => {
    event.preventDefault();

    axios({
        method: "get",
        withCredentials: true,
        url: `${configData.DEVELOMPENT_URL}/admin/csv`,
        responseType: 'blob', // Important
      }).then(
        (response) => {
            FileDownload(response.data, 'crossWords.csv');
        }
      );
  }

  getXls = (event) => {
    event.preventDefault();

    axios({
        method: "get",
        withCredentials: true,
        url: `${configData.DEVELOMPENT_URL}/admin/xls`,
        responseType: 'blob', // Important
      }).then(
        (response) => {
            FileDownload(response.data, 'crossWords.xls');
        }
      );
  }

  componentDidMount() {
    axios({
      method: "get",
      withCredentials: true,
      url: `${configData.DEVELOMPENT_URL}/admin`,
    }).then(
      (result) => {
        this.setState({
            logs: result.data,
        });
        this.setState({
            logs: this.state.logs.map(function(log) {
                if (log.log_type) {
                    if (log.log_type === 1) {
                        log.log_type = 'Редактирование'
                        return log
                    } else {
                        log.log_type = 'Создание'
                        return log
                    }
                } else {
                    log.log_type = 'Удаление'
                    return log
                }
            }),
        });
        console.log(this.state.logs)
      }
    );
  }

  render() {
    if (Cookies.get('success') === 'true') {
      window.location = "/";
    } else {
      return (
        <div class="container mt-md-5 col-8">
          <h1 class="center">Панель администратора</h1>
          <h3 class="center">Скачать базу данных:</h3>
          <div class="responsive-table">
            <table class="striped centered">
              <thead>
                <tr>
                  <th>Тип файла</th>
                  <th>Ссылка на скачивание</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>txt</td>
                  <td>
                    <a href="admin/download/txt" class="badge badge-info" onClick={this.getTxt}>
                      Скачать
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>json</td>
                  <td>
                    <a href="admin/download/json" class="badge badge-info" onClick={this.getJson}>
                      Скачать
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>csv</td>
                  <td>
                    <a href="admin/download/csv" class="badge badge-info"  onClick={this.getCsv}>
                      Скачать
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>xls</td>
                  <td>
                    <a href="admin/download/xls" class="badge badge-info"  onClick={this.getXls}>
                      Скачать
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 class="center">Логи записей:</h3>
          <div class="responsive-table">
            <table class="striped centered">
              <thead>
                <tr>
                  <th>ID записи</th>
                  <th>Пользователь</th>
                  <th>Время</th>
                  <th>Дата</th>
                  <th>Тип</th>
                </tr>
              </thead>

              <tbody>
                {this.state.logs.map((log) => (
                <tr>
                        <td><a href={'edit/' + log.record_id}>{log.record_id}</a></td>
                    <td>{log.email}</td>
                    <td>{log.time}</td>
                    <td>{log.date}</td>
                    <td>{log.log_type}</td>
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
