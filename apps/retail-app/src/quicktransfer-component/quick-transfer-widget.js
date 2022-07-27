import './quick-transfer-widget.scss';
import '@finastra/button';
import '@finastra/textfield'

function QuickTransfer() {
  return (
    <div className="quick-transfer">
      <div className="quick-transfer-content">
        <div className="quick-transfer-title">
            <span>Quick transfers</span>
        </div>
        <div className="quick-transfer-inputs">
            <div className="sendto">
                <fds-textfield icon="person"></fds-textfield>
            </div>
            <div className="amount">
                <fds-textfield icon="money"></fds-textfield>
            </div>
            <div className="button">
              <fds-button label="Send" icon="check"></fds-button>
            </div>
        </div>
      </div>
    </div>
  
  );
}

export default QuickTransfer;
