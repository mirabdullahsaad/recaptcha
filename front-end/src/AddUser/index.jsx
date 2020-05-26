import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import config from '../config';

const axios = require('axios').default;

const init_form_data = {
  email: '',
  name: '',
  recaptcha_token:'false',
};


const AddUser = (props) => {
  	
  	const [data, setData] = useState(init_form_data);

  	const [errors, setErrors] = useState({});

	const onChangeRecaptcha = (value) => {
		setData({
		  	...data,
		  	recaptcha_token: value,
		});
	}

	const createUser = (value) => {
		axios
		    .post(config.API_BASE + '/add-user', data, {})
	      	.then((res) => {
	        	console.log(res.data);
	        	alert(res.data.message);
	        	window.location.reload(false);
	      	})
	      	.catch((error) => {
	      		console.log(error.response.data);
	      		let data = error.response.data;
        		setErrors(data.errors);
	      	});
	}

	return (
		<div className="AddUser container">
			<br />
			<br />
			<form className="form-horizontal">
			    <div className="form-group">
			      	<label className="control-label col-sm-2" htmlFor="email">Email:</label>
			      	<div className="col-sm-10">
			        	<input type="email" className="form-control" id="email" placeholder="Enter email" name="email" required 
			        		onChange={(e) => {
			                    setData({
			                        ...data,
			                        email: e.target.value,
			                    });
			                }}
			        	/>
			        	{errors.email && (
							<span className="text-danger">
								{errors.email[0]}
							</span>
						)}
			      	</div>
			    </div>
			    <div className="form-group">
			      	<label className="control-label col-sm-2" htmlFor="name">Name:</label>
			      	<div className="col-sm-10">          
			        	<input type="text" className="form-control" id="name" placeholder="Enter name" name="name" required 
			        		onChange={(e) => {
			                    setData({
			                        ...data,
			                        name: e.target.value,
			                    });
			                }}
			        	/>
			        	{errors.name && (
							<span className="text-danger">
								{errors.name[0]}
							</span>
						)}
			      	</div>
			    </div>
			    <div className="form-group">        
				    <div className="col-sm-offset-2 col-sm-10">
				        <ReCAPTCHA
							sitekey={config.RECAPTCHA_SITEKEY}
							onChange={onChangeRecaptcha}
			            />
			            {errors.recaptcha_token && (
							<span className="text-danger">
								{errors.recaptcha_token[0]}
							</span>
						)}
				    </div>
			    </div>
			    <div className="form-group">        
			      	<div className="col-sm-offset-2 col-sm-10">
			        	<button type="button" className="btn btn-default" onClick={createUser}>Add user</button>
			      	</div>
			    </div>
			</form>
		</div>
	);
};

export default AddUser;