export interface Task {
    id: number;
    name: string;
    description: string;
    duration: number;
    rounds: number;
    roundDuration: number;
    interRoundBreak: number;
    postTaskBreak: number;
    isComplete: boolean;
}

export interface ActiveState {
    activeTask: Task | {};
}

export interface CommonState {
    tasks: Task[];
    addTask: Task[];
    selectTask: Task | undefined;
}