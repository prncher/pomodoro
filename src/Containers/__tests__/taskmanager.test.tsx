import { addTaskAction, KnownAction } from '../../Actions';
import { Task } from '../../Components/task';
import { store } from '../../store';

describe('Task Manager Tests', () => {
    it('TaskManager adding new task', () => {
        const tasks: Task[] = [{
            id: 1,
            name: 'test 1',
            description: 'test 1 description',
            duration: 100,
            rounds: 4,
            roundDuration: 25,
            interRoundBreak: 5,
            postTaskBreak: 30,
            isComplete: false,
        }];

        const unsubscribe = store.subscribe(() => {
            expect(store.getState()).toBeDefined();
            // tslint:disable-next-line:no-any
            const storeTasks: Task[] = store.getState().taskSettings.tasks;
            expect(storeTasks).toBeDefined();
            expect(storeTasks.length).toBe(1);

            expect(storeTasks[0].id).toEqual(1);
            expect(storeTasks[0].description).toEqual('test 1 description');
            unsubscribe();
        });
        
        const action: KnownAction = store.dispatch(addTaskAction(tasks[0]));
        expect(action.type).toBe('TASK_ADDED');
    });
});