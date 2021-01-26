import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as Tone from 'tone';
import { nanoid } from 'nanoid';


// model.id = nanoid() //=> "4f90d13a42"

// fake data generator
const getItems = 
count =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `item-${k}`,
		content: `item ${k}`
    }));

// const getColors = props => {(Array.from(props.colors))}


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    console.log(list, startIndex, endIndex)
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
    console.log(result)
    // list = result
    return result;
    
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, colors, index) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    
    border: '3px ccc',
	// change background colour if dragging
	background: colors[index],
    width: 220,
    // marginRight: 200,
	// styles we need to apply on draggables
	...draggableStyle
});

const getListStyle = isDraggingOver => ({
	background: 'transparent',
	padding: grid,
  width: 250,
//   position: "relative"
});

const queryAttr = "data-rbd-drag-handle-draggable-id";

export default function App ( props ) {
	const [placeholderProps, setPlaceholderProps] = useState({});
    const [items, setItems] = useState(getItems(props.colors ? props.colors.length : 6));
    const [colors, setColors] = useState((props.colors))
    // useEffect(() => {
    //    props.color
    //   });
    const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    let randomNote = Math.floor(Math.random() * 7);
	const onDragEnd = result => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

    setPlaceholderProps({})
        setItems(items => reorder( items, result.source.index, result.destination.index));
        setColors(colors => reorder(colors, result.source.index, result.destination.index))
       
        const synth = new Tone.PolySynth().toDestination();
        synth.set({ detune: -200 });
        synth.triggerAttackRelease([notes[randomNote] + '4'], .2);
	};

	const onDragUpdate = update => {
    if(!update.destination){
      return;
    }
		const draggableId = update.draggableId;
		const destinationIndex = update.destination.index;

		const domQuery = `[${queryAttr}='${draggableId}']`;
		const draggedDOM = document.querySelector(domQuery);

		if (!draggedDOM) {
			return;
		}
		const { clientHeight, clientWidth } = draggedDOM;

		const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.children]
			.slice(0, destinationIndex)
			.reduce((total, curr) => {
				const style = curr.currentStyle || window.getComputedStyle(curr);
				const marginBottom = parseFloat(style.marginBottom);
				return total + curr.clientHeight + marginBottom;
			}, 0);

		setPlaceholderProps({
			clientHeight,
			clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
        });
        const synth = new Tone.PolySynth().toDestination();
        synth.set({ detune: -200 });
        synth.triggerAttackRelease([notes[randomNote] + '4'], .2);
	};

	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity
	return (
        props.colors ?
		<DragDropContext  colors={props.colors} onDragEnd={onDragEnd} onDragUpdate={onDragUpdate} setColors={props.colors}>
			<Droppable colors={props.colors} setColors={props.colors} droppableId="droppable" >
				{(provided, snapshot) => (
					<div 
						{...provided.droppableProps}
						ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        
					>
                        {Object.values(localStorage).map((color, index)=>props.colors.join() === color ? Object.keys(localStorage)[index] : null)}
						{items.map((item, index) => (
                           
                            <div style={{background: 'transparent', fontWeight: 20}}>
							<Draggable colors={props.colors} key={item.id} draggableId={item.id} index={index} setColors={props.colors}>
								{(provided, snapshot) => (
									<div className="dragger"
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={getItemStyle(
											snapshot.isDragging,
                                            provided.draggableProps.style,
                                            props.colors,
                                            index,
                                          
                                        )
                                    }
									>
										{props.colors[index]}
									</div>
								)}
							</Draggable>
                            
                            </div>
						))}
{/* <button type="button" onClick={localStorage.removeItem(Object.values(localStorage).map((color, index)=>props.colors.join() === color ? localStorage[Object.keys(localStorage)[index]] : console.log(color)))} /> */}
						{provided.placeholder}
            {/* <CustomPlaceholder snapshot={snapshot} /> */}
            <div style={{
              position: "absolute",
              top: placeholderProps.clientY,
              left: placeholderProps.clientX,
              height: placeholderProps.clientHeight,
            //   background: "tomato",
              width: placeholderProps.clientWidth
            }}/>
					</div>
				)}
			</Droppable>
		</DragDropContext>
        : <>HELLO</>
	);
};

// Put the thing into the DOM!
ReactDOM.render(<App />, document.getElementById("root"));
