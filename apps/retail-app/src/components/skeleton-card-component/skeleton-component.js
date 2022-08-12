import './skeleton-component.scss';
import '@finastra/skeleton';
import '@finastra/card';
import '@finastra/divider';

function AccountSkeleton() {

  return (
    <div className="skeleton-container">
        <fds-card>
          <div className="skeleton-content">
            <div className="skeleton-icon">
              <fds-skeleton type="circle" width="38px" height="38px"/>
            </div>
            <div className="skeleton-info">
              <fds-skeleton width="80px" height="24px"/>
              <div className="skeleton-balance">
                <fds-skeleton height="22px" width="60px"/>
              </div>
            </div>   
          </div>
          <fds-card-footer>
            <fds-divider/>
              <div className="skeleton-number">
                <fds-skeleton  width="100%"/>
              </div>
          </fds-card-footer>
        </fds-card>
    </div>
  
  );
}

export default AccountSkeleton;
