

import { PaymentFormContainer, FormContainer } from './payment-form.styles';
import {useState} from 'react'; 

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {useSelector} from 'react-redux'; 

// import { selectCartTotal } from '../../store/cart/cart.selector';
// import { selectCurrentUser} from '../../store/user/user.selector';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {

        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        // create a payment intent object on the server using a netlify function

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: 10000 })
        }).then(res => res.json());


        const clientSecret = response.paymentIntent.client_secret;
        console.log('Client secret? ', clientSecret);

        // This works because there is only one CardElement in the application and Stripe is able to 
        // fetch the details it needs from this element
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Bahoolio Bupkiss'  // from the wrapped userProvider obviously.
                }
            }
        });

        if (paymentResult.error) { 
            alert('Error in payment-form - after payment', paymentResult.error.message);
            console.log('Error in payment: ',paymentResult.error.message);
        } else { 
            if (paymentResult.paymentIntent.status === 'succeeded') { 
                alert('payment successful');
            } else { 
                alert('WTF? ');
            }
        }

    }


    return (

        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay Now </Button>
            </FormContainer>
        </PaymentFormContainer>
    )

}

export default PaymentForm; 