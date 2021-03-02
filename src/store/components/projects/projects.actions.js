import {ADD_PROJECT, EDIT_PROJECT, SET_PROJECTS, SET_ACTIVE_PROJECT, REMOVE_PROJECT} from "../../actionTypes";

export const addProject = () => dispatch => dispatch({type: ADD_PROJECT});

export const editProject = project => dispatch => dispatch({type: EDIT_PROJECT, payload: project});

export const setActiveProject = id => dispatch => dispatch({type: SET_ACTIVE_PROJECT, payload: id});

export const setProjects = projects => dispatch => dispatch({type: SET_PROJECTS, payload: projects});

export const removeProject = id => dispatch => dispatch({type: REMOVE_PROJECT, payload: id});
