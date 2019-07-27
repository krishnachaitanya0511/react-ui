import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Dashboard from "../dashboard/Dashboard";
import CreateProduct from '../product/create/CreateProduct';
import NotFound from '../common/notfound/NotFound'
import requireAuth from '../auth/TokenAuthentication';
import UserDashboard from '../dashboard/UserDashboard';
import UserProfile from '../auth/UserProfile';
import SignOut from '../auth/SignOut';
import Loading from "../common/loading/Loading";
import ShowProduct from '../product/show/ShowProduct';
import './Routes.css';

const Routes = () => (
	<div className='style'>
		<Switch>
			<Route exact path='/' component={Dashboard} />
			<Route exact path='/signin' component={SignIn} />
			<Route exact path='/signup' component={SignUp} />			
			<Route exact path='/loading' component={Loading} />

			<Route exact path='/signout' component={requireAuth(SignOut)} />
			<Route exact path='/home' component={ requireAuth(UserDashboard) } />
			<Route exact path='/profile' component={ requireAuth(UserProfile) } />
			<Route exact path='/product' component={ requireAuth(CreateProduct) } />
			<Route exact path='/showproduct/:id' component={ requireAuth(ShowProduct) } />

			<Route path='*' component={ NotFound } />	
		</Switch>
	</div>
);

export default Routes;
