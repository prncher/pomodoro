import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { addTaskAction } from '../Actions';
import { TaskManager } from '../Components/taskmanager';

// tslint:disable-next-line:no-any
function mapStateToProps(state: any) {
    return {
        tasks: state.taskSettings.tasks
    };
}

// tslint:disable-next-line:no-any
function matchDispatchToProps(dispatch: Dispatch<any>) {
    return bindActionCreators({ addTask: addTaskAction }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskManager);
