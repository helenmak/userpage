const initialState = {

}

const reducer = (state = initialState, action) => {

	let _state = { ...state }, _action = {...action};

	switch (_action.type) {
		case 'CHANGE_USERDATA':
			for (let key in _action.payload) {
				_state[_action.payload.id][key] = _action.payload[key]
			}
			break;
		case 'AUTH_SUCCESS':
			_state = {
				...state,
				[_action.payload._id]: {
					username: _action.payload.username,
					email: _action.payload.email,
					uid: _action.payload._id,
					birthday: _action.payload.birthday,
					gender: _action.payload.gender,
					phones: _action.payload.phones,
					createTime: _action.payload.createTime
				}
			}
			break;
		default:
			return state;
	}
	return _state;
}

export default reducer;
