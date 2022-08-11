import './myadvisor-widget.scss';
import '@finastra/button';
import '@finastra/textfield';
import '@finastra/avatar';

function MyAdvisor() {
  return (
    <div className="myadvisor">
        <div className="myadvisor-content">
            <div className="myadvisor-title">
                <span>My advisor</span>
            </div>
            <div className="advisor">
                <fds-avatar></fds-avatar>
                <div className="advisor-info">
                    <div className="advisor-name">
                        <span>John Doe</span>
                    </div>
                    <div className="advisor-email">
                        <span>johndoe@example.com</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="actionbuttons">
            <div className="call">
                <fds-text-button label="Call" icon="call">
                </fds-text-button>
            </div>
            <div className="msg">
                <fds-text-button label="Message" icon="message">
                </fds-text-button>
            </div>
            <div className="appointment">
                <fds-text-button label="Appointment" icon="book">
                </fds-text-button>
            </div>
        </div>       
    </div>
  
  );
}

export default MyAdvisor;
