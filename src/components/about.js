import React from "react";
import LoadingBar from "react-top-loading-bar";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.isLoaded = true;
  }

  render() {
    if (this.isLoaded === false) {
      return (
        <div>
          <LoadingBar color="#f11946" progress={100} />
        </div>
      );
    } else {
      return (
        <div>
          <h1>О проекте</h1>
          <p class="flow-text">
            {"Этот проект является наследником "}
            <a target="_blank" rel="noreferrer" href="http://www.tesaurus.ru/">
              www.tesaurus.ru
            </a>
            . Проект существует более двух лет.
          </p>
        </div>
      );
    }
  }
}
