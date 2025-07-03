import { v4 as uuidv4 } from 'uuid';
import { useTasks } from '../context/TaskContext';
export const DONE_ID = uuidv4();
const useColumnsFromBackend = () => {
  const {
    tasks,
  } = useTasks();

  const todoId = uuidv4();
  const inProgressId = uuidv4();
  // const doneId = uuidv4();

  return {
    // [todoId]: {
    //   title: 'To-do',
    //   items: tasks,
    //   color: '#6a1b9a',
    //   background: 'rgba(106, 27, 154, 0.15)',
    // },
    [inProgressId]: {
      title: 'In Progress',
      items: [],
      color: '#ef6c00',
      background: 'rgba(239, 108, 0, 0.15)',
    },
    [DONE_ID]: {
      title: 'Done',
      items: [],
      color: '#10957d',
      background: 'rgba(16, 149, 125, 0.15)',
    },
  };
};

export default useColumnsFromBackend;