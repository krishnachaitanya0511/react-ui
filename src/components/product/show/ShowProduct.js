import React, { Component } from 'react';
import './ShowProduct.css';
import { Link } from 'react-router-dom';
import Notifications, { notify } from 'react-notify-toast';
import Loading from '../../common/loading/Loading';
import { connect } from 'react-redux';
import { getProduct } from '../../../store/actions/productActions';
import { GET_PRODUCT_ERROR, GET_PRODUCT_SUCCESS } from '../../../store/types/productTypes';

export class ShowProduct extends Component {  
    constructor(props) {
        super(props);
        this.props.getProduct({id: this.props.match.params.id});
    }

    renderProduct() {        	
		if (this.props.product.status === GET_PRODUCT_ERROR) {
            if(this.props.product.error !== null)
                if(this.props.product.error.response !== undefined && this.props.product.error.response.status === 401)
                    notify.show(this.props.user.error.response.data['message'], 'error', 3000, 'red');
            else
                notify.show("Unable to retrieve product...", 'error', 3000, 'red');

			const exams_style = {
				'margin': '0px 0px 25px 15px' 
            }
            
			return (<div style={ exams_style }>Unable to retrieve product...</div>);
		}
		else if (this.props.product.status === GET_PRODUCT_SUCCESS) {		
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="container show-product">                      
                                <div className="row">
                                    <div className="col-*">
                                        <div className="form-group">
                                            <div><b><u>Product</u></b></div>
                                        </div>
                                    </div>
                                </div>                    
                                <div className="row">
                                    <div className="col-*">
                                        <div className="form-group">
                                            { this.props.product.current_product.product }
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-*">
                                        <div className="form-group">
                                            <div><b><u>Parent product</u></b></div>
                                        </div>
                                    </div>
                                </div>                    
                                <div className="row">
                                    <div className="col-*">
                                        <div className="form-group">
                                            { this.props.product.current_product.parent_product_id === null ? 'N/A' : this.props.product.current_product.parent_product_id }
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-*">
                                        <div className="form-group">
                                            <div><b><u>Description</u></b></div>
                                        </div>
                                    </div>
                                </div>                    
                                <div className="row">
                                    <div className="col-*">
                                        <div className="form-group">
                                            { this.props.product.current_product.description }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <Link to="/question" className="nav-item nav-link">                    
                                <span className='add-question-link'>Add Question</span>
                            </Link>
                            <Link to="/exam" className="nav-item nav-link">                    
                                <span className='add-question-link'>Add Product</span>
                            </Link>
                        </div>
                    </div>                    
                </div>
			);
        }
        else {
            return (<Loading />);
        }
    }
    render() {
        const options = {
			zIndex: 200, top: '50px'
        }
        const products_style = {
			'margin': '25px 0px 25px 0px' 
        }
        return (
            <div>
                <Notifications options={{ options }}/>
                <div style={ products_style }>							
                    { this.renderProduct() }
                </div>                                               
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
        getProduct: (params) => dispatch(getProduct(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowProduct);
