import axios from "axios";
import React, { useState } from "react";
const FormData = require('form-data');

export default class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            info: { name: "loading.." }
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get('/user/info').then((response) => {
            this.setState({ info: response.data })
        });
    }

    changeName() {
        let form = new FormData();
        form.append('name', document.getElementById("newNameField").value);
        axios.post('/user/set-name', form, { headers: { "Content-Type": "multipart/form-data" } }).then((response) => {
            console.log(response);
            this.getData();
        });
    }

    render() {

        return (
            <div className="mt-5 mb-5 grid grid-col-1 justify-items-center">
                <h1 className="text-5xl text-center mt-5 mb-5">Information</h1>
                <table className="table-auto text-4xl text-center w-8/12 justify-center">
                    <tbody>
                        <tr>
                            <td>Email:</td>
                            <td>{this.state.info.email}</td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td>
                                <div className="flex justify-center items-center">
                                    <p className="h-full">{this.state.info.name}</p>
                                    <input
                                        type="text"
                                        class="form-control ml-2 mr-2 block h-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="newNameField"
                                        placeholder="New Name"
                                    />
                                    <button
                                        className="bg-[#00df9a] font-bold rounded-md px-6 py-3"
                                        onClick={() => {
                                            this.changeName()
                                        }}
                                    >
                                        Change Name
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Money:</td>
                            <td>{this.state.info.money}</td>
                        </tr>
                        <tr>
                            <td>Token:</td>
                            <td>{this.state.info.token}</td>
                        </tr>
                        <tr>
                            <td>Last Spin:</td>
                            <td>{this.state.info.last_spin}</td>
                        </tr>
                    </tbody>
                </table>

                <a className='bg-[#01283f] text-[#00df9a] text-center w-[200px] rounded-md font-large my-6 mx-auto px-6 py-3' href='/user/logout'>Log Out</a>
            </div>
        );
    }
}