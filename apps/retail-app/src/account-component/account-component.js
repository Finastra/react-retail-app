// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './account-component.scss';
import { MoreVert } from '@mui/icons-material';


export function Account({
    title
}
) {

  return (
    <div className="account-card">
      <div className="account-content">
        <div className="more-icon">
            <MoreVert className="more-style"/>
        </div>
        <div className="account-info"> 
            <div className="account-icon">
                <span className="material-icons">
                    width_normal
                </span>
            </div>
            <div className="account-title">
                <span>{title}</span>
                <div className="account-balance">
                    <span>$ 10,000.00</span> 
                </div>
            </div> 
        </div>
         <div className="divider"></div>
         <div className="account-number">
            <span>DE 800 8000 80000 800</span>
         </div>
      </div>
    </div>
  );
}

export default Account;
