import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component'
import './cart-dropdown.styles.scss'

const Cart = ({cartItems, history, dispatch}) => {
    
    return (
            <div className="cart-dropdown">
                <div className="cart-items">
                    {
                        cartItems && cartItems.length ?
                        cartItems.map(item => (<CartItem key={item.id} item={item}/>))
                        :
                        (<span className="empty-message">Your cart is empty</span>)
                    }
                </div>
                <CustomButton onClick={() => {
                    history.push('/checkout');
                    dispatch(toggleCartHidden())
                }}>GO TO CHECKOUT</CustomButton>
            </div>
        )
}

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})

// const mapDispatchToProps = (dispatch) => ({
//     toggleCartHidden: () => dispatch(toggleCartHidden())
// })

export default withRouter(connect(mapStateToProps)(Cart))