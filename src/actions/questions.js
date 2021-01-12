import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addUserAnswer, addUserQuestion } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

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

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
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

export function handleAddQuestion ({ optionOne, optionTwo }) {
    showLoading()
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const question = {
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        }

        return saveQuestion(question)
        .then((question) => dispatch(addQuestion(question)))
        .then(({ question }) => dispatch(addUserQuestion(question)))
        .then(() => dispatch(hideLoading()))
    }
}