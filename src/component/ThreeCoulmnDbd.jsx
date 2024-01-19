import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ThreeColumnDnd = () => {

    const [columns, setColumns] = useState({
        column1: {
            id: "column1",
            items: ["Item 1", "Item 2", "Item 3", "Item 4"],
        },
        column2: {
            id: "column2",
            items: ["Item 5", "Item 6", "Item 7", "Item 8"],
        },
        column3: {
            id: "column3",
            items: ["Item 9", "Item 10", "Item 11", "Item 12"],
        },
    });

    const onDragEnd = (result) => {


        const { source, destination, draggableId, type } = result;

        if (
            !destination ||
            (source.droppableId === destination.droppableId &&
                source.index === destination.index)
        ) {
            // If dropped outside the list or dropped in the same position
            return;
        }

        if (type === "column") {

            // Reordering columns
            const newColumnOrder = Object.keys(columns); // [column1, column2, column3]
            const [movedItem] = newColumnOrder.splice(source.index, 1); // column1 or column2 or column3


            newColumnOrder.splice(destination.index, 0, movedItem); // set Reordering columns 

            // get new reorder list
            const newColumns = {};
            newColumnOrder.forEach((columnId) => {
                newColumns[columnId] = columns[columnId];
            });

            /* Alternative Solution
            for (let i = 0; i < newColumnOrder.length; i++) {
                newColumns[newColumnOrder[i]] = columns[newColumnOrder[i]];
            } */

            // set new reorder list
            setColumns(newColumns);
        }
        // else if (type === "item") {
        //     // Reordering items within the same column or moving between columns
        //     const sourceColumn = columns[source.droppableId];
        //     const destinationColumn = columns[destination.droppableId];

        //     if (source.droppableId === destination.droppableId) {
        //         // Reordering items within the same column
        //         const newItems = Array.from(sourceColumn.items);
        //         newItems.splice(source.index, 1);
        //         newItems.splice(destination.index, 0, draggableId);

        //         setColumns({
        //             ...columns,
        //             [source.droppableId]: {
        //                 ...sourceColumn,
        //                 items: newItems,
        //             },
        //         });
        //     } else {
        //         // Moving items between columns
        //         const newSourceItems = Array.from(sourceColumn.items);
        //         newSourceItems.splice(source.index, 1);

        //         const newDestinationItems = Array.from(destinationColumn.items);
        //         newDestinationItems.splice(destination.index, 0, draggableId);

        //         setColumns({
        //             ...columns,
        //             [source.droppableId]: {
        //                 ...sourceColumn,
        //                 items: newSourceItems,
        //             },
        //             [destination.droppableId]: {
        //                 ...destinationColumn,
        //                 items: newDestinationItems,
        //             },
        //         });
        //     }
        // }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ display: "flex", overflowX: "auto", justifyContent: "center", margin: 20 }}
                    >
                        {Object.values(columns).map((column, index) => (
                            <Draggable key={column.id} draggableId={column.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        style={{
                                            background: "#456C86",
                                            padding: 8,
                                            margin: "0 8px",
                                            width: 200,
                                            minHeight: 300,
                                            ...provided.draggableProps.style,
                                        }}
                                    >
                                        <h2 {...provided.dragHandleProps} style={{ color: "white", textAlign: "center", marginBottom: "5px" }}>{column.id}</h2>
                                        {/* <Droppable droppableId={column.id} type="item">
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    style={{
                                                        background: provided.isDraggingOver
                                                            ? "lightblue"
                                                            : "lightgrey",
                                                        padding: 8,
                                                        minHeight: 200,
                                                    }}
                                                >
                                                    {column.items.map((item, index) => (
                                                        <Draggable
                                                            key={item}
                                                            draggableId={item}
                                                            index={index}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        userSelect: "none",
                                                                        padding: 16,
                                                                        margin: "0 0 8px 0",
                                                                        backgroundColor: "#263B4A",
                                                                        color: "white",
                                                                        ...provided.draggableProps.style,
                                                                    }}
                                                                >
                                                                    {item}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable> */}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ThreeColumnDnd;
