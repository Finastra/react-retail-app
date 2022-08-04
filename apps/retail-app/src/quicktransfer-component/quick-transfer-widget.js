import './quick-transfer-widget.scss';
import '@finastra/button';
import '@finastra/textfield';
import '@finastra/dialog';
import '@finastra/autocomplete';
import { Snackbar, Alert } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';

function QuickTransfer() {

  const [options, setOptions] = useState([]);

  const optionss = [{"payeeName": "Ejre"}, {"payeeName": "wewt"}]

  let [openDialog, setOpenDialog] = useState(false);
  let [payee, setPayee] = useState(null);
  let [amount, setAmount] = useState(null);

  const serverUri = 'http://localhost:3000';
  const serviceId = 'PERSON_TO_PERSON';
  const target = `/external-p2p-payments/payees`;

  const getPayees = useCallback(async () => {
    try {
      const response = await fetch(`${serverUri}/proxy?serviceId=${serviceId}&target=${target}`);
      const data = await response.json();
      setOptions(data);
    }
    catch (e) {
      console.log(e)
    }
  })

  function makeTransfer() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch('https://reqres.in/api/posts', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
}

  useEffect(() => {
    getPayees();
  }, [])

  const openDialogButton = () => {
    if (payee === null || amount === null){
      window.alert("Please enter the correct fields!")
    }
    else{
      setOpenDialog(true);
    }
  }

  const itemClick = () => {
    setPayee("dfs");
  }


  return (
    <div className="quick-transfer">
      <div className="quick-transfer-content">
        <div className="quick-transfer-title">
            <span>Quick transfers</span>
        </div>
        <div className="quick-transfer-inputs">
            <div className="sendto">
              <fds-autocomplete icon="person" placeholder="Choose a person..." showClearButton={true}>
                {optionss.map((option) => 
                  <mwc-list-item value={option.payeeName} onClick={itemClick}>{option.payeeName}</mwc-list-item>
                  )}
              </fds-autocomplete>

            </div>
            <div className="amount">
              <fds-textfield onInput={e => setAmount(e.target.value)} icon="money" label="Amount" labelinside="true" validationmessage="Should be in the format x.x" pattern="^[0-9]*[.][0-9]*$"></fds-textfield>
            </div>
            <div className="button">
              <fds-button label="Send" icon="check" onClick={openDialogButton}>
              </fds-button>
            </div>
        </div>
      </div>
      <fds-dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className="dialog-content">
          <div className="dialog-title">
            <span>Confirmation</span>
          </div>
          <div className="dialog-msg">
            <span>Sending money to {payee} and {amount}</span> 
          </div>
        </div>
      </fds-dialog>
    </div>
  
  );
}

export default QuickTransfer;
