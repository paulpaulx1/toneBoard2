import './App.css';
import * as Tone from 'tone';
import React from 'react';
import Modal from 'react-modal';
import { nanoid } from 'nanoid';
import MapTile from './MapTile'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragnDrop from './DragnDrop'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const pant = require('nearest-pantone');

const synth = new Tone.Synth().toDestination();
const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const ogState = {
  red: 255,
  green: 250,
  blue: 250,
  alpha: 1,
  test: '',
  colors: [
    'transparent',
    'transparent',
    'transparent',
    'transparent',
    'transparent',
    'transparent',
  ],
  heights: [],
  selectorOn: false,
  selectedClass: 'h1',
  printColors: false,
  pureColor: false,
  modalIsOpen: false,
  setIsOpen: false,
};
var subtitle;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      red: 220,
      green: 220,
      blue: 220,
      alpha: 1,
      test: '',
      nameArray: ['clicky', 'clicky', 'HELLO', 'XYOJ', 'jjj', 'clicky'],
      colors: [
        'transparent',
        'transparent',
        'transparent',
        'transparent',
        'transparent',
        'transparent',
      ],
      heights: [],
      selectorOn: false,
      selectedClass: 'h1',
      printColors: false,
      pureColor: false,
      modalIsOpen: false,
      setIsOpen: false,
      clearPalettes: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeOneColor = this.changeOneColor.bind(this);
    this.printColors = this.printColors.bind(this);
    this.stopMusic = this.stopMusic.bind(this);
    this.formatColor = this.formatColor.bind(this);
    this.changeBackgroundColor = this.changeBackgroundColor.bind(this);
    this.addButton = this.addButton.bind(this);
    this.rgbToHex = this.rgbToHex.bind(this);
    this.toggleColorPurity = this.toggleColorPurity.bind(this);
    this.reducePalette = this.reducePalette.bind(this);
  }

  toggleModal() {
    this.setState({ ...this.state, modalIsOpen: !this.state.modalIsOpen });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  async reducePalette() {
    await this.setState({
      ...this.state,
      colors: this.state.colors.pop(),
    });
  }
  async componentDidMount() {
    // await Tone.context.resume();
  }

  printColors() {
    this.setState({ printColors: !this.state.printColors });
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

  changeOneColor(e) {
    this.setState({
      ...this.state,
      selectorOn: !this.state.selectorOn,
    });
  }

  addButton() {
    let x = this.randomizeHeight();
    this.setState({
      ...this.state,
      colors: [...this.state.colors, 'transparent'],
      heights: [this.state.heights, x],
    });
  }

  rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  async changeBackgroundColor(e) {
    const now = Tone.now();

    let randomNote = Math.floor(Math.random() * 7);
    synth.triggerAttackRelease(notes[randomNote] + '4', '2n', now);
    const diffRandomColor = () => {
      if (this.state.pureColor === true) {
        return (
          '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
        );
      } else {
        return (
          '#' +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
          Math.floor(Math.random() * 100).toString()
        );
      }
    };
    let x = await diffRandomColor();
    document.body.style.background = x;
    if (this.state.printColors === true) {
      e.target.innerText = 'background ' + x;
    }
  }

  toggleColorPurity() {
    this.setState({
      ...this.state,
      pureColor: !this.state.pureColor,
    });
  }
  async handleClick(e) {
    let randomNote = Math.floor(Math.random() * 7);
    const synth = new Tone.PolySynth().toDestination();
    synth.set({ detune: -200 });
    synth.triggerAttackRelease([notes[randomNote] + '3.5'], 1);
    if (this.state.selectorOn === true) {
      const diffRandomColor = () => {
        if (this.pureColor === false) {
          return (
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
            Math.floor(Math.random() * 100).toString()
          );
        } else {
          return (
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
          );
        }
      };
      let selectedButtons = document.getElementsByClassName(e.target.className);

      let x = diffRandomColor();

      for (var button of selectedButtons) {
        button.style.background = x;
        // this.setState({
        //   ...this.state,
        //   colors: this.state.colors.splice(
        //     1,
        //     Number(e.target.className.substr(1)),
        //     x
        // ),
        let tempArray = this.state.colors
        tempArray.splice(Number(e.target.className), 1, `${e.target.style.background}`)
        console.log(tempArray)
        // console.log(this.state.colors.splice(Number(e.target.className), 1, 'HELLO'))
        this.setState({...this.state, colors: tempArray})
  
        };
      

      for (let x of await document.getElementsByClassName(e.target.className)) {
        x.innerText = e.target.style.background;
        // this.setState({...this.state, colors: this.state.colors.splice(Number(e.target.className), 1, e.target.style.background)})
      }
    } else {
      const color = this.formatColor(
        this.state.red,
        this.state.green,
        this.state.blue,
        this.state.alpha
      );
      if (this.state.pureColor === false) {
        this.setState({
          ...this.state,
          green: this.randomizeValue(),
          red: this.randomizeValue(),
          blue: this.randomizeValue(),
          alpha: (this.randomizeValue() / 256).toFixed(2),
        });
      }
      if (this.state.pureColor === true) {
        this.setState({
          ...this.state,
          green: this.randomizeValue(),
          red: this.randomizeValue(),
          blue: this.randomizeValue(),
          alpha: 1,
        });
      }
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

  clearPalettes() {
    localStorage.clear();
    this.setState({ clearPalettes: !this.state.clearPalettes });
  }



  stopMusic() {
    console.log(Tone);
  }
  render() {
    const height = this.randomizeHeight();
    const heights = this.state.heights;
    const colors = this.state.colors;
    let oneSetOff = 'one set: off';
    let oneSetOn = 'one set: on';
    const colorMap = colors.map((color, index) => (
      <button
        type='button'
        key={index}
        className={`${index}`}
        style={{
          background: color,
          height: heights[index],
          width: heights[index - 1],
        }}
        onClick={this.handleClick}
      >
        {this.state.printColors === true ? (
          <>{color}</>
        ) : (
          `${this.state.nameArray[index]}`
        )}
      </button>
    ));

    let styleObj = {
      border: '3px #ccc solid',
      margin: '10px',
      background: 'transparent',
      WebkitTextStrokeWidth: '1px',
      color: '#292929c0',
      WebkitTextStrokeColor: '#414241',
      padding: '10px',
    };

    // let stripeMap = colors.map((color, index) => (
    //   <div
    //     key={nanoid}
    //     style={{
    //       background: color,
    //       height: 50,
    //       color: 'rgba(63, 63, 63, 0.884)',
    //       fontFamily: 'Gill Sans',
    //     }}
    //   >{`${color}`}</div>
    // ));
    const localMap = Object.values(localStorage).slice().map((palette, index) =>
    
    
    <div className="mapholder" key={nanoid()}  >

     {palette.split('),').map((color, i) => (
       i !== 5 ? 
         
          <div
            key={nanoid()}
          
            className='stripemaps'
            style={{
           
              background: `${color})`,
            }}
          >
            {Object.keys(localStorage)[index]}<br/>{`${color})`}
        
          </div>
          :   
         <div
          key={nanoid()}
    
          className='stripemaps'
          style={{
            
            background: `${color}`,
          }}
        >
          {Object.keys(localStorage)[index]}<br/>{`${color}`}
      
        </div>
        
    ))}  </div>)
   
        

    return (
      <div className='App'>
        {/* <button style={styleObj} onClick={this.toggleModal}>
          about
        </button> */}
        <Modal
          colors={this.state.colors}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.toggleModal}
          style={{ background: document.body.style.background }}
          contentLabel='Example Modal'
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          </h2>

          <div className='ModalStripeView'><DragnDrop colors={this.state.colors}/></div>
          <form>
            name palette :)
            <input id='textbox_id' />
            <button
              style={{ background: 'transparent' }}
              onClick={()=>localStorage.setItem(document.getElementById('textbox_id').value, this.state.colors)}
            >
              save palette
            </button> 
            <button
              type='button'
              key={nanoid()}
              // className={`h${index + 1}`}
              style={{
                background: 'transparent',
                // height: heights[index],
                // width: heights[index - 1],
              }}
              onClick={this.handleClick}
            >
              new color
            </button>
            <button
              style={{ background: 'transparent' }}
              onClick={this.toggleModal}
            >
              close
            </button>
          </form>
        </Modal>
        <button style={styleObj} onClick={this.toggleModal}>
          save palette
        </button>
        <button
          className='changeOneColor'
          onClick={this.changeOneColor}
          style={styleObj}
        >
          {this.state.selectorOn === true ? oneSetOn : oneSetOff}
        </button>
        <button
          className='changeOneColor'
          onClick={this.toggleColorPurity}
          style={styleObj}
        >
          {this.state.pureColor === false ? 'translucent' : 'opaque'}
        </button>
        <button
          className='changeOneColor'
          onClick={this.addButton}
          style={styleObj}
        >
          add button
        </button>
        <button
          className='changeOneColor'
          onClick={this.reducePalette}
          style={styleObj}
        >
          reduce palette
        </button>
        <button
          className='changeOneColor'
          onClick={this.changeBackgroundColor}
          style={styleObj}
        >
          {this.state.printColors === false
            ? 'background'
            : 'background ' + document.body.style.background}
        </button>
        <button onClick={this.printColors} style={styleObj}>
          print colors
        </button>
        <button style={styleObj} onClick={() => this.clearPalettes()}>
          clear palettes
        </button>

        <header className='flex-container'>
          <div className='flex-boi'>
          <DragnDrop colors={this.state.colors} className='badboi' />
          <div className='doublebadboi' >
            {colorMap}
            {colorMap}
            {colorMap}
            {colorMap}
            {colorMap}
            {/* {colorMap}
            {colorMap}
            {colorMap}
            {colorMap}
            {colorMap}
            {colorMap} */}
            </div>
          </div>
        </header>
        
        <div className="dragboiz">
          {/* <DragnDrop colors={this.state.colors}/> */}
          <div/>
          <div className="mapflex">
            <DragnDrop colors={localStorage.getItem(0)}/>
          {localMap}
   
          </div>
      
        </div>
      </div>
    );
  }
}
Modal.setAppElement(document.body);
export default App;
