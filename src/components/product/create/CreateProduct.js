import React, { Component } from 'react';
import './CreateProduct.css';
import Notifications, { notify } from 'react-notify-toast';
import {Redirect} from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import { connect } from 'react-redux';
import { createProduct } from '../../../store/actions/productActions';
import { CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_ERROR } from '../../../store/types/productTypes';

class CreateProduct extends Component {
    state = {
        product: '',
        parent_product_id: '',
        description: '',
        creator_id: '',
        is_active: true
    }
    
    componentDidMount() {
        this.setState({
            creator_id: this.props.user.current_user.id
        });        
    }
    
    handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProduct(this.state);	
    }

    render() {
        const options = {
			zIndex: 200, top: '50px'
        }
        if (this.props.product.status === CREATE_PRODUCT_SUCCESS) {
            return (
                <Redirect to='/home' />
            )
        }
        else if(this.props.product.status === CREATE_PRODUCT_ERROR) {
            if(this.props.product.error !== null)
                if(this.props.product.error.response !== undefined && this.props.product.error.response.status === 401)
                    notify.show(this.props.user.error.response.data['message'], 'error', 3000, 'red');
            else
                notify.show("Unable to create product...", 'error', 3000, 'red');            
            this.props.product.error = null;
        }        
        return ( 
            <div>
                <Notifications options={{ options }}/>
                { this.props.product.loading ? <Loading /> :
                    <div className="container add-product">
                        <form action="/product" onSubmit={this.handleSubmit} method="POST">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <h3 className="header">Add Product / Topic</h3>
                                    </div>
                                </div>
                                <div className="col-md-2 col-sm-2">
                                    <div className="form-group">
                                        <input className="btn btn-md btn-success" id="submit" name="submit" type="submit" value="Upload"/>
                                    </div>
                                </div>
                                <div className="col-md-2 col-sm-2">
                                    <div className="form-group">
                                        <input className="btn btn-md btn-secondary" id="clear" name="clear" type="button" value="Clear"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="product"><b><u>Product name</u></b></label>
                                        <input className="form-control form-control-sm" id="product" name="product" required="" type="text" autoComplete="product-name" value={this.state.product} onChange={this.handleChange}/>
                                    </div>                            
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="parent"><b><u>Parent product / topic</u></b></label>
                                        <input className="form-control form-control-sm" id="parent_product_id" name="parent_product_id" required="" type="text" autoComplete="parent-product-id" value={this.state.parent_product_id} onChange={this.handleChange}/>
                                    </div>                            
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="description"><b><u>Description</u></b></label>
                                        <textarea className="form-control form-control-sm description" id="description" name="description" required="" autoComplete="description" value={this.state.description} onChange={this.handleChange}/>
                                    </div>                            
                                </div>
                            </div>
                        </form>                        
                    </div>
                }
            </div>
        );        
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
        createProduct: (product) => dispatch(createProduct(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);