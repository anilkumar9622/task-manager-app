import React, { useState } from 'react';
import './App.css'
import AppLayout from './components/AppLayout';
import Header from './components/Header';
import { TaskProvider } from './context/TaskContext';
import 'antd/dist/reset.css'; // Ant Design v5+


function App() {
const [mobileOpen, setMobileOpen] = useState(false); 
  return (
    <>
      <div className="app">
        <Header toggleSidebar={() => setMobileOpen((p) => !p)}/>
        <div className="app-layout">
          <TaskProvider>
          <AppLayout mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          </TaskProvider>
        </div>
      </div>

    </>
  )
}

export default App
