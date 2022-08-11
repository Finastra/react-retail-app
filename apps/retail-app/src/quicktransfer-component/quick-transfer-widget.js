import './quick-transfer-widget.scss';
import '@finastra/button';
import '@finastra/textfield';
import '@finastra/dialog';
import '@finastra/autocomplete';
import '@finastra/textarea';
import '@finastra/select';
import { Snackbar, Alert } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';

function QuickTransfer() {

  const serverUri = 'http://localhost:3000';
  const serviceId1 = 'PERSON_TO_PERSON';
  const serviceId2 = 'ACCOUNT_INFORMATION_US';
  const serviceId3 = 'PERSON_TO_PERSON';

  const target1 = `/external-p2p-payments/payees`;
  const target2 = `/accounts/extended`;
  const target3 = `/external-p2p-payments`;
  const target4 = `/external-p2p-payments/terms-and-conditions/accept`;

  const [options, setOptions] = useState([]);

  let [openDialog, setOpenDialog] = useState(null);
  let [agreementState, setAgreementState] = useState(true);
  let [disabled, setDisabled] = useState(true);
  let [openSnackbarError, setOpenSnackbarError] = useState(false);
  let [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  let [payee, setPayee] = useState(null);
  let [amount, setAmount] = useState(null);
  let [accounts, setAccounts] = useState([]);
  let [account, setAccount] = useState("");
  let [memo, setMemo] = useState("");
  let [response, setResponse] = useState(null);

  const getPayees = useCallback(async () => {
    try {
      const response = await fetch(`${serverUri}/proxy?serviceId=${serviceId1}&target=${target1}`);
      const data = await response.json();
      setOptions(data);
    }
    catch (e) {
      console.log(e)
    }
  })

  const getAccounts = useCallback(async () => {
    try {
      const response = await fetch(`${serverUri}/proxy?serviceId=${serviceId2}&target=${target2}`);
      const data = await response.json();
      setAccounts(data);
    }
    catch (e) {
      console.log(e)
    }
  })
  
  async function makeTransfer() {
    let data = {};

    const current = new Date();
    let date = ""
    if (current.getMonth()+1 < 10 && current.getDate() < 10){
      date = `${current.getFullYear()}-0${current.getMonth()+1}-0${current.getDate()}`;
    }
    else if (current.getMonth()+1 < 10 && current.getDate() >= 10){
      date = `${current.getFullYear()}-0${current.getMonth()+1}-${current.getDate()}`;
    }
    else if (current.getMonth()+1 >= 10 && current.getDate() < 10){
      date = `${current.getFullYear()}-${current.getMonth()+1}-0${current.getDate()}`;
    }
    else{
      date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    }

    if (payee.payeeType == "Mobile"){
       data =  {
        accountId: account,
        payee: {
          id: payee.id,
          payeeName: payee.payeeName,
          payeePhoneNumber: payee.payeePhoneNumber,
          payeeType: payee.payeeType
        },
        amount: amount,
        status: "",
        memo: memo,
        paymentDirection: "send",
        paymentDate: date, 
        fee: 1,
        securityQuestion: "1",
        securityAnswer: "1"    
    }
   }
   else {
     data =  {
      accountId: account,
      payee: {
        id: payee.id,
        payeeName: payee.payeeName,
        payeeEmail: payee.payeeEmail,
        payeeType: payee.payeeType
      },
      amount: amount,
      status: "",
      memo: memo,
      paymentDirection: "send",
      paymentDate: date, 
      fee: 1,
      securityQuestion: "1",
      securityAnswer: "1"    
  }
   }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    let response = null;

    await fetch(`${serverUri}/proxy?serviceId=${serviceId1}&target=${target3}`, requestOptions)
        .then(response => response.json())
        .then(data => response=data);

    return new Promise((resolve) => {
          resolve(response);
        });
}

  useEffect(() => {
    getAccounts();
  }, [])

  const openDialogButton = () => {
    if (payee === null || amount === null){
      window.alert("Please enter the given fields correctly!")
    }
    else{
      setOpenDialog(true);
    }
  }

  async function handlePayment (){
    if (account !== null){
      let response = await makeTransfer();
      setOpenDialog(null);
      if (response.status){
        setResponse(response.status);
        setOpenSnackbarSuccess(true);

      }
      else{
        setResponse(response.message);
        setOpenSnackbarError(true);
      }
  
    }
    else{
      window.alert("Please choose one of your accounts!");
    }
  }

  const handleClosePayment = () => {
    setOpenDialog(null);
  }

  const handleAmount = (e) => {
    if (e.target.validity.valid){
      if (e.target.value !== ""){
        setAmount(parseFloat(e.target.value));
      }
    }
    else{
      setAmount(null);
    }
  }

  const checkBoxStatus = (value) => {
    if (value){
      setDisabled(true);
    }
    else {
      setDisabled(null);
    }
  }
  
  async function Agreement() {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    await fetch(`${serverUri}/proxy?serviceId=${serviceId3}&target=${target4}`, requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));

      return new Promise((resolve) => {
            resolve(response);
          });
  }
  
  async function handleAgreement() {
    await Agreement();
    setAgreementState(null);
    getPayees();
  }

  const handleClose = () => {
    setOpenSnackbarError(false);
    setOpenSnackbarSuccess(false);
  }

  const handlePayee = () => {
    setPayee(null);
  }

  const handleMemo = (value) => {
    setMemo(value);
  }

  const itemClickPayee = (value) => {
    setPayee(value);
  }

  const itemClickAcc = (value) => {
    setAccount(value);
  }


  return (
    <div className="quick-transfer">
      <div className="quick-transfer-content">
        <div className="quick-transfer-title">
            <span>Quick transfers</span>
        </div>
        <div className="quick-transfer-inputs">
            <div className="sendto">
              <fds-autocomplete onInput={e => handlePayee(e)} icon="person" placeholder="Choose a person...">
                {options.map((option) => 
                  <mwc-list-item value={option.payeeName} onClick={e => itemClickPayee(option)}>{option.payeeName}</mwc-list-item>
                  )}
              </fds-autocomplete>
            </div>
            <div className="amount">
              <fds-textfield onInput={e => handleAmount(e)} icon="money" label="Amount" labelinside="true" validationmessage="Should be in the format x.x" pattern="^[0-9]*[.][0-9]*$"></fds-textfield>
            </div>
            <div className="button">
              <fds-button label="Send" icon="check" onClick={openDialogButton}>
              </fds-button>
            </div>
        </div>
      </div>
      <fds-dialog open={openDialog} heading="Payment Confirmation" scrimClickAction="">
        <p> Payee: <strong>{payee ? payee.payeeName : null}</strong> </p>
        <p> Amount: <strong>{amount} $</strong></p>
        <fds-select outlined="" label="Account..." icon="payments">
          {accounts.map((account) => 
            <mwc-list-item value={account.accountId} onClick={e => itemClickAcc(e.target.value)}>{account.nickname}</mwc-list-item>
          )}
        </fds-select>
        <fds-textarea onInput={e => handleMemo(e.target.value)}label="Add a memo" charcounter="true"  maxLength={100}></fds-textarea>
        <fds-button secondary="" label="Confirm" slot="primaryAction" onClick={handlePayment}></fds-button>
        <fds-text-button label="Cancel" slot="secondaryAction" onClick={handleClosePayment}></fds-text-button>
      </fds-dialog>
      <Snackbar
        open={openSnackbarError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="error">{response}</Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbarSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="success">{response}</Alert>
      </Snackbar>
      <fds-dialog open={agreementState} heading="Terms and condition agreement" scrimClickAction="">
        <p>To be able to access this app, you must first agree to the terms and conditions:</p>
        <div className="agreement">
          <fds-checkbox  onClick={e => checkBoxStatus(e.target.checked)}/>
          <span> I agree to the terms and conditions </span>
        </div>
        <fds-button secondary="" label="Confirm" slot="primaryAction" disabled={disabled} onClick={handleAgreement}></fds-button>
      </fds-dialog>
    </div>
  
  );
}

export default QuickTransfer;
