export function get_time_diff(datetime) {
    var datetime = typeof datetime !== 'undefined' ? datetime : "2020-08-02 00:00:00.000000";

    var datetime = new Date(datetime).getTime();
    var now = new Date().getTime();

    if (isNaN(datetime)) {
        return "";
    }

    if (datetime < now) {
        var milisec_diff = now - datetime;
    } else {
        var milisec_diff = datetime - now;
    }

    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

    var date_diff = new Date(milisec_diff);

    if (days > 1) { return days + ((days === 1) ? ' day' : ' days'); }
    else if (date_diff.getHours() >= 1) {
        return date_diff.getHours() + ((date_diff.getHours() === 1) ? ' hour' : ' hours')//(date_diff.getHours() === 1) ? 'hour' : ' hours'
    }
    else if (date_diff.getMinutes() >= 1) {
        return date_diff.getMinutes() + ((date_diff.getMinutes() === 1) ? ' min' : ' mins')
    } else if (date_diff.getSeconds() >= 1) {
        return date_diff.getSeconds() + ((date_diff.getSeconds() === 1) ? ' sec' : ' secs')
    }
    return days + " Days " + date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes " + date_diff.getSeconds() + " Seconds";
}