import React, { useState } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function ConductTransaction() {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState('');

  const updateRecipient = event  => {
    setRecipient(event.target.value);
  }

  const updateAmount = event  => {
    setAmount(Number(event.target.value));
  }

  const submitTransaction = () => {
      fetch(`${API_BASE_URL}/wallet/transact`, 
      { method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ recipient, amount })
      }).then(res => res.json())
      .then(json => {
          console.log('submitTransaction json', json);  
          alert("Success!");
        });

  }

  return (
    <div className="ConductTransaction">
        <Link to="/">Home</Link>
        <hr />
        <h3>Conduct a Transaction</h3>
        <br />
        <FormGroup>
            <FormControl 
                input="text" 
                placeholder="Recipient" 
                value={recipient}
                onChange={updateRecipient}
            />
        </FormGroup>
        <FormGroup>
            <FormControl 
                input="number"
                placeholder="Amount"
                value={amount}
                onChange={updateAmount}
            />
        </FormGroup>
        <div>
            <Button
                variant="danger"
                onClick={submitTransaction}
            >
                Submit
            </Button>
        </div>
    </div>
  )


} 

export default ConductTransaction;