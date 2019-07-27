import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../common/loading/Loading';
import { ProductCard } from '../product/show/ProductCard';
import { getProducts } from '../../store/actions/productActions';
import './UserDashboard.css';
import { GET_PRODUCTS_SUCCESS } from '../../store/types/productTypes';

class UserDashboard extends Component {
	constructor(props) {
		super(props);
		this.props.getProducts({
			creator_id: this.props.user.current_user.id,
			count: 3
		});
	}
	renderProductList() {
		if(this.props.product.loading) {
			return (<Loading />);
		} 
		else if (this.props.product.status === GET_PRODUCTS_SUCCESS){
			return (
				this.props.product.products.map((productObj, index) => {
					return (<ProductCard key={ index } id={ productObj.id } product={ productObj.product } description={ productObj.description } adder={ this.props.user.username } />);
				})
			);
		}
		else {
			const exams_style = {
				'margin': '0px 0px 25px 15px' 
			}
			return (<div style={ exams_style }>Unable to retrieve products...</div>);
		}
  	}
	render() {
		const exams_style = {
			'margin': '0px 0px 25px 15px' 
		}
		const products_style = {
			'margin': '0px 0px 25px 0px' 
		}		
		return (
			<div className="container">
				<div className="row">
					<div className="col col-centered wrapper">
						<h3 className="border-bottom mb-5 h3 mb-5 font-header">Recent Products / Topics</h3>
						<div style={ products_style }>							
							{this.renderProductList()}
						</div>
						<Link to="/product" className="nav-item nav-link">                    
							<span className='add-product-link'>Add Product</span>
						</Link>
					</div>
				</div>
				<div className="row">
					<div className="col col-centered wrapper">
						<h3 className="border-bottom mb-5 h3 mb-5 font-header">Recent Products</h3>
						<p style={ exams_style }>No Products added recently...</p>
					</div>            
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
    	product: state.product,
    	user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
      getProducts: (params) => dispatch(getProducts(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);