import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import {Link, Redirect} from "react-router-dom";
import Nav from "react-bootstrap/Nav";


class NavBar extends React.Component {

    uploadFile(file) {
        let reader = new FileReader();
        // Read file into memory as UTF-8
        reader.readAsText(file.target.files[0]);
        // Handle errors load
        reader.onload = this.loadHandler;
        reader.onerror = this.errorHandler;
    }
    errorHandler(event) {
        alert(event.target.error.name);
    }

    loadHandler(event) {
        debugger;
        localStorage.removeItem('data');
        localStorage.setItem('data', event.target.result);
        return <Redirect to='/country-data' />;
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Chart Visualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <li><Link className="nav-link" to={{pathname: '/country-data', state: {data: 'Country Level Data'}}}>Country View</Link></li>
                        <li><Link className="nav-link" to={{pathname: '/game-data', state: {data: 'Game Level Data'}}}>Game View</Link></li>
                        <li><Link className="nav-link" to={{pathname: '/game-country-data', state: {data: 'Game & Country Level Data'}}}>Game & Country View</Link></li>
                    </Nav>
                </Navbar.Collapse>
                <label htmlFor="fileUpload" className="btn btn-secondary btn-sm">Upload Data (.csv)</label>
                <input type="file" id="fileUpload" className='d-none' onChange={this.uploadFile.bind(this)}
                       accept="text/csv"/>
            </Navbar>
        )
    }
}

export default NavBar
