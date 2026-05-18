import React, { useEffect } from 'react';

const CulqiPayment = () => {
  // useEffect(() => {
  //   // Configure Culqi settings
  //   window.Culqi.settings({
  //     title: 'Your Store Name',
  //     currency: 'PEN',
  //     description: 'Product Purchase',
  //     amount: 10000 // In cents (e.g., 100.00 PEN)
  //   });

  //   // Listen for the token generation event
  //   window.culqi = () => {
  //     if (window.Culqi.token) {
  //       const token = window.Culqi.token.id;
  //       console.log("Token created: ", token);
  //       // Send this token to your backend to process the payment
  //     } else {
  //       console.log(window.Culqi.error.merchant_message);
  //     }
  //   };
  // }, []);

  const handlePay = () => {
    console.log(window)
    // window.Culqi.open();
  };

  return (
    <button className='btn btn-info' onClick={handlePay}>Pay Now</button>
  );
}


export default CulqiPayment