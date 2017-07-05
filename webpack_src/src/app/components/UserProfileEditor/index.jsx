import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MainPage from 'app/containers/MainPage';
import * as authSuccess from 'app/actions/auth';

import style from './style.scss';

class UserEditorForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			// 'Name': '',
			// 'E-mail': '',
			// 'Phone': ''
		};
	 	this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	//To Do: если неподтверждённый емейл, то кнопка "Отправить заново"
	//добавить пол, возраст, аллергии

	renderFields = () => {
		if (this.props.userData && this.props.userId) {
			let field_name = ['Name', 'username', 'text', `${this.props.userData[this.props.userId].username}`];
			let field_birthday = ['Birthday', 'birthday', 'date', '']; //убрать
			let field_phone = ['Phone', 'phone', 'tel', ''];
			// let bt_plusPhone = ['Add number', 'user_plusPhone', 'button'];
			let fields = [field_name, field_birthday, field_phone];

			let arrFields = [];
			for (let i = 0; i < fields.length; i++) {
				arrFields.push(
					<label key={fields[i][1]} htmlFor={fields[i][1]}>
					<h4>{fields[i][0]}</h4>
					<input type={fields[i][2]} id={fields[i][1]}
						   //defaultValue={fields[i][3]}
						   value={this.state[fields[i][0]]}
						   onChange={this.handleChange} />
					</label>
				)}

			return (
				<div>
					<h2>Edit Profile</h2>
					{arrFields}
					<input type="submit" value="Save"/>
				</div> )
		} else {
			return (
				<div>
					<h2>You are logged out</h2>
				</div> )
		}
	};

	handleChange(event){
		let name = event.target.id;
	 	this.setState({[name]: event.target.value, id: this.props.userId});
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state);
		let options = { method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state) };
		fetch('/save_user_data', options)
			 //.then((response)=>response.json)
	}

	render() {
		return (
			<form name ='profileEditor' className={style.form} onSubmit={this.handleSubmit}>
				{this.renderFields()}
			</form>

		)
	}
}

const mapStateToProps = (state)=>{ //from reducers
	return {
		userId: state.common.user,
		userData: state.users
	}
};


export default connect(mapStateToProps)(UserEditorForm);
