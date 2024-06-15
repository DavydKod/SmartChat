import moment from 'moment';

const dateHandler = (date) => {
    const now = moment();
    const messageDate = moment(date);

    if (now.diff(messageDate, 'seconds') < 60) {
        return 'Now';
    } else if (now.diff(messageDate, 'hours') < 24) {
        return messageDate.format('HH:mm'); // e.g., 14:30
    } else if (now.diff(messageDate, 'days') < 7) {
        return messageDate.format('dddd'); // e.g., Monday
    } else if (now.diff(messageDate, 'years') < 1) {
        return messageDate.format('MMM D'); // e.g., Jan 12
    } else {
        return messageDate.format('MMM D, YYYY'); // e.g., Jan 12, 2020
    }
};

export default dateHandler;

