import './App.css';
import * as Tone from 'tone';
import React from 'react';
import { BackgroundColor } from 'chalk';


const synth = new Tone.Synth().toDestination();
const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
 red: 10, green: 72, blue: 129, alpha: 1.0, test: '' ,

      colors: [],
      heights: []
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
  randomizeHeight() {
    let random = Math.floor(Math.random() * 150) + 50
    return random
  }

  handleClick(value) {
    const color = this.formatColor(
      this.state.red,
      this.state.green,
      this.state.blue,
      this.state.alpha
    );
    let randomNote = Math.floor(Math.random() * 7);
    
    const now = Tone.now()
    synth.triggerAttackRelease(notes[randomNote] + '4', '2n', now);
    // synth.triggerAttackRelease(notes[randomNote], '8', '8n', now + .5)
    // synth.triggerAttackRelease(notes[randomNote], '8', '8n' + 1)
    // synth.triggerAttackRelease(notes[randomNote], "8", '8n' + 1.5)
   

    this.setState({
      green: this.randomizeValue(),
      red: this.randomizeValue(),
      blue: this.randomizeValue(),
      alpha: (this.randomizeValue() / 256).toFixed(2),
    });
    this.applyColor();
    if (this.state.colors.length < 6) {
      this.state.colors.push(color);
    } else {
      this.state.colors.shift();
      this.state.colors.push(color);
    }
    if (this.state.heights.length < 6) {
      this.state.heights.push(this.randomizeHeight())
    }
    else {
      this.state.heights.shift()
      this.state.heights.push(this.randomizeHeight())
    }
    // document.getElementById(1).style.background = this.state.colors[0];
  }
  
  ///Users/bessietaliaferro/reactstuff/tone/toneboard

  render() {
    
    const zero = this.state.colors[0]
    const one = this.state.colors[1]
    const two = this.state.colors[2]
    const three = this.state.colors[3]
    const four = this.state.colors[4]
    const five = this.state.colors[5]

    const height = this.randomizeHeight()

    const h1 = this.state.heights[0]
    const h2 = this.state.heights[1]
    const h3 = this.state.heights[2]
    const h4 = this.state.heights[3]
    const h5 = this.state.heights[4]
    const h6 = this.state.heights[5]

    const diffRandomColor = () => { return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)}

  console.log(zero)
    return (
      <div
        className='App'
        style={{
          background: `linear gradient(to right, ${one}, ${two})`
          // // background: this.formatColor(
          // //   this.state.red,
          // //   this.state.green,
          // //   this.state.blue,
          // //   this.state.alpha
          // ),
        }}
      >
        <header className='flex-container' >
          
          <span>
          {/* //'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6) */}
            <button type='button' style={{background: zero, height : h1}} onClick={this.handleClick}>
              clicky
            </button>
            <button type='button' style={{background: one, height : h2, width : height }} onClick={this.handleClick}>
              clicky
            </button>
            <button type='button' style={{background: two, height : h3, width : height }} onClick={this.handleClick}>
              HELLO
            </button>
            <button type='button' style={{background: three, height : h4 }} onClick={this.handleClick}>
              X
            </button>
            <button type='button' style={{background: four, height : h5, width : height }} onClick={this.handleClick}>
              YO
            </button>
            <button type='button' style={{background: five, height : h6 }} onClick={this.handleClick}>
              Jjjj
            </button>
            <button type='button' style={{background: zero, height : h1}} onClick={this.handleClick}>
              clicky
            </button>
            <button type='button' style={{background: one, height : h2, width : height }} onClick={this.handleClick}>
              clicky
            </button>
            <button type='button' style={{background: two, height : h3, width : height }} onClick={this.handleClick}>
              HELLO
            </button>
            <button type='button' style={{background: three, height : h4 }} onClick={this.handleClick}>
              X
            </button>
            <button type='button' style={{background: four, height : h5, width : height }} onClick={this.handleClick}>
              YO
            </button>
            <button type='button' style={{background: five, height : h6 }} onClick={this.handleClick}>
              Jjjj
            </button>
            <button type='button' style={{background: zero, height : h1}} onClick={this.handleClick}>
              clicky
            </button>
            <button type='button' style={{background: one, height : h2, width : height }} onClick={this.handleClick}>
              clicky
            </button>
            <button type='button' style={{background: two, height : h3, width : height }} onClick={this.handleClick}>
              HELLO
            </button>
            <button type='button' style={{background: three, height : h4 }} onClick={this.handleClick}>
              X
            </button>
            <button type='button' style={{background: four, height : h5, width : height }} onClick={this.handleClick}>
              YO
            </button>
            <button type='button' style={{background: five, height : h6 }} onClick={this.handleClick}>
              Jjjj
            </button>
          </span>
        </header>
      </div>
    );
  }
}

export default App;
