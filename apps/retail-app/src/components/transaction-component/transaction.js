import './transaction.scss';
import '@finastra/divider'

function Transaction({
    title,
    amount,
    accNumber,
    last
}) {


  return (
    <div className="transaction"> 
        <div className="transaction-item">
          <div className="icon">
            <span className="material-icons">
              width_normal
            </span>
          </div>
          <div className="transaction-name">
            <div className="transaction-title">
              <div className="transaction-info">
                {title}
                <div className="transaction-subtitle">
                  {accNumber} 
                </div> 
              </div>
              $ {amount} 
            </div>
          </div>
        </div>
        {!last && <fds-divider/>}
    </div>
  
  );
}

export default Transaction;
