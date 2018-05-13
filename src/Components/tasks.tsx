import * as React from 'react';
import { Task, CommonState } from './task';
import { KnownAction } from '../Actions';

export interface TasksProps {
    tasks: Task[];
    startTask: (task: Task) => KnownAction;
}

export class Tasks extends React.Component<TasksProps, CommonState> {
    constructor(props: TasksProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Click on a task to start</h2>
                <h4>Tasks</h4>
                <ol>
                    {
                        Array.isArray(this.props.tasks) &&
                        this.props.tasks.map((s, i) => {
                            return (<li key={s.id} onClick={() => this.props.startTask(s)}>
                                <div>Name: {s.name}</div>
                                <div>Description: {s.description}</div>
                                <div>Duration: {s.duration}</div>
                                <div>Rounds: {s.rounds}</div>
                                <div>RoundDuration: {s.roundDuration}</div>
                                <div>InterRoundBreak: {s.interRoundBreak}</div>
                                <div>PostTaskBreak: {s.postTaskBreak}</div>
                            </li>);
                        })
                    }
                </ol>
            </div>
        );
    }
}
