const dateFormat = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDay();

    return `${year}년 ${month}월 ${day}일`;
}

export default dateFormat;