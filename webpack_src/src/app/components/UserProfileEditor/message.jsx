import React from 'react';
import { connect } from 'react-redux';

import style from './style.scss';

const Message = (props) =>{
	return (
		<div className={props.infoMsg.showMsg ? style.showMsg : style.hideMsg}>
			<h3>{props.infoMsg.msg}</h3>
		</div>
	)
};

const mapStatetoProps = (state) =>{
	return {
		infoMsg: state.dialogs.infoMsg
	}
};


export default connect(mapStatetoProps)(Message);
