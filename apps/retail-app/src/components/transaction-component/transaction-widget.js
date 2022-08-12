import './transaction-widget.scss'
import '@finastra/button-toggle-group';
import '@finastra/button-toggle';
import '@finastra/search-input';
import '@finastra/circular-progress';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { Grid } from '@mui/material';
import DateItem from './date-item.js';
import Transaction from './transaction.js';


function Sheet() {

  const serverUri = '';
  const serviceId = 'ACCOUNT_INFORMATION_US';
  const accountId = '~UIP8sfkWLqjf2mk6TM3cMBkq9XSUjejJZm5bLRekj.enzTPZvoKXEw1.TJmmC4b2';
  const target = `/accounts/${accountId}/transactions?offset=0&limit=100`;

  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) => activeIndex === index ? className : "";

  let [transactions, setTransactions] = useState([]);
  let [foundTransactions, setFoundTransactions] = useState([]);
  let [desc, setDesc] = useState("");
   
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
      setFoundTransactions(filterByDate);
    }
    catch (e) {
      console.log(e)
    }
  })

  
  const expense = Object.keys(foundTransactions).map(function(key) {
    if (foundTransactions[key].length > 0) {
      return(
        <div>
          <DateItem date={compareDates(key)}/>
          {foundTransactions[key].filter(transaction => {
            return transaction.transactionAmount < 20;
          }).map((transaction, i, row) => 
          {
            if (i + 1 === row.length){
              return (
                <Transaction title={transaction.description} amount={transaction.transactionAmount} accNumber={transaction.id} last/>
              )}
            else {
              return (
                <Transaction title={transaction.description} amount={transaction.transactionAmount} accNumber={transaction.id}/>
              )}
          }
          )}
        </div>
      )
  }});

  const income = Object.keys(foundTransactions).map(function(key) {
    if (foundTransactions[key].length > 0) {
      return(
        <div>
          <DateItem date={compareDates(key)}/>
          {foundTransactions[key].filter(transaction => {
            return transaction.transactionAmount > 20;
          }).map((transaction, i, row) => 
            {
            if (i + 1 === row.length){
              return (
                <Transaction title={transaction.description} amount={transaction.transactionAmount} accNumber={transaction.id} last/>
              )}
            else {
              return (
                <Transaction title={transaction.description} amount={transaction.transactionAmount} accNumber={transaction.id}/>
              )}
          }
          )}
        </div>
      )
  }});

  const all = Object.keys(foundTransactions).map(function(key) {
    if (foundTransactions[key].length > 0){
      return(
        <div>
          <DateItem date={compareDates(key)}/>
          {foundTransactions[key].map((transaction, i, row) => 
            {
              if (i + 1 === row.length){
                return (
                  <Transaction title={transaction.description} amount={transaction.transactionAmount} accNumber={transaction.id} last/>
                )}
              else {
                return (
                  <Transaction title={transaction.description} amount={transaction.transactionAmount} accNumber={transaction.id}/>
                )}
            }
            )}
        </div>
      )
}});


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

  const filterTransactions = (e) => {
    const keyword = e.target.value;

    if (keyword != '') {
      const results = {}
      Object.keys(transactions).map(function(key) {
        results[key] = transactions[key].filter(transaction => {
          return transaction.description.toLowerCase().startsWith(keyword.toLowerCase());
        })
      }
    );
      setFoundTransactions(results);
    } else {
      setFoundTransactions(transactions);
    }
    setDesc(keyword);
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} className="button-toggle">
              <fds-button-toggle-group >
                <fds-button-toggle label="All" className={`tab ${checkActive(1, "active")}`}
          onClick={() => handleClick(1)}></fds-button-toggle>
                <fds-button-toggle label="Income" className={`tab ${checkActive(2, "active")}`}
          onClick={() => handleClick(2)}></fds-button-toggle>
                <fds-button-toggle label="Expenses" className={`tab ${checkActive(3, "active")}`}
          onClick={() => handleClick(3)}></fds-button-toggle>
              </fds-button-toggle-group>
            </Grid>
            <Grid item xs={12} md={4} >
              <div className="search-input">
                <fds-search-input value={desc} onInput={filterTransactions}></fds-search-input>
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              {transactions.length == 0 && (
                  <div className="progress">
                    <div className="progress-bar">
                      <fds-circular-progress indeterminate></fds-circular-progress>
                      <div className="progress-bar-text">
                        <span>Loading...</span>
                      </div>
                    </div>
                  </div>
              )}
              <div className="scrollable">
                <div className={`transaction-list ${checkActive(1, "active")}`}>
                  {all}
                </div>
              </div>
                <div className={`transaction-list ${checkActive(2, "active")}`}>
                  {income}
                </div>
                <div className={`transaction-list ${checkActive(3, "active")}`}>
                  {expense}
                </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Sheet;
