import './transaction.scss'


function Transaction({
    title,
    amount,
    accNumber,
    last
}) {

  const checkActive = (last, className) => last ? className : "";

  return (
    <div className={`transaction${last ? "-last" : ""}`}> 
        <div className="transaction-item">
          <div className="icon">
            <div className="icon-pic">
              <span className="material-icons">
                width_normal
              </span>
            </div>
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
    </div>
  
  );
}

export default Transaction;
