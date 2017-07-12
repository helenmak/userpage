export const changeUserData = (user)=>{
	return {
		type: 'CHANGE_USERDATA',
		payload: user
	}
};

export const showMsg = (msg) =>{
	return {
		type: 'SHOW_MSG',
		payload: msg
	}
};

export const hideMsg = (msg) =>{
	return {
		type: 'HIDE_MSG',
		payload: msg
	}
};
