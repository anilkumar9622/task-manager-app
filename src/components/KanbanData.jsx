import { v4 as uuidv4 } from 'uuid';
import { useTasks } from '../context/TaskContext';
export const data = [
  {
    id: '1',
    Task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.',
    Due_Date: '25-May-2020',
  },
  {
    id: '2',
    Task: 'Fix Styling',
    Due_Date: '26-May-2020',
  },
  {
    id: '3',
    Task: 'Handle Door Specs',
    Due_Date: '27-May-2020',
  },
  {
    id: '4',
    Task: 'morbi',
    Due_Date: '23-Aug-2020',
  },
  {
    id: '5',
    Task: 'proin',
    Due_Date: '05-Jan-2021',
  },
];

const useColumnsFromBackend = () => {
  const {
    tasks,
  } = useTasks();

  const todoId = uuidv4();
  const inProgressId = uuidv4();
  const doneId = uuidv4();

  return {
    // [todoId]: {
    //   title: 'To-do',
    //   items: tasks,
    //   color: '#6a1b9a',
    //   background: 'rgba(106, 27, 154, 0.15)',
    // },
    [inProgressId]: {
      title: 'In Progress',
      items: tasks.filter((task) => task.completed === false),
      color: '#ef6c00',
      background: 'rgba(239, 108, 0, 0.15)',
    },
    [doneId]: {
      title: 'Done',
      items: tasks.filter((task) => task.completed === true),
      color: '#10957d',
      background: 'rgba(16, 149, 125, 0.15)',
    },
  };
};

export default useColumnsFromBackend;