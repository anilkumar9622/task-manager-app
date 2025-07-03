// import React from 'react';
// // import './styles/TodayTasks.css';

// export default function TaskPanel() {
//   return (
//     <aside className="today-tasks">
//       <h3>Today’s Tasks</h3>
//       <ul className="task-list">
//         <li className="task-item">Complete UI Design</li>
//         <li className="task-item">API Integration</li>
//         <li className="task-item">Test User Flow</li>
//       </ul>
//       <style>
//         {`
//         .today-tasks {
//   width: 260px;
//   // background-color: #f4f4f4;
//   padding: 20px;
//   border-left: 1px solid #ddd;
//   flex-shrink: 0;
// }

// .today-tasks h3 {
//   font-size: 18px;
//   margin-bottom: 15px;
// }

// .task-list {
//   list-style: none;
//   padding: 0;
// }

// .task-item {
//   padding: 10px;
//   // background: white;
//   margin-bottom: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// }

//         `}
//       </style>
//     </aside>
//   );
// }

import { Button, Flex, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
// import './styles/TodayTasks.css';
import { ExclamationCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
export default function TaskPanel() {
  const {
    tasks,
    setTasks,
    addTask,
    deleteTask,
    toggleComplete,
    filter,
    setFilter,
  } = useTasks();
  // const [showModal, setShowModal] = useState(false);
  // const [filter, setFilter] = useState('all');
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (e) => {
   setIsValid(input == "" ? true : false)

    e.preventDefault();
    if (!input.trim()) return;
    // addTask(input);
    // setTasks((prev)=>[...tasks, ...prev])
    //  if (!input.trim()) return;
    addTask(input.trim());
    setInput('');
    setIsModalOpen(false);
    
  };

  const filteredTasks = tasks.filter((task) =>
    filter === 'completed'
      ? task.completed
      : filter === 'pending'
        ? !task.completed
        : true
  );


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isModalCom, setIsModalCom] = useState(false);
  const [isDeleteCom, setIsDeleteCom] = useState(false);
  const [modalType, setModalType] = useState(null);

  const showCompleteModal = (val) => {
    setModalType(val);
    setIsModalCom(true);
  };

  const handleComCancel = () => {
    setIsModalCom(false);
  };
  const [itemId, setItemId] = useState()
  return (
    <aside className="today-tasks">
      <div className="task-header">
        <h3>Tasks</h3>
        <button className="add-task-button" onClick={showModal}>+ Add Task</button>
      </div>

      <div className="task-tabs">
        {['all', 'completed', 'pending'].map(tab => (
          <button
            key={tab}
            className={filter === tab ? 'active' : ''}
            onClick={() => setFilter(tab)}
            style={{ fontWeight: "500" }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <ul className="task-list">
        {filteredTasks.map((data, index) => (
          <li key={index} className="task-item">
            <p style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px", marginBottom: "10px" }}
              className={`${data.completed ? 'completed' : ''}`}
            >
              {data.text}
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ marginRight: "auto" }}>
                <p style={{ marginBottom: "0px", fontSize: "13px", color: "#888" }}>
                  {data.Due_Date}
                </p>
              </div>

              <Flex gap="small" wrap>
                {!data?.completed &&
                  <Button color="cyan" variant="solid"
                    onClick={() => { showCompleteModal("complete"); setItemId(data?.id) }}
                  >
                    Complete
                  </Button>}
                <Button color="danger" variant="solid"
                  onClick={() => showCompleteModal("delete")}>
                  Delete
                </Button>
              </Flex>
            </div>
          </li>
        ))}

        {/* <li className="task-item">Create Wireframe</li>
        <li className="task-item">Review with Client</li> */}
      </ul>

      {/* {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h4>Add New Task</h4>
            <input type="text" placeholder="Task title..." />
            <button>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )} */}

      <Modal
        title="Add New Task"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Input placeholder="Enter Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ marginBottom: "20px" }} />
         {isValid && "Task title is required"}
      </Modal>
      <Modal
        open={isModalCom}
        title={
          <span>
            <ExclamationCircleOutlined style={{ marginRight: 8, color: "orangered" }} />
            {modalType === 'delete' ? "Delete Item" : "Mark Complete"}
          </span>
        }
        onOk={() => { modalType === 'delete' ? deleteTask(itemId) : toggleComplete(itemId); handleComCancel() }}
        //  icon: <ExclamationCircleOutlined />
        onCancel={handleComCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            {/* <Button>Custom Button</Button> */}
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <p>Are sure you want to {modalType == 'delete' ? "Delete Item" : "mark completed"}</p>
      </Modal>
      <style>{`
        .today-tasks {
          width: 320px;
          padding: 20px;
          border-left: 1px solid #ddd;
          flex-shrink: 0;
          
        }

        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .task-header h3 {
          font-size: 20px;
          font-weight: 600;
        }

        .add-task-button {
          // background-color: rgba(25, 118, 210, 0.15);
          // color: #1976d2;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }

        .task-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px
        }

        .task-tabs button {
          border: none;
          background: none;
          padding: 6px 10px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
          // color: white;
        }

        .task-tabs .active {
          background-color: #007bff;
          color: white;
        }

        .task-list {
          list-style: none;
          padding: 0;
          overflow-y: auto;
          overflow-x: hidden;
          height: 80%;
          padding-right: 0.5rem;
        }
.task-list::-webkit-scrollbar {
  width: 8px;
}
        .task-item {
          padding: 12px;
          // background: white;
          margin-bottom: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 400;
          border-bottom: 1px solid #ddd;
        }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          padding: 20px;
          border-radius: 8px;
          min-width: 500px;
          animation: fadeIn 0.3s ease-in-out;
          top: 140px;
          position: absolute;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
.completed {
  text-decoration: line-through;
  color: #999; /* Optional: grey out text */
}

      `}</style>
    </aside>
  );
}