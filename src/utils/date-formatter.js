export default function day_and_date(originalDate) {
    const datetime = new Date(originalDate);
    const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${days[datetime.getDay()]}, ${datetime.getDate()} ${months[datetime.getMonth()]}`
}