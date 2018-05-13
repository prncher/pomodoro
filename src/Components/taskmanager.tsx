import * as React from 'react';
import { Task, CommonState } from '../Components/task';
import { KnownAction } from '../Actions';
import { store } from '../store';

export interface TaskProps {
    tasks: Task[];
    addTask: (task: Task) => KnownAction;
}

interface InternalState {
    addingTask: boolean;
}

type TaskManagerState = CommonState & InternalState;
export class TaskManager extends React.Component<TaskProps, TaskManagerState> {
    emptyTask: Task;
    constructor(props: TaskProps) {
        super(props);
    }

    componentDidMount() {
        this.setState({tasks: store.getState().taskSettings.tasks, addingTask: false});
       // this.setState({ addingTask: false, tasks: [] });
    }

    clone(): Task {
        return JSON.parse(JSON.stringify(this.emptyTask));
    }

    addNewTask(): void {
        // const tasks = this.state.tasks.concat(this.clone());
        this.setState({
            addingTask: false
        });

        this.props.addTask(this.emptyTask);
    }

    addTask(): void {
        const id = store.getState().taskSettings.tasks.length + 1;
      //  const id: number = this.state && this.state.tasks ? this.state.tasks.length + 1 : 1;
        this.emptyTask = {
            id: id,
            name: 'test ' + id,
            description: 'test ' + id + ' description',
            duration: 100,
            rounds: 4,
            roundDuration: 25,
            interRoundBreak: 5,
            postTaskBreak: 30,
            isComplete: false,
        };
    
        this.setState({ addingTask: true });
    }

    editTask(): JSX.Element {
        return (
            <div>
                <div><h3>Enter Task Details</h3></div>
                <div><label className="label">Name</label>
                    <input
                        type="text"
                        min={4}
                        max={30}
                        defaultValue={this.emptyTask.name}
                        onChange={(e) => { this.emptyTask.name = e.target.value; }}
                    />
                </div><div>
                    <label className="label">Description</label>
                    <input
                        type="text"
                        min={10}
                        max={30}
                        defaultValue={this.emptyTask.description}
                        onChange={(e) => { this.emptyTask.description = e.target.value; }}
                    /></div><div>
                    <label className="label">Duration (seconds)</label>
                    <input
                        type="number"
                        min={25}
                        max={100}
                        defaultValue={this.emptyTask.duration.toString()}
                        onChange={(e) => { this.emptyTask.duration = parseInt(e.target.value, 10); }}
                    /></div><div>
                    <label className="label">Rounds</label>
                    <input
                        type="number"
                        min={0}
                        max={4}
                        defaultValue={this.emptyTask.rounds.toString()}
                        onChange={(e) => { this.emptyTask.rounds = parseInt(e.target.value, 10); }}
                    /></div><div>
                    <label className="label">RoundDuration (seconds)</label>
                    <input
                        type="number"
                        min={0}
                        max={25}
                        defaultValue={this.emptyTask.roundDuration.toString()}
                        onChange={(e) => { this.emptyTask.roundDuration = parseInt(e.target.value, 10); }}
                    /></div><div>
                    <label className="label">InterRoundBreak (seconds)</label>
                    <input
                        type="number"
                        min={3}
                        max={5}
                        defaultValue={this.emptyTask.interRoundBreak.toString()}
                        onChange={(e) => { this.emptyTask.interRoundBreak = parseInt(e.target.value, 10); }}
                    /></div><div>
                    <label className="label">PostTaskBreak (seconds)</label>
                    <input
                        type="number"
                        min={15}
                        max={30}
                        defaultValue={this.emptyTask.postTaskBreak.toString()}
                        onChange={(e) => { this.emptyTask.postTaskBreak = parseInt(e.target.value, 10); }}
                    />
                    <button onClick={() => this.addNewTask()}
                    >+</button>
                </div></div>);
    }

    render() {
        return (
            <div>
                <h3>Click the button to add a new task</h3>
                <button onClick={() => this.addTask()}>Add Task</button>
                {
                    this.state && this.state.addingTask && this.editTask()
                }
            </div>
        );
    }
}
