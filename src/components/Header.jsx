import React from 'react';
import profileLogo from '../assets/profile.png'
import { AlignRightOutlined } from '@ant-design/icons';
// import './App.css'
export default function Header({toggleSidebar}) {
  const date = new Date();
    const dateString = date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
  });

    const timeString = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return (
     <header className="header">
   
      <div className="header-left">

       <div><img src={profileLogo} alt="profile" className="profile-img bg-outline" style={{marginRight:"8px"}} />
        <span className="profile-name">Anil Kumar</span>
        </div> 
          <button
          className="burger-btn"
          aria-label="Open sidebar"
          onClick={toggleSidebar}
        >
        {/* <FiMenu size={24} /> */}
        <AlignRightOutlined style={{fontSize:"20px"}}/>
      </button>
      </div>


      <div className="header-center">
        <input type="text" placeholder="Find your Task..." className="search-bar" />
      </div>

     
      <div className="header-right">
        <div className="time">
          <span className="clock">{timeString}</span>
          <span className="date">{dateString}</span>
        </div>
        <button className="icon-btn bg-outline">📩</button>
        <button className="icon-btn bg-outline">🔔</button>
      </div>
      <style>
        {`
   
        .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 20px;
  // background-color: #fff;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
 
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 150px;
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-name {
  font-weight: 500;
}

.header-center {
  flex: 2;
  text-align: center;
  min-width: 250px;
}

.search-bar {
  width: 100%;
  // max-width: 400px;
  padding: 12px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 32px;
  text-align: right;
  flex: 1;
  justify-content: flex-end;
  min-width: 200px;
}

.time {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  // color: #333;
}

.clock {
  font-weight: bold;
  font-size: 14px;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
  .bg-outline{
     width: 36px;
     height: 36px;
     border-radius: 50%;
    border: 1px solid #ddd;

  }

/* Responsive layout */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-center {
    width: 100%;
    text-align: left;
    margin: 10px 0;
  }

  .search-bar {
    width: 100%;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .header          { flex-direction: row; }          /* stay in a single line */
  .header-left     { width:100%; }                   /* full‑width row 1 */
  .header-center   { width:100%; margin:10px 0; }    /* row 2 */
  .header-right    { width:100%; justify-content:space-between; } /* row 3 */

  .burger-btn {
    display: inline-flex;
    margin-left: auto;       /* pushes it flush right within header-left */
    background: none;
    border: none;
  }
}
  @media (min-width: 769px) {
  .burger-btn { display: none; }
}

        `}
      </style>
    </header>
  );
}
