import { connect } from 'react-redux';
import { TaskProgress } from '../Components/taskprogress';

// tslint:disable-next-line:no-any
function mapStateToProps(state: any) {
    return {
        activeTask: state.taskSettings.selectTask
    };
}

export default connect(mapStateToProps)(TaskProgress);