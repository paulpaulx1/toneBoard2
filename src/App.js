import './App.css';
import * as Tone from 'tone';
import React from 'react';
import { ButtonSet } from './ButtonSet';

const synth = new Tone.Synth().toDestination();
const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const ogState = {
  red: 220,
  green: 220,
  blue: 220,
  alpha: 1,
  test: '',
   colors: [],
   heights: [],
  selectorOn: false,
  selectedClass: 'h1',
  printColors: false,
  musicOn: false,
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      red: 220,
      green: 220,
      blue: 220,
      alpha: 1,
      test: '',
      colors: [],
      heights: [],
      selectorOn: false,
      selectedClass: 'h1',
      printColors: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.changeOneColor = this.changeOneColor.bind(this);
    this.printColors = this.printColors.bind(this)
    this.stopMusic = this.stopMusic.bind(this)
    // this.truColor1 = document.getElementsByClassName('h1')[0].style.background
    // this.truColor2 = document.getElementsByClassName('h2')[0].style.background
    // this.truColor3 = document.getElementsByClassName('h3')[0].style.background
    // this.truColor4 = document.getElementsByClassName('h4')[0].style.background
    // this.truColor5 = document.getElementsByClassName('h5')[0].style.background
    // this.truColor6 = document.getElementsByClassName('h6')[0].style.background
  }

  async componentDidMount() {
    await Tone.context.resume();

    console.log('audio is ready');
  }

  printColors() {
    this.setState({printColors : ! this.state.printColors})
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

  randomizeHeight() {
    let random = Math.floor(Math.random() * 150) + 50;
    return random;
  }

  changeOneColor() {
    // selectorOn = !selectorOn
    this.setState({
      ...this.state,
      selectorOn: !this.state.selectorOn,
    });
  }

  changeBackgroundColor() {
    const now = Tone.now();
    let randomNote = Math.floor(Math.random() * 7);
    synth.triggerAttackRelease(notes[randomNote] + '4', '2n', now);
    const diffRandomColor = () => {
      return (
        '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
      );
    };
    let x = diffRandomColor();
    document.body.style.background = x;
  }
 
  handleClick(e) {
    this.truColor1 = document.getElementsByClassName('h1')[0].style.background
    this.truColor2 = document.getElementsByClassName('h2')[0].style.background
    this.truColor3 = document.getElementsByClassName('h3')[0].style.background
    this.truColor4 = document.getElementsByClassName('h4')[0].style.background
    this.truColor5 = document.getElementsByClassName('h5')[0].style.background
    this.truColor6 = document.getElementsByClassName('h6')[0].style.background
    console.log("buttons", document.getElementsByClassName('h1')[0].style.background)
    let randomNote = Math.floor(Math.random() * 7);
    let otherRandom = Math.floor(Math.random() * 7)

    // const now = Tone.now();
    // synth.triggerAttackRelease([notes[otherRandom] + '4', '2n', now);
    const synth = new Tone.PolySynth().toDestination();
    // set the attributes across all the voices using 'set'
    synth.set({ detune: -200 });
    // play a chord
    synth.triggerAttackRelease([notes[randomNote]+'3.9', notes[randomNote]+'3.5'], 1);
    // synth.triggerAttackRelease([notes[randomNote]+'5', notes[randomNote]+'4', notes[randomNote]+'3'], 1);
//     // const xx = new Tone.Synth().toDestination();
// const seq = new Tone.Sequence((time, note) => {
// 	synth.triggerAttackRelease(note, 0.1, time);
// 	// subdivisions are given as subarrays
// }, [notes[randomNote]+`4`, ["A4", notes[otherRandom]+"4"]]).start(0);

// Tone.Transport.start("+.2", "4:0:0");
// Tone.Transport.stop("+1")


    if (this.state.selectorOn === true) {
      const diffRandomColor = () => {
        return (
          '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
        );
      };
      let selectedButtons = document.getElementsByClassName(e.target.className);

      let x = diffRandomColor();
      for (var button of selectedButtons) {
        button.style.background = x;
      }
    } else {
      const color = this.formatColor(
        this.state.red,
        this.state.green,
        this.state.blue,
        this.state.alpha
      );

      this.setState({
        ...this.state,
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
        this.state.heights.push(this.randomizeHeight());
      } else {
        this.state.heights.shift();
        this.state.heights.push(this.randomizeHeight());
      }
    }
  }
 
 stopMusic() {
  Tone.Transport.stop();
  }
  render() {
    
    const zero = this.state.colors[0];
    const one = this.state.colors[1];
    const two = this.state.colors[2];
    const three = this.state.colors[3];
    const four = this.state.colors[4];
    const five = this.state.colors[5];

    const height = this.randomizeHeight();

    const h1 = this.state.heights[0];
    const h2 = this.state.heights[1];
    const h3 = this.state.heights[2];
    const h4 = this.state.heights[3];
    const h5 = this.state.heights[4];
    const h6 = this.state.heights[5];

    // this.truColor1 = document.getElementsByClassName('h1')[0].style.background
    // this.truColor2 = document.getElementsByClassName('h2')[0].style.background
    // this.truColor3 = document.getElementsByClassName('h3')[0].style.background
    // this.truColor4 = document.getElementsByClassName('h4')[0].style.background
    // this.truColor5 = document.getElementsByClassName('h5')[0].style.background
    // this.truColor6 = document.getElementsByClassName('h6')[0].style.background

  
    let oneSetOff = 'one set: off';
    let oneSetOn = 'one set: on';
    // let backgroundPrint = document.body.style.background
    
    console.log(zero);
    return (
      <div className='App'>
        {' '}
        <button
          className='changeOneColor'
          onClick={this.changeOneColor}
          style={{
            border: '3px #ccc solid',
            margin: '10px',
            background: 'transparent',
            WebkitTextStrokeWidth: '1px',
            color: '#6e7070',
            WebkitTextStrokeColor: '#414241',
            padding: '10px',
            FontWeight: '900',
          }}
        >
          {this.state.selectorOn === true ? oneSetOn : oneSetOff}
        </button>
        <button  className='changeOneColor'
          onClick={this.stopMusic}
          style={{
            border: '3px #ccc solid',
            margin: '10px',
            background: 'transparent',
            WebkitTextStrokeWidth: '1px',
            color: '#6e7070',
            WebkitTextStrokeColor: '#414241',
            padding: '10px',}}>
            shhhhh</button>
        <button
          className='changeOneColor'
          onClick={this.changeBackgroundColor}
          style={{
            border: '3px #ccc solid',
            margin: '10px',
            background: 'transparent',
            WebkitTextStrokeWidth: '1px',
            color: '#6e7070',
            WebkitTextStrokeColor: '#414241',
            padding: '10px',
          }}
        >
          background
        </button>
        <button onClick={this.printColors} style={{
            border: '3px #ccc solid',
            margin: '10px',
            background: 'transparent',
            WebkitTextStrokeWidth: '1px',
            color: '#6e7070',
            WebkitTextStrokeColor: '#414241',
            padding: '10px',
          }}>print colors</button>
          <button style={{
            border: '3px #ccc solid',
            margin: '10px',
            background: 'transparent',
            WebkitTextStrokeWidth: '1px',
            color: '#6e7070',
            WebkitTextStrokeColor: '#414241',
            padding: '10px',
          }} 
          onClick={()=>this.setState(ogState)}>revert</button>

        {this.state.printColors === false? <header className='flex-container'>
          <span>
            <button
              
              type='button'
              className='h1'
              style={{ background: zero, height: h1 }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height }}
              onClick={this.handleClick}
            >
              HELLO
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4 }}
              onClick={this.handleClick}
            >
              X
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height }}
              onClick={this.handleClick}
            >
              YO
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6 }}
              onClick={this.handleClick}
            >
              Jjjj
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1 }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height }}
              onClick={this.handleClick}
            >
              HELLO
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4 }}
              onClick={this.handleClick}
            >
              X
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height }}
              onClick={this.handleClick}
            >
              YO
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6 }}
              onClick={this.handleClick}
            >
              Jjjj
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1 }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height }}
              onClick={this.handleClick}
            >
              HELLO
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4 }}
              onClick={this.handleClick}
            >
              X
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height }}
              onClick={this.handleClick}
            >
              YO
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6 }}
              onClick={this.handleClick}
            >
              Jjjj
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1 }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height }}
              onClick={this.handleClick}
            >
              HELLO
            </button>
        
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4 }}
              onClick={this.handleClick}
            >
              X
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height }}
              onClick={this.handleClick}
            >
              YO
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6 }}
              onClick={this.handleClick}
            >
              Jjjj
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1 }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height }}
              onClick={this.handleClick}
            >
              HELLO
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4 }}
              onClick={this.handleClick}
            >
              X
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height }}
              onClick={this.handleClick}
            >
              YO
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6 }}
              onClick={this.handleClick}
            >
              Jjjj
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1 }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height }}
              onClick={this.handleClick}
            >
              HELLO
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4 }}
              onClick={this.handleClick}
            >
              X
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height }}
              onClick={this.handleClick}
            >
              YO
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6 }}
              onClick={this.handleClick}
            >
              Jjjj
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1 }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height }}
              onClick={this.handleClick}
            >
              HELLO
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4 }}
              onClick={this.handleClick}
            >
              X
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height }}
              onClick={this.handleClick}
            >
              YO
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6 }}
              onClick={this.handleClick}
            >
              Jjjj
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1 }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height }}
              onClick={this.handleClick}
            >
              clicky
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height }}
              onClick={this.handleClick}
            >
              HELLO
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4 }}
              onClick={this.handleClick}
            >
              X
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height }}
              onClick={this.handleClick}
            >
              YO
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6 }}
              onClick={this.handleClick}
            >
              Jjjj
            </button>
          </span>
        </header> 
        
        
        
        
        :





        <header className='flex-container'>
          {document.body.style.background}
          <span>
            <button
              
              type='button'
              className='h1'
              style={{ background: zero, height: h1, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
               {`${this.truColor1}`}
            </button> 
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {one}
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {two}
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {three}
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {four}
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {five}
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {zero}
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {one}
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {two}
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {three}
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {four}
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {five}
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {zero}
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {one}
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {two}
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {three}
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {four}
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {five}
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {zero}
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {one}
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {two}
            </button>
        
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {three}
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {four}
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {five}
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {zero}
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {one}
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {two}
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {three}
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {four}
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {five}
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {zero}
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {one}
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {two}
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {three}
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {four}
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {five}
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {zero}
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {one}
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {two}
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {three}
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
             {four}
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {five}
            </button>
            <button
              type='button'
              className='h1'
              style={{ background: zero, height: h1, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {zero}
            </button>
            <button
              type='button'
              className='h2'
              style={{ background: one, height: h2, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {one}
            </button>
            <button
              type='button'
              className='h3'
              style={{ background: two, height: h3, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {two}
            </button>
            <button
              type='button'
              className='h4'
              style={{ background: three, height: h4, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {three}
            </button>
            <button
              type='button'
              className='h5'
              style={{ background: four, height: h5, width: height, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {four}
            </button>
            <button
              type='button'
              className='h6'
              style={{ background: five, height: h6, WebkitTextStrokeWidth: '1px',
              color: '#6e7070',
              WebkitTextStrokeColor: '#414241',
              padding: '10px',
              FontWeight: '900', }}
              onClick={this.handleClick}
            >
              {five}
            </button>
          </span>
        </header>}
      </div>
    );
  }
}

export default App;
