import { createStore } from 'redux';
// import helloWorldReducer from '../reducers/helloWorldReducer';

const configureStore = (railsProps) => (
  createStore(function(){}, railsProps)
);

export default configureStore;
