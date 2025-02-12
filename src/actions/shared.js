import { getUsers, getQuestions } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { showLoading, hideLoading} from 'react-redux-loading'

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.all([
            getUsers(),
            getQuestions()
        ]).then(([users, questions]) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
        })
    }
}

export function handleQuestionsData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getQuestions()
            .then((questions) => {
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}