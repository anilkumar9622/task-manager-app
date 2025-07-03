// AppLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import TaskPanel from './TaskPanel';
import Task from './Task';
// import './styles/AppLayout.css';

export default function AppLayout(props) {
  return (
    <>
      <Sidebar mobileOpen={props?.mobileOpen} setMobileOpen={props?.setMobileOpen} />
      <div className="main-content">
        <div className="dashboard-placeholder">
          <Task/>
        </div>
      </div>
      <TaskPanel />

      <style>
       {`
       
       .app-layout {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.dashboard-placeholder {
  height: 70vh;
  border: 2px dashed #ccc;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  color: #888;
}

@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
    min-height: 90vh;
    overflow: auto;
  }

  .sidebar,
  .today-tasks {
    width: 100%;
    border: none;
  }

 
.main-content {
  flex: 1 1 auto;   /* take the remaining space */
  min-height: 100vh;    /* 🔑 let it shrink inside flex */
  overflow-y: auto; /* vertical scroll */
  padding: 10px;
  box-sizing: border-box;
}

 
}



       `}
      </style>
    </>
  );
}
