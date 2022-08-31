import './date-item.scss';
import '@finastra/icon';


function DateItem({
  date
}) {
  return (
    <div className="date-item"> 
        <div className="box">
          <div className="box-icon">
            <fds-icon dense="">calendar_today</fds-icon>
          </div>
          <div className="box-title">
              <span>{date}</span>
          </div>
        </div>         
    </div>
  
  );
}

export default DateItem;
