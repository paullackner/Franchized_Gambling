import React, { useState } from "react";
import "./Leaderboard.css";

function Leaderboard() {
  const [users, setUsers] = useState([
    { name: "Joe", money: 200 },
    { name: "Joe", money: 200 },
    { name: "Joe", money: 200 },
    { name: "Joe", money: 200 },
    { name: "Joe", money: 200 },
    { name: "Joe", money: 200 },
    { name: "Joe", money: 200 },
  ]);

  const rows = []

  for (let user of users) {
    rows.push(
    <tr>
      <td>{user.name}</td>
      <td>{user.money}$</td>
    </tr>)
  }

  return (
    <div className="mt-5 mb-5 grid grid-col-1 justify-items-center">
      <h1 className="text-3xl text-center mt-5 mb-5">
        The Richest players in Existance
      </h1>
      <table className="table-auto text-4xl text-center w-8/12 justify-center">
        <thead>
          <tr>
            <th>Player</th>
            <th>Money</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
