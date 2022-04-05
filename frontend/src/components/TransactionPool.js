import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transaction from './Transaction';
import { API_BASE_URL, SECONDS_JS } from '../config';
import { Button } from 'react-bootstrap';
import history from '../history';

const POLL_INTERVAL = SECONDS_JS * 10;

function TransactionPool() {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = () => {
        fetch(`${API_BASE_URL}/transactions`)
            .then(res => res.json())
            .then(json =>{ 
                console.log('transaction json', json);

                setTransactions(json);
            });
    }

    useEffect(() => {
        fetchTransactions();

        const intervalID = setInterval(fetchTransactions, POLL_INTERVAL);

        return () => clearInterval(intervalID);

        
    }, []);

    const fetchMineBlock = () => {
        fetch(`${API_BASE_URL}/blockchain/mine`)
            .then(() => {
                alert('Success');

                history.push('/blockchain');
            });
    }

    return (
        <div className="transaction-pool">
            <Link to="/">Home</Link>
            <hr />
            <h3>Transaction Pool</h3>
            <div>
                {transactions.map(transaction => (
                    <div key={transaction.id}>
                        <hr />
                        <Transaction transaction={transaction} />
                    </div>
                ))}
            </div>
            <div></div>
            <hr />
            <Button
            varient="danger"
            onClick={fetchMineBlock}
            >
                Mine a block of these transactions
            </Button>
        </div>
    )
}

export default TransactionPool;
