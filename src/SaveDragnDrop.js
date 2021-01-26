import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as Tone from 'tone';
import { nanoid } from 'nanoid'

// fake data generator
const getItems = count =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `item-${k}`,
		content: `item ${k}`
	}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

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
    width: 300,
    marginRight: 50,
	// styles we need to apply on draggables
	...draggableStyle
});

const getListStyle = (isDraggingOver, props) => ({
	background: props.background,
	padding: grid,
  width: 250,
  position: "relative"
});

const queryAttr = "data-rbd-drag-handle-draggable-id";

export default function App ( props ) {
	const [placeholderProps, setPlaceholderProps] = useState({});
	const [items, setItems] = useState(getItems(props.grid));
    const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    let randomNote = Math.floor(Math.random() * 7);
	const onDragEnd = result => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

    setPlaceholderProps({})
        setItems(items => reorder(items, result.source.index, result.destination.index));
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
		<DragDropContext colors={props.colors} background={props.background} onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
			<Droppable key={nanoid()} colors={props.colors} droppableId="droppable">
				{(provided, snapshot) => (
					<div key={nanoid()}
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver, props)}
					>drag... drop 
						{items.map((item, index) => (
							<Draggable colors={props.colors} key={item.id} draggableId={item.id} index={index}>
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
                            // <button onClick={()=>localStorage.setItem(colors)}
						))}

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
