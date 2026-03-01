const DateConversion = ({ convertDate, className }) => {

    const date = new Date(convertDate);

    function getOrdinal(n) {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    const day = getOrdinal(date.getUTCDate());
    const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    const year = date.getUTCFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    return (
        <span className={className}> {formattedDate ?? ""} </span>
    )
}

export default DateConversion;