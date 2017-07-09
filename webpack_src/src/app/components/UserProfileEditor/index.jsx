import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from 'app/actions/auth'

import style from './style.scss';

class UserEditorForm extends React.Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
		}
	}

	renderFields = () => {
		if (this.props.userData && this.props.userId) {
			let user = this.props.userData[this.props.userId];
			const {username, email, birthday, gender, phones} = user;

			let field_name = ['Name', 'username', 'text', username];
			let field_birthday = ['Birthday', 'birthday', 'date', birthday]; //маска ввода, дата пикер
			let field_phones = ['Phone', 'phones', 'tel', phones[0]];
			let field_email = ['Email', 'email', 'email', email];
			let field_gender = ['Gender', 'gender', 'text', gender];

			let all_fields = [field_name, field_phones, field_gender, field_birthday, field_email];
			let formFields = [];

			for (let i = 0; i < all_fields.length; i++) {
				let inaccessible_input = <input type={all_fields[i][2]} id={all_fields[i][1]}
												defaultValue={all_fields[i][3]}
												readOnly />;
				let accessible_input = <input type={all_fields[i][2]} id={all_fields[i][1]}
												defaultValue={all_fields[i][3]}
												value={this.state[all_fields[i][1]]}
												onChange= {this.handleChange} />;
				formFields.push(
					<label key={all_fields[i][1]} htmlFor={all_fields[i][1]}>
						<h4>{all_fields[i][0]}</h4>
						{all_fields[i][2] === 'email'? inaccessible_input : accessible_input}
					</label>
				)
			}

			return (
				<div>
					<h2>Edit Profile</h2>
					{formFields}
					<input type="submit" value="Save"/>
				</div>
			)
		} else {
			return (
				<div>
					<h2>You are logged out</h2>
				</div> )
		}
	};

	handleChange(event){
		let name = event.target.id;
	 	this.setState({[name]: event.target.value, id: this.props.userId, modifyTime: new Date});
	}

	handleSubmit(event){
		event.preventDefault();
		//console.log(this.state);
		const { changeUserData } = this.props.actions;
		changeUserData(this.state);
		let options = { method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state) };
		fetch('/save_user_data', options)
			 .then((response)=> console.log(response))
				 //response.json)

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

const mapDispatchtoProps = (dispatch)=>{//change user data in store
	return { actions: bindActionCreators(authActions, dispatch) }
};

export default connect(mapStateToProps, mapDispatchtoProps)(UserEditorForm);
