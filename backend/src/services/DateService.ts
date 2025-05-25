import * as moment from "jalali-moment";

moment.locale("fa");
export default class DateService {
  public toJalali(date: Date): string {
    return moment(date).format("YYYY/MM/DD HH:mm:ss").toString();
  }
}
