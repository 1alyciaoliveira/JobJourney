import React from 'react';
import { useLazyQuery } from "@apollo/client";
import { QUERY_PAYMENT } from "../utils/queries";
import { Button } from 'react-bootstrap';

function CheckoutButton() {
    const [startCheckout, { loading, data, error }] = useLazyQuery(QUERY_PAYMENT, {
        onCompleted: (queryData) => {
            console.log(queryData);
            const checkoutURL = queryData.createCheckoutSession.url;
            window.open(checkoutURL, "_blank");
        }
    });

    if (loading) return null;
    if (error) return `${error}`;
    console.log(data);

    return (
        <Button className="bg-warning" variant='warning' onClick={() => startCheckout()}>
            Donate!
        </Button>
    )
}

export default CheckoutButton;
