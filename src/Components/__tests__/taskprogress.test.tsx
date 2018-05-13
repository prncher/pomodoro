import *  as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { TaskProgress } from '../taskprogress';
import { Task } from '../task';

describe('Task Progress Tests', () => {
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
    const shallowWrapper = enzyme.mount((
            <TaskProgress activeTask={t} />
        ));
    
    it('TaskProgress should have a header', () => {
            expect(shallowWrapper.find('h2').length).toBe(1);
        });
});