import './transaction-widget.scss'
import '@finastra/button-toggle-group';
import '@finastra/button-toggle';
import '@finastra/search-input';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import DateItem from './date-item.js';
import Transaction from './transaction.js';


function Sheet() {

  const serverUri = 'http://localhost:3000';
  const serviceId = 'ACCOUNT_INFORMATION_US';
  const accountId = '6787147';
  const target = `/accounts/${accountId}/transactions?offset=0&limit=100`;

  let [transactions, setTransactions] = useState([]);
  let [toggle, setToggle] = useState([]);

  const getTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${serverUri}/proxy?serviceId=${serviceId}&target=${target}`);
      const data = await response.json();
      const filterByDate = data.reduce((groups, transactions) => {
        const date = transactions.transactionDate;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(transactions);
        return groups;
      }, {});
      setTransactions(filterByDate);
    }
    catch (e) {
      console.log(e)
    }
  })

  const all = Object.keys(transactions).map(function(key) {
    return(
      <div>
        <DateItem date={compareDates(key)}/>
        {transactions[key].map(transaction => 
            <Transaction title={transaction.description} amount={transaction.transactionAmount} accNumber={transaction.id}/>
          )}
      </div>
    )
  });


  function compareDates(date){
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateOf = new Date(date);

    if (dateOf.getTime() == today.getTime()) {
      return "Today";
    }
    else{
      today.setDate(today.getDate()-1);
      if (today.getTime() == dateOf.getTime()){
        return "Yesterday";
      }
      else{
        return date;
      }
    }
  }

  useEffect(() => {
    getTransactions();
  }, [])

  return (
    
    <div className="Sheet"> 
      <div className="sheet-item">
        <div className="header-transaction">
          <span className="title">Transactions</span>
        </div>
        <div className="layout">
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={6} md={8}>
              <fds-button-toggle-group>
                <fds-button-toggle label="All"></fds-button-toggle>
                <fds-button-toggle label="Income"></fds-button-toggle>
                <fds-button-toggle label="Expenses"></fds-button-toggle>
              </fds-button-toggle-group>
            </Grid>
            <Grid item xs={6} md={4}>
              <fds-search-input></fds-search-input>
            </Grid>
            <Grid item xs={6} md={12}>
              {transactions.length == 0 && (
                <div className="progress">
                  <div className="parent">
                    <div className="progress-bar">
                      <div>
                        <CircularProgress className="progress-bar-icon"/>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-text">
                        <span>Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              <div className="transaction-list">
                {all}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  
  );
}

export default Sheet;
