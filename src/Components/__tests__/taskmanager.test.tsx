import *  as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { TaskManager } from '../taskmanager';
import { Task } from '../task';

describe('Task Manager Tests', () => {
    enzyme.configure({ adapter: new Adapter() });
    const t: Task = {
        id: 1,
        name: 'test',
        description: 'test description',
        duration: 100,
        rounds: 4,
        roundDuration: 25,
        interRoundBreak: 5,
        postTaskBreak: 30,
        isComplete: false,
    };
    const shallowWrapper = enzyme.shallow((
            <TaskManager tasks={[t]} addTask={(task) => ({ type: 'TASK_ADDED', task: t })} />
        ));
    
    it('TaskManager should have a header and a button to add task', () => {
            expect(shallowWrapper.find('h3').length).toBe(1);
            expect(shallowWrapper.find('button').length).toBe(1);
        });

    it('TaskManager click button to add task', () => {
            const button = shallowWrapper.find('button');
            expect(shallowWrapper.find('input').length).toBe(0);
            button.simulate('click');
            // There are 7 inputs and 2 buttons now.
            expect(shallowWrapper.find('input').length).toBe(7);
            expect(shallowWrapper.find('button').length).toBe(2);
        });
});