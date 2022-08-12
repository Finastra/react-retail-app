import './date-item.scss';
import { CalendarToday } from '@mui/icons-material';


function DateItem({
  date
}) {
  return (
    <div className="date-item"> 
        <div className="box">
          <div className="box-icon">
            <CalendarToday fontSize="small" />
          </div>
          <div className="box-title">
              <span>{date}</span>
          </div>
        </div>         
    </div>
  
  );
}

export default DateItem;
