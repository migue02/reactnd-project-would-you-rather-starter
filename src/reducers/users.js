import { ADD_USER_ANSWER, RECEIVE_USERS } from '../actions/users'

export default function user (state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_USER_ANSWER:
            const { vote } = action

            return {
                ...state,
                [vote.authedUser]: {
                    ...state[vote.authedUser],
                    ['answers']: {
                        ...state[vote.authedUser].answers,
                        [vote.qid]: vote.answer
                    }
                }
            }
        default:
            return state;
    }
}