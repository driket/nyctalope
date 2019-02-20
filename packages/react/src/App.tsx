import React, { Component } from "react"
import logo from "./logo.svg"
import { Grid, Col } from "./components/layout/Grid"
import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Grid numCol={6} numColXS={2} numColSM={3} numColMD={4} numColLG={5}>
            <Col>1</Col>
            <Col>2</Col>
            <Col>3</Col>
            <Col>4</Col>
            <Col>5</Col>
            <Col>6</Col>
            <Col>7</Col>
            <Col>8</Col>
            <Col>9</Col>
            <Col>10</Col>
          </Grid>
        </header>
      </div>
    )
  }
}

export default App
