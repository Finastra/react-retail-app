// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './account-component.scss';
import { MoreVert } from '@mui/icons-material';


export function Account({
    title,
    balance,
    id
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
                    <span>$ {balance}</span> 
                </div>
            </div> 
        </div>
         <div className="divider"></div>
         <div className="account-number">
            <span>{id}</span>
         </div>
      </div>
    </div>
  );
}

export default Account;
