export default function dateFormatter(props) {
    const dayjs = require('dayjs');
    const d = props;
    const date = dayjs(d).format("DD.MM.YYYY HH:mm") ;
    return date;
  }