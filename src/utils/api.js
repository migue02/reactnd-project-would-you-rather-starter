import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js'

export function getInitialData () {
  return _getUsers()
}

export function getQuestions () {
  return _getQuestions()
}

export function saveQuestion (info) {
  return _saveQuestion(info)
}

export function saveQuestionAnswer (info) {
  return _saveQuestionAnswer(info)
}