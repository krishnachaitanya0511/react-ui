import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const SignedInLinks = (props) => {
    return (
		<div className="collapse navbar-collapse" id="navbarsOptions">
			<ul className="navbar-nav ml-auto">
				<li className="nav-item dropdown">
					<Link className="nav-link dropdown-toggle" to="" id="welcomeUser" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">						
						<span className="icon-text">Welcome, { props.user.username }</span>
					</Link>
					<div className="dropdown-menu" aria-labelledby="welcomeUser">
						<Link className="dropdown-item" to='/profile'>							
							<span className="dropdown-text">Profile Settings</span>
						</Link>
						<Link className="dropdown-item" to='/signout'>							
							<span className="dropdown-text">Sign Out</span>
						</Link>                                                
					</div>
				</li>                                                                        
			</ul>
		</div>      	
    )
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
};

export default connect(mapStateToProps, null)(SignedInLinks);