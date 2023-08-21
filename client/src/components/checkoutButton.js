import { useLazyQuery } from "@apollo/client"; //important to wait until the call to load
import { query } from "express";
import { QUERY_PAYMENT } from "../utils/queries";

function CheckoutButton() {
    const [startCheckout, { loading, data, error}] = useLazyQuery(QUERY_PAYMENT, {
        onCompleted: (queryData) => {
            console.log(queryData);
            let data = JSON.parse(queryData.createCheckoutSession);
            console.log(data);
            let checkoutURL = data.url;
            window.location.assign(checkoutURL);
        }
    });

    if (loading) return null;
    if (error) return `${error}`;
    console.log(data);

    return (
        <Button onClick={() => startCheckout()}>
            donate!
        </Button>
    )
}

export default CheckoutButton;