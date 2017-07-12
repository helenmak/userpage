const initialState = {
	showMsg: false
};

const reducer = (state = initialState, action) =>{

	let _state = { ...state }, _action = { ...action };

	switch(_action.type){
		case 'SHOW_MSG':
			_state = {...state,
				msg: _action.payload,
				showMsg: true
			};
			break;
		case 'HIDE_MSG':
			_state = {...state,
				msg: _action.payload,
				showMsg: false
			};
			break;
		default:
			return state;
	}
	return _state;
};

export default reducer;
