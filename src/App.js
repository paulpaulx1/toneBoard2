
import './App.css';
import * as Tone from 'tone';
import React from 'react';

const synth = new Tone.Synth().toDestination();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      red: 10,
      green: 72,
      blue: 129,
      alpha: 1.0,
      test: '',
      notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await Tone.context.resume();

    console.log('audio is ready');
    
  }

  formatColor(r, g, b, a) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  isLight() {
    const rgb = +this.state.red + +this.state.green + +this.state.blue;
    return rgb < 127 * 3;
  }

  applyColor() {
    const color = this.formatColor(
      this.state.red,
      this.state.green,
      this.state.blue,
      this.state.alpha
    );
    document.body.style.background = color;
  }

  randomizeValue() {
    let random = 0;
    random = Math.floor(Math.random() * 256);
    return random;
  }

  componentDidUpdate(prevProps, prevState) {
    this.applyColor();
  }

  // handleChange(event) {
  //   synth.triggerAttackRelease('C4', '8n');
  //   Tone.context.resume();

  //   this.setState({ value: event.target.value });
  // }
 

  handleClick(value) {
    let randomNote = Math.floor(Math.random() * 7);
    synth.triggerAttackRelease(this.state.notes[randomNote]+'4', '1n');
    
    this.setState({
      green: this.randomizeValue(),
      red: this.randomizeValue() ,
      blue: this.randomizeValue(),
      alpha: (this.randomizeValue() / 256).toFixed(2)
    });
     this.applyColor()
  }
  
  ///Users/bessietaliaferro/reactstuff/tone/toneboard

  render() {
    return (
      <div className='App' style={{background: this.formatColor( this.state.red,
        this.state.green,
        this.state.blue,
        this.state.alpha)}}>
          
        <header className='App-header'>
          <span>

            <button
              type='button'
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button type='button' onClick={this.handleClick} >
              clicky
            </button>
            <button type='button' onClick={this.handleClick}>
              HELLO
            </button>
            <button type='button' onClick={this.handleClick}>
              X
            </button>
            <button type='button' onClick={this.handleClick}>
              YO
            </button>
            <button type='button' onClick={this.handleClick}>
              Jjjj
            </button>
          </span>
        </header>
      </div>
    );
  }
}

export default App;
