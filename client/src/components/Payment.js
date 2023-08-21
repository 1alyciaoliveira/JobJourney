import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

function Payment() {
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')

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
        <div className="App">
            <Cards
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focus}
            />
            <form>
                <input type='tel'
                    name='number'
                    placeholder='Card Number'
                    value={number}
                    onChange={handleNumberChange}
                    onFocus={e => setFocus(e.target.name)}
                />

                <input type='text'
                    name='name'
                    placeholder='Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onFocus={e => setFocus(e.target.name)}
                />

                <input type='text'
                    name='expiry'
                    placeholder='MM/YY Expiry'
                    value={expiry}
                    onChange={handleExpiryChange}
                    onFocus={e => setFocus(e.target.name)}
                />

                <input type='tel'
                    name='cvc'
                    placeholder='CVC'
                    value={cvc}
                    onChange={handleCvcChange}
                    onFocus={e => setFocus(e.target.name)}
                />
            </form>
        </div>
    );
};

export default Payment;
