const router=require('express').Router()

const KEY="sk_test_51MEeS3SBVsYb0Z0BYnYt2yUd4UsSGOAwRLNqCoAZdpEU5xvpdvZ4m2hyIt82vY6Vhu0piNg8DMctYDQK8WKvCKrO002YNR1z4T"
const stripe=require('stripe')(KEY)


router.post('/payment',async(req,res)=>{
    const {paymentMethodType,paymentMethodOptions} = req.body;
    const params = {
        // source:req.body.tokenId,
        payment_method_types: [paymentMethodType],
        amount: req.body.amount,
        currency: 'usd',
      }
      try {
        const paymentIntent = await stripe.paymentIntents.create(params);
    
        // Send publishable key and PaymentIntent details to client
        res.send({
          clientSecret: paymentIntent.client_secret,
          nextAction: paymentIntent.next_action,
        });
      } catch (e) {
        return res.status(400).send({
          error: {
            message: e.message,
          },
        });
      }
    });
    
//    await await stripe.checkout.sessions.create({
//         source:req.body.tokenId,
//         amount:req.body.amount,
//         currency:'usd',
//     },(stripeErr,stripeRes)=>{
//         if(stripeErr){
//             res.status(500).json(stripeErr)
//         }else{
//             res.status(200).json(stripeRes)
//         }
//     })


module.exports=router