import React from 'react';
import Register from './Register';
import Login from './Login';
import CreateTask from './CreateTask';
import Notification from './Notification';
import TaskReport from './TaskReport';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Task Manager App</h1>
      </header>
      <main>
        <Register />
        <Login />
        <CreateTask />
        <Notification />
        <TaskReport />
      </main>
    </div>
  );
}

export default App;
