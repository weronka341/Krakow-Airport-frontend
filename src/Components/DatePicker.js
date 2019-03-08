import React from 'react';
import { MDBDatePicker } from 'mdbreact';
import moment from 'moment';
import 'moment/locale/pl';

class DatePicker extends React.Component  {

    getPickerValue = (value) => {
        
        this.props.callbackFromParent(value);
    }

    render() {
        return(
            <div>
                <MDBDatePicker cancelLabel="Effacer" locale={moment.locale('pl')} getValue={this.getPickerValue} />
            </div>
        );
    }
};

export default DatePicker;