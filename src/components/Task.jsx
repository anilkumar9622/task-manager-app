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

import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import columnsFromBackend from './KanbanData';
import {
  DragDropContext,
  Droppable,
} from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import useTheme from '../hooks/useTheme';
import { useTasks } from '../context/TaskContext';

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

const ColumnWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 80vh;
`;
const COLUMN_META = {
  todo: { title: 'To‑do', color: '#6a1b9a', bg: 'rgba(106,27,154,.15)' },
  inProgress: { title: 'In Progress', color: '#ef6c00', bg: 'rgba(239,108,0,.15)' },
  done: { title: 'Done', color: '#10957d', bg: 'rgba(16,149,125,.15)' },
};

const COLUMN_ORDER = ['todo', 'inProgress', 'done']; // render order
export default function Task() {
  const { tasks, setTasks } = useTasks();
  const { theme } = useTheme();

  /* -------------------- group tasks by status --------------------- */
  const columns = useMemo(() => {
    const grouped = { todo: [], inProgress: [], done: [] };
    for (const t of tasks) {
      grouped[t.status]?.push(t);
    }
    return grouped;
  }, [tasks]);

  /* -------------------- drag / drop handler ----------------------- */
  const onDragEnd = ({ draggableId, source, destination }) => {
  if (!destination) return;

  const srcStatus = source.droppableId;
  const dstStatus = destination.droppableId;

  setTasks((prev) => {
    const next = [...prev];

    // 1. Find the task by draggableId
    const moveIdx = next.findIndex(t => String(t.id) === draggableId);
    if (moveIdx === -1) {
      console.error('Task not found:', draggableId);
      return prev;
    }

    // 2. Remove it safely
    const [moved] = next.splice(moveIdx, 1);

    // 3. Update status, completed, pending
    moved.status = dstStatus;
    moved.completed = dstStatus === 'done';
    moved.pending = dstStatus !== 'done';

    // 4. Insert it in the correct place
    let insertAt = next.findIndex((t, i) => {
      if (t.status !== dstStatus) return false;

      // count only tasks with same status
      const before = next
        .filter(tt => tt.status === dstStatus)
        .slice(0, destination.index);

      return i === next.indexOf(before[before.length - 1]) + 1;
    });

    // fallback if no insert point found
    if (insertAt === -1) insertAt = next.length;

    next.splice(insertAt, 0, moved);

    return next;
  });
};


  /* helper — keep tasks in the same order as list[] after mutation */
  function sortByList(status, list) {
    return list.map((t) => ({ ...t, status })); // already correct order
  }

  /* -------------------- render ------------------------------------ */
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <ColumnWrapper>
          {COLUMN_ORDER.map((colKey) => {
            const colMeta = COLUMN_META[colKey];
            const colItems = columns[colKey];

            return (
              <Droppable key={colKey} droppableId={colKey}>
                {(provided) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    $theme={theme}
                  >
                    <Title color={colMeta.color} bg={colMeta.bg}>
                      {colMeta.title}
                    </Title>

                    {colItems.map((task, idx) => (
                      <TaskCard key={task.id} item={task} index={idx} />
                    ))}

                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            );
          })}
        </ColumnWrapper>
      </Container>
    </DragDropContext>
  );
}
// export default Task;
