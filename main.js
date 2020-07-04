let now = new Date()

let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

let currentMonth = now.getMonth()
let currentYear = now.getFullYear()

let monthAndYear = document.getElementById('monthAndYear')
let prevButton = document.getElementById('prevButton')
let nextButton = document.getElementById('nextButton')
let dayNames = document.getElementById('dayNames')
let dayDates = document.getElementById('dayDates')

setCalender(currentMonth, currentYear)
setDayNames()
prevButton.addEventListener('click', prevMonth)
nextButton.addEventListener('click', nextMonth)

function setDayNames() {
    for(let i of dayList) {
        let day = document.createElement('div')
        let dayName = document.createTextNode(i.substring(0,3))
        day.appendChild(dayName)
        dayNames.appendChild(day)
    }
}

function getPrevMonthAndYear() {
    return ({
        year: (currentMonth === 0) ? currentYear - 1 : currentYear,
        month: (currentMonth === 0) ? 11 : currentMonth - 1
    })
}

function getDayInMonth(year, month) {
    return (32 - new Date(year, month, 32).getDate())
}

function prevMonth() {
    let  { year, month } = getPrevMonthAndYear()
    currentYear = year
    currentMonth = month
    setCalender(currentMonth, currentYear)
}
function nextMonth() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear
    currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1
    setCalender(currentMonth, currentYear)
}

function setCalender(month, year) {
    let selectedMonth = monthList[month]
    monthAndYear.innerHTML = `${selectedMonth} ${year}`
    let prevDate = getPrevMonthAndYear()
    
    let firstDay = (new Date(year, month)).getDay()
    let dayInMonth = getDayInMonth(year, month)
    let prevdayInMonth = getDayInMonth(prevDate.year, prevDate.month)
    dayDates.innerHTML = ''

    let nextDayInMonth = (dayInMonth + firstDay) % 7 === 0 ? 0 : 7 - ((dayInMonth + firstDay) % 7)
    let boundary = firstDay + dayInMonth + nextDayInMonth

    for(let i = 0; i < boundary; i++) {
        if(i < firstDay || i >= firstDay + dayInMonth) {
            let day = document.createElement('button')
            let date = i < firstDay ? prevdayInMonth - (firstDay - 1 - i) : nextDayInMonth - (boundary - i) + 1
            let dayDate = document.createTextNode(date)
            day.setAttribute('class', 'prevDate')
            day.appendChild(dayDate)
            dayDates.appendChild(day)
            continue
        }
        let date = i - firstDay + 1
        let day = document.createElement('button')
        let dayDate = document.createTextNode(date)
        if(month === now.getMonth() && year === now.getFullYear() && date === now.getDate()) {
            day.setAttribute('class', 'today')
            let mark = document.createElement('div')
            mark.appendChild(dayDate)
            day.appendChild(mark)
            dayDates.appendChild(day)
            continue
        }
        day.appendChild(dayDate)
        dayDates.appendChild(day)
    }
}
