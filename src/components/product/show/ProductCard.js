import React, {Component} from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export class ProductCard extends Component {
    render() {
        const url = '/showproduct/' + this.props.id;
        return (              
            <Link to={ url } className='card-container'>
                <Card>
                    <Card.Header>{this.props.product}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                        <p>
                            {' '}{this.props.description}{' '}
                        </p>
                        <footer className="blockquote-footer">
                            <cite title="Source Title">{this.props.adder}</cite>
                        </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            </Link>
        )
    }
}

export default ProductCard;