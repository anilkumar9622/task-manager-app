import React from 'react';
import './App.css'
import AppLayout from './components/AppLayout';
import Header from './components/Header';
import { TaskProvider } from './context/TaskContext';
import 'antd/dist/reset.css'; // Ant Design v5+


function App() {

  return (
    <>
      <div className="app">
        <Header />
        <div className="app-layout">
          <TaskProvider>
          <AppLayout />
          </TaskProvider>
        </div>
      </div>

    </>
  )
}

export default App
