import { combineReducers } from "redux";
import {
  LOGIN_USER, ERROR_MSG, LOGOUT_USER, CHECK_USER,
  ADD_TASK, CLEAR_POST_TASK, SET_VALIDATION_HOC_CHECK,
  ADD_TASK_DETAIL, CLEAR_TASK_DETAIL, ADD_USER_ROLE,
  RELOAD_TASK_DETAIL, RELOAD_TASK_LIST,
  ADD_OFFER_DETAIL, CLEAR_OFFER_DETAIL,
  ADD_TASK_LIST
} from "./action-types";
import locations from '../pages/browse-tasks/redux/reducers/location'//jubi:add value
import price from '../pages/browse-tasks/redux/reducers/price'//jubi:add value
import distance from '../pages/browse-tasks/redux/reducers/distance'//jubi:add value
import inperson from '../pages/browse-tasks/redux/reducers/inperson'//jubi:add value
import assigned from '../pages/browse-tasks/redux/reducers/tasktype'//jubi:add value

const initUser = localStorage.getItem("user") ? { email: localStorage.getItem("user") } : {};
function user(state = initUser, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { email: action.email } || { ...state, errMsg: "unknown error" };
    case ERROR_MSG:
      const errMsg = action.msg;
      return { ...state, errMsg };
    case LOGOUT_USER:
      return {};
    case CHECK_USER:
      const readyToBid = action.readyToBid;
      return { ...state, readyToBid }
    default:
      return state;
  }
}

const initPostTask = { taskData: '' };
function postTask(state = initPostTask, action) {
  switch (action.type) {
    case ADD_TASK:
      const { taskData } = action;
      return { ...state, taskData: { ...state.taskData, ...taskData } }
    case SET_VALIDATION_HOC_CHECK:
      const { validationHocCheck } = action;
      return { ...state, validationHocCheck }
    case CLEAR_POST_TASK:
      return initPostTask
    default:
      return state;
  }
}

const initTaskDetail = { taskData: '' };
function taskDetail(state = initTaskDetail, action) {
  switch (action.type) {
    case ADD_TASK_DETAIL:
      const { taskData } = action;
      return { ...state, taskData: { ...state.taskData, ...taskData } }
    case CLEAR_TASK_DETAIL:
      return initTaskDetail
    case RELOAD_TASK_DETAIL:
      return { ...state, readyToReload: action.readyToReload }
    case ADD_USER_ROLE:
      return { ...state, userRole: action.userRole }
    default:
      return state
  }
}


const initTaskList = { listData: [] };
function taskList(state = initTaskList, action) {
  switch (action.type) {
    case ADD_TASK_LIST:
      return { ...state, listData: action.taskList }
    // case CLEAR_TASK_LIST:
    //   return initTaskDetail
    case RELOAD_TASK_LIST:
      return { ...state, readyToReload: action.readyToReload }
    default:
      return state
  }
}


const initOfferDetail = { offerData: '' };
function offerDetail(state = initOfferDetail, action) {
  switch (action.type) {
    case ADD_OFFER_DETAIL:
      const { offerData } = action;
      return { ...state, offerData: { ...state.offerData, ...offerData } }
    case CLEAR_OFFER_DETAIL:
      return initOfferDetail
    default:
      return state
  }
}

export default combineReducers({ user, postTask, taskDetail, taskList, offerDetail, locations, distance, price, inperson, assigned });//jubi:add value
