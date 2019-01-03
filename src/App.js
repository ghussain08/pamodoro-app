import React, { Component } from 'react';
import './App.css';
import Controllers from './components/controllers/controllers'
import Timer from './components/timer'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: 1500,
      isRunning: false,
      clock: '25:00', //you can implement hours features too
      intervalId: null,
      isModalOpen: false
    }
  }
  updateTimer = (timer = this.state.timer) => {
    if (this.state.timer && this.state.isRunning) {
      let minutes = this.padZero(Math.floor(timer / 60)); //minutes
      let seconds = this.padZero(timer % 60);    //seconds < 60
      let clock = `${minutes}:${seconds}`;
      this.setState({ clock: clock, timer: timer - 1 });
    }
    else {
      this.stopTimerWhenZero();
    }
  }
  changeTimer = (e) => {

    //this function handles clicks on "short break" or "pomodoro timer" buttons and
    //it takes the timer and restart the timer
    let time = e.target.dataset.time * 60;
    this.updateTimer(time);
  }

  handleReset = () => {
    //clear or stop previously running timer and reset app state
    clearInterval(this.state.intervalId);
    this.setState({ timer: 1500, clock: '25:00' });
    //finally restart the timer using default (timer: 1500, clock:'25:00') state
    this.startTimer();
  }

  handlePlayAndPause = () => {
    //if timer is currently running
    if (this.state.isRunning) {
      //clear interval first so that timer stops
      clearInterval(this.state.intervalId);
      //update app state
      this.setState({ isRunning: false, intervalId: null });
    }
    else {
      //if it's already stopped then start timer
      this.startTimer();
    }
  }

  startTimer = () => {
    //if any interval is already running then clear it first and start new interval
    //and set isRunning true and intervalId as new interval id
    clearInterval(this.state.intervalId);
    let intervalId = setInterval(this.updateTimer, 1000);
    this.setState({ intervalId: intervalId, isRunning: true });
  }

  showAndHideModal = () => {
    //show and hide modal
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleTimerCustomization = (e) => {
    //custome timer
    let time = e.target.value;
    if (time => .1) {
      //onblur hide the modal, update timer, and clear interval
      this.setState({
        timer: time * 60,
        isModalOpen: false,
        intervalId: null
      });
      this.startTimer();
    }
    else {
      this.stopTimerWhenZero();
    }
  }

  padZero = (n) => {
    //add extra zero if minute or second are less than 10
    return (n < 10) ? ("0" + n) : n;
  }
  componentDidMount() {
    this.startTimer(); //start timer using intial state
  }
  stopTimerWhenZero = () => {
    //reset app state as initial and clearInterval function
    clearInterval(this.state.intervalId);
    this.setState({
      timer: 0,
      clock: '00:00',
      isRunning: false,
      intervalId: null
    });
  }
  render() {
    return (
      <div className="App">
        <header style={{ textAlign: 'center', padding: '15px 0' }} >
          <a href="/">
            <h1>Pomodoro Timer</h1>
          </a>
        </header>
        <div className="timerOption" >
          <button data-time='25' onClick={this.changeTimer} >
            Pomodoro
          </button>
          <button data-time='05' onClick={this.changeTimer}>
            Short Break
          </button>
          <button data-time='15' onClick={this.changeTimer}>
            Long break
          </button>
        </div>

        <Timer clock={this.state.clock} />
        <Controllers customizeTimer={this.handleTimerCustomization}
          isModalOpen={this.state.isModalOpen}
          showModal={this.showAndHideModal}
          isRunning={this.state.isRunning}
          toggleRunningStatus={this.handlePlayAndPause}
          reset={this.handleReset} />
        <footer style={{ marginTop: '50px', textAlign: 'center' }}>
          <p>Designed and developed by <a href="https://www.instagram.com/hussain.codes/" >Gulam Hussain</a></p>
        </footer>
      </div>

    );
  }
}

export default App;
