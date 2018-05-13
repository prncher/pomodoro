import * as React from 'react';
import { Task } from './task';

interface TaskProgressProps {
    activeTask: Task;
}

interface TaskProgressState {
    task: Task | null;
    rounds: number;
    roundDuration: number;
    interRoundBreak: number;
    postTaskBreak: number;
    cancelled: boolean;
    initialized: boolean;
    timerId: NodeJS.Timer | undefined;
}

export class TaskProgress extends React.Component<TaskProgressProps, TaskProgressState> {
    constructor(props: TaskProgressProps) {
        super(props);
        this.showTask = this.showTask.bind(this);
        this.showCancel = this.showCancel.bind(this);
        this.showRestart = this.showRestart.bind(this);
        this.startTask = this.startTask.bind(this);
    }

    componentWillReceiveProps(): void {
        if (this.state && this.state.timerId) { clearInterval(this.state.timerId); }
        this.setState({task: null, initialized: false, cancelled: false});
    }

    startTask(): void {
        const task = this.state.task ? this.state.task : this.props.activeTask;
        const stateSetter = () => {
            this.setState({timerId: setInterval(() => {
                if (!this.state.cancelled) {
                if (this.state.roundDuration > 0) {
                    this.setState({
                        roundDuration: this.state.roundDuration - 1
                    });
                } else if (this.state.roundDuration === 0 &&
                    this.state.rounds > 0 &&
                    this.state.interRoundBreak > 0) {
                    this.setState({
                        interRoundBreak: this.state.interRoundBreak - 1
                    });
                } else if (task && this.state.roundDuration === 0 &&
                    this.state.interRoundBreak === 0 &&
                    this.state.rounds > 0) {
                    this.setState({
                        rounds: this.state.rounds - 1,
                        roundDuration: task.roundDuration,
                        interRoundBreak: task.interRoundBreak
                    });
                }
            }

            },                                  1000)});
        };
        this.state.task ?
        this.setState({
            initialized: true,
        },            stateSetter           ) :
        this.setState({
            task: this.props.activeTask,
            roundDuration: this.props.activeTask.roundDuration,
            rounds: this.props.activeTask.rounds,
            interRoundBreak: this.props.activeTask.interRoundBreak,
            postTaskBreak: this.props.activeTask.postTaskBreak,
            cancelled: false,
            initialized: true
        },            stateSetter           );

    }

    componentDidUpdate() {
        if (this.state && this.state.initialized && this.state.cancelled) {
            this.startTask();
        } else if (this.props.activeTask && (!this.state || !this.state.initialized)) {
            if (this.state && this.state.cancelled) {
               return; 
            } 
            this.startTask();
        }
    }

    cancelTask(): void {
        // tslint:disable-next-line:no-unused-expression
        this.state.timerId && clearInterval(this.state.timerId);
        this.setState({cancelled: true, 
            initialized: false, 
            timerId: undefined});
    }

    showCancel(): JSX.Element | null {
        if (this.state && this.state.rounds > 0 && !this.state.cancelled) {
        return (
            <button onClick={() => this.cancelTask()}>Cancel The Task</button>
        );
        } else {
            return null;
        }
    }

    showRestart(): JSX.Element | null {
        if (this.state && this.state.rounds > 0 && this.state.cancelled) {
        return (
            <button onClick={() => this.setState({cancelled: false})}>Restart Task</button>
        );
        } else {
            return null;
        }
    }

    showTask(): JSX.Element {
        return (<div>
            <h2>Current Task Progress</h2>
            <div>
                {this.state && this.state.task && ' Name :' + this.state.task.name}
            </div><div>
                {this.state && 
                    !this.state.cancelled && 
                    this.state.roundDuration > 0 && 'This Round Duration :' + this.state.roundDuration}
            </div><div>
                {this.state && !this.state.cancelled && 
                    this.state.rounds > 0 && ' Round :' + this.state.rounds}
            </div><div>
                {this.state && this.state.roundDuration === 0 &&
                    this.state.rounds > 0 && !this.state.cancelled &&
                    ' Break Time :' + this.state.interRoundBreak}
                {this.state && !this.state.cancelled && this.state.roundDuration === 0 && this.state.rounds === 0 &&
                    ' Task Completed'}
            </div><div>
            {this.state && this.state.cancelled && ' Task Cancelled'}
            </div><div>
            {this.showCancel()}
            </div><div>
            {this.showRestart()}
            </div>
        </div>);
    }

    render() {
        return (
            <div>
                {this.props.activeTask && this.showTask()}
            </div>
        );
    }
}