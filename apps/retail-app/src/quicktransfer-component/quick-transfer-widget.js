import './quick-transfer-widget.scss';
import '@finastra/button';
import '@finastra/textfield';
import '@finastra/select';
import '@finastra/dialog';
import { useEffect, useState, useCallback } from 'react';

function QuickTransfer() {

  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [options, setOptions] = useState([]);

  let [openDialog, setOpenDialog] = useState(false);

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

  useEffect(() => {
    getPayees();
  }, [])

  useEffect(() => {
    const handler = () => setShowMenu(false);
    
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  })


  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue.payeeName;
    }
  }

  const renderSelected = (option) => {
    if (isSelected(option)){
      return "dropdown-item-selected";
    }
    return "dropdown-item";
  }

  const onItemClick = (option) => {
    setSelectedValue(option);
  };

  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    }

    return selectedValue.id === option.id;
  }

  const openDialogButton = () => {
    console.log("Hello");
    setOpenDialog(true);
  }

  return (
    <div className="quick-transfer">
      <div className="quick-transfer-content">
        <div className="quick-transfer-title">
            <span>Quick transfers</span>
        </div>
        <div className="quick-transfer-inputs">
            <div className="sendto">
              <fds-textfield label="Send to" icon="person" value={getDisplay()} showactionbutton="true" onClick={handleInputClick} labelinside="true">
                <mwc-icon-button  slot="actionButton" icon="arrow_drop_down" ></mwc-icon-button>
              </fds-textfield>

              {showMenu && (
              <div className="dropdown">
                {options.map((option) => (
                  <div key={option.id} 
                      className={renderSelected(option)}
                      onClick={() => onItemClick(option)}>
                    {option.payeeName}
                  </div>
                ))}
              </div>)}

            </div>
            <div className="amount">
              <fds-textfield icon="money" icontrailing="dollar" label="Amount" labelinside="true"></fds-textfield>
            </div>
            <div className="button">
              <fds-button label="Send" icon="check" onClick={openDialogButton}>
                <fds-dialog open={openDialog}>
                  <span> Are you sure you want to send to ... ....</span>
                </fds-dialog>
              </fds-button>
            </div>
        </div>
      </div>
    </div>
  
  );
}

export default QuickTransfer;
