import './transaction.scss';
import '@finastra/divider';
import '@finastra/icon';

function Transaction({
    title,
    amount,
    accNumber,
    last
}) {


  return (
    <div className="transaction"> 
        <div className="transaction-item">
          <div>
            <div className="icon">  
              <fds-icon dense="">payments</fds-icon>
            </div>
          </div>
            <div className="transaction-info">
              <div className="transaction-desc">
                {title}
              </div>
              <div className="transaction-subtitle">
                {accNumber} 
              </div> 
            </div>
          <div className="transaction-amount">
            $ {amount} 
          </div>
        </div>
        {!last && <fds-divider/>}
    </div>
  
  );
}

export default Transaction;
