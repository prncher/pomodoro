import * as React from 'react';
import '../App.css';
import TaskManager from '../Containers/taskmanager';
import Tasks from '../Containers/tasks';
import TaskProgress from '../Containers/taskprogress';

class App extends React.Component {
  input: HTMLInputElement | null;

  render() {
    return (
      <div>
        <h2>Task Manager (Pomodoro)</h2>
        <hr />
        <TaskManager />
        <Tasks />
        <TaskProgress />
      </div>
    );
  }
}

export default App;
