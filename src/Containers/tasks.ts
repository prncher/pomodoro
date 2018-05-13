import { connect } from 'react-redux';
import { selectTaskAction } from '../Actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Tasks } from '../Components/tasks';

// tslint:disable-next-line:no-any
function mapStateToProps(state: any) {
    return {
        tasks: state.taskSettings.tasks
    };
}

// tslint:disable-next-line:no-any
function matchDispatchToProps(dispatch: Dispatch<any>) {
    return bindActionCreators({
        startTask: selectTaskAction
    },                        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Tasks);
