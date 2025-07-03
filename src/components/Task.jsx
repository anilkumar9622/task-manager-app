// // Task.jsx
// import React, { useState } from 'react';
// import { useTasks } from '../context/TaskContext';
// import TaskItem from './TaskItem';
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
// } from '@hello-pangea/dnd';
// // import './styles/Task.css';

// export default function Task() {
//   const {
//     tasks,
//     setTasks,
//     addTask,
//     deleteTask,
//     toggleComplete,
//     filter,
//     setFilter,
//   } = useTasks();

//   const [input, setInput] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;
//     addTask(input);
//     setInput('');
//   };

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
//     const updated = Array.from(filteredTasks);
//     const [moved] = updated.splice(result.source.index, 1);
//     updated.splice(result.destination.index, 0, moved);
//     setTasks(updated);
//   };

//   const filteredTasks = tasks.filter((task) =>
//     filter === 'completed'
//       ? task.completed
//       : filter === 'pending'
//       ? !task.completed
//       : true
//   );

//   return (
//     <div className="task-panel">
//       <form onSubmit={handleSubmit} className="task-form">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Add a task..."
//         />
//         <button type="submit">Add</button>
//       </form>

//       <div className="task-filters">
//         {['all', 'completed', 'pending'].map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f)}
//             className={filter === f ? 'active' : ''}
//           >
//             {f.charAt(0).toUpperCase() + f.slice(1)}
//           </button>
//         ))}
//       </div>

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="tasks">
//           {(provided) => (
//             <ul
//               className="task-list"
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               {filteredTasks.map((task, index) => (
//                 <Draggable
//                   key={task.id}
//                   draggableId={String(task.id)}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <TaskItem
//                       task={task}
//                       innerRef={provided.innerRef}
//                       dragHandleProps={provided.dragHandleProps}
//                       draggableProps={provided.draggableProps}
//                       toggleComplete={toggleComplete}
//                       deleteTask={deleteTask}
//                     />
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </DragDropContext>
//       <style>

//       </style>
//     </div>
//   );
// }

import React, { useState } from 'react';
import styled from '@emotion/styled';
import  columnsFromBackend  from './KanbanData';
import {
  DragDropContext,
  Droppable,
} from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import useTheme from '../hooks/useTheme';

const Container = styled.div`
  display: flex;
  overflow-x: auto;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
//   background: ${(props) => props.$theme == "dark" ? "#2a2a3c" : " #f3f3f3"};
background: #f3f3f3;
  min-width: 270px;
  border-radius: 5px;
  padding: 15px;
  margin-right: 20px;
  cursor: grab;
`;

const TaskColumnStyles = styled.div`
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
    color: ${(props) => props.color || '#333'};
  background: ${(props) => props.bg || 'rgba(0, 0, 0, 0.05)'};
  padding: 8px 10px;
  border-radius: 5px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const Task = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const { theme } = useTheme()
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    // Moving across columns
    if (source.droppableId !== destination.droppableId) {
      const sourceItems = [...sourceCol.items];
      const destItems = [...destCol.items];
      const [moved] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, moved);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destCol,
          items: destItems,
        },
      });
    } else {
      // Reordering within same column
      const items = [...sourceCol.items];
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <TaskList
                  $theme={theme}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Title color={column.color} bg={column.background}>{column.title}</Title>
                  {column.items.map((item, index) => (
                    <TaskCard key={item.id} item={item} index={index} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>

          ))}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
  );
};

export default Task;
