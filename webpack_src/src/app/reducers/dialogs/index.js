import {combineReducers} from 'redux';

import authForm from './authForm';
import infoMsg from './infoMsg'

export default combineReducers({
	authForm,
	infoMsg
});
