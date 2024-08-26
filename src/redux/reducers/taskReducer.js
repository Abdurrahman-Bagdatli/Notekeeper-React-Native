import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ADD_TO_LIST, FETCH_TASKS, REMOVE_FROM_LIST } from '../actions/actionsType'; // Türkçe karakterleri düzelttim
import { Task } from 'iconsax-react-native';

const initialState = {
  taskList: [
  ]
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_LIST:
      return {
        ...state,
        taskList: [...state.taskList, action.payload]
      };
    case REMOVE_FROM_LIST:
      return {
        ...state,
        taskList: state.taskList.filter(task => task.id !== action.payload)
      };
    case FETCH_TASKS:
      return {
        ...state,
        taskList: action.payload

      };
    default:
      return state;
  }
};

export default taskReducer;
