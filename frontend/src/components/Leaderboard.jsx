import React, { useState } from "react";
import "./Leaderboard.css";
import axios from "axios";

export default class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: ["loading"]
    }
  }

  componentDidMount() {
    axios.get('/user/leaderboard').then((response) => {
      let rows = [];

      for (let user of response.data.users) {
        rows.push(
          <tr>
            <td>{user[0]}</td>
            <td>{user[1]}$</td>
          </tr>);
      }
      this.setState({rows: rows})
    });
  }

  render() {
    return (
      <div className="grid grid-col-1 justify-items-center min-h-[500px]">
        <h1 className="text-5xl text-center">
          The Richest players in Existance
        </h1>
        <table className="table-auto text-4xl text-center w-8/12 justify-center">
          <tbody>
            {this.state.rows}
          </tbody>
        </table>
      </div>
    );
  }

}