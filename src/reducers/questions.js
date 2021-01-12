import { RECEIVE_QUESTIONS, ADD_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION_ANSWER:
            const { vote } = action

            return {
                ...state,
                [vote.qid]: {
                    ...state[vote.qid],
                    [vote.answer]:{
                        ...state[vote.qid][vote.answer],
                        votes: state[vote.qid][vote.answer].votes.concat([vote.authedUser])
                    }
                }
            }
        case ADD_QUESTION:
            const { question } = action

            return {
                ...state,
                [question.id]: question
            }
        default:
            return state;
    }
}