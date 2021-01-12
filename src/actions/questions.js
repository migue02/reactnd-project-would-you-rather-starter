import { saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addUserAnswer } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestionAnswer (vote) {
    return {
        type: ADD_QUESTION_ANSWER,
        vote
    }
}

export function handleSaveQuestionAnswer (qid, answer) {
    showLoading()
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const vote = {
            qid,
            authedUser,
            answer
        }
        return saveQuestionAnswer(vote)
        .then(() => dispatch(addQuestionAnswer(vote)))
        .then(() => dispatch(addUserAnswer(vote)))
        .then(() => dispatch(hideLoading()))
    }
}