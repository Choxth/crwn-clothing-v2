require("dotenv").config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// This is the netlify handler which will receive the event request and send the response in Express
// This is all very very smplified. I don't even need to run a service from netlify itself. Netlify looks 
// into my bundle for the netlify folder for functions to execute. Crazy
exports.handler = async (event) => { 

    try { 

        const { amount } = JSON.parse(event.body); 

        const paymentIntent = await stripe.paymentIntents.create({ 
            amount: amount, 
            currency: "usd", 
            payment_method_types: ["card"], 

        }); 

        // console.log('Got a payment intent:', paymentIntent)
        return { 
            statusCode: 200, 
            body: JSON.stringify({ paymentIntent })
        }

    } catch (e) { 
        console.log('Exception in :', e);
        return { 
            status: 400, 
            body: JSON.stringify( e.message )
        }
    }

}