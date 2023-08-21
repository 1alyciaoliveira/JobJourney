import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Payment() {
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [focus, setFocus] = useState('');

    const handleNumberChange = e => {
        const value = e.target.value;
        if (value.length <= 16) {
            setNumber(value);
        }
    };

    const handleExpiryChange = e => {
        const value = e.target.value;
        if (value.length <= 4) {
            setExpiry(value);
        }
    };

    const handleCvcChange = e => {
        const value = e.target.value;
        if (value.length <= 3) {
            setCvc(value);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="App">
                <Cards
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focus}
                />
                <form className="payment-form mt-5">
                    <input
                        type='tel'
                        className='form-control'
                        name='number'
                        placeholder='Card Number'
                        value={number}
                        onChange={handleNumberChange}
                        onFocus={e => setFocus(e.target.name)}
                    />

                    <input
                        type='text'
                        className='form-control'
                        name='name'
                        placeholder='Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onFocus={e => setFocus(e.target.name)}
                    />

                    <div className="d-flex">
                        <input
                            type='text'
                            className='form-control mr-2'
                            name='expiry'
                            placeholder='MM/YY Expiry'
                            value={expiry}
                            onChange={handleExpiryChange}
                            onFocus={e => setFocus(e.target.name)}
                        />

                        <input
                            type='tel'
                            className='form-control'
                            name='cvc'
                            placeholder='CVC'
                            value={cvc}
                            onChange={handleCvcChange}
                            onFocus={e => setFocus(e.target.name)}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Payment;
