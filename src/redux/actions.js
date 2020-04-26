import { LOGIN_USER, ERROR_MSG, LOGOUT_USER, CHECK_USER, ADD_TASK, CLEAR_POST_TASK, SET_VALIDATION_HOC_CHECK, ADD_TASK_DETAIL, ADD_USER_ROLE, CLEAR_TASK_DETAIL, RELOAD_TASK_DETAIL, RELOAD_TASK_LIST, ADD_OFFER_DETAIL, CLEAR_OFFER_DETAIL, ADD_TASK_LIST } from "./action-types";
import { reqLogin } from "../api/api";

export const loginUser = email => ({ type: LOGIN_USER, email });

export const logoutUser = () => {
  localStorage.removeItem("user");
  clearPostTask();
  clearOfferDetail();
  return { type: LOGOUT_USER };
};

export const displayLoginErr = msg => ({ type: ERROR_MSG, msg });

export const login = ({ email, password }) => {
  return async dispatch => {
    try {
      // send request
      const result = await reqLogin(email, password);
      if (result.status === 200) {
        dispatch(loginUser(email));
        localStorage.setItem("user", email);
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(displayLoginErr(error.response.data));
      }
    }
  };
};

export const checkUser = () => ({ type: CHECK_USER, readyToBid: true });


export const addTask = (taskData) => ({ type: ADD_TASK, taskData });
export const setValidationHocCheck = (validationHocCheck) => ({ type: SET_VALIDATION_HOC_CHECK, validationHocCheck })
export const clearPostTask = () => ({ type: CLEAR_POST_TASK });


export const addTaskDetail = (taskData) => ({ type: ADD_TASK_DETAIL, taskData });
export const addUserRole = (userRole) => ({ type: ADD_USER_ROLE, userRole });
export const clearTaskDetail = () => ({ type: CLEAR_TASK_DETAIL });
export const reloadTaskDetail = (readyToReload) => ({ type: RELOAD_TASK_DETAIL, readyToReload });

export const addTaskList = (taskList) => ({ type: ADD_TASK_LIST, taskList });
export const reloadTaskList = (readyToReload) => ({ type: RELOAD_TASK_LIST, readyToReload });

export const addOfferDetail = (offerData) => ({ type: ADD_OFFER_DETAIL, offerData });
export const clearOfferDetail = () => ({ type: CLEAR_OFFER_DETAIL });
