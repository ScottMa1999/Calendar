const calendar = document.querySelector('.calendar')

// ******** Month List ******** //
const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// ******** Selected Dates ******** //
let selected_date = []

// ******** Determine leap years ******** //
isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

  let calendar_days = calendar.querySelector('.calendar-days')
  let calendar_header_year = calendar.querySelector('#year')

  // ******** Determine days in specific month ******** // 
  let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // ******** Clear out the calendars ******** //  
  calendar_days.innerHTML = ''

  let currDate = new Date()
  if (month == undefined || month == null) month = currDate.getMonth()
  if (month == undefined || year == null) year = currDate.getFullYear()

  // ******** Get current month & year ******** //  
  let curr_month = `${month_names[month]}`
  month_picker.innerHTML = curr_month
  calendar_header_year.innerHTML = year

  // ******** Get first day of month ******** //
  let first_day = new Date(year, month, 1)

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement('div')
    if (i >= first_day.getDay()) {
        day.classList.add('calendar-day-hover')
        day.innerHTML = i - first_day.getDay() + 1
    
        // save selected elements while rerendering
        // match day, month & year
        if (selected_date.length != 0) {
          selected_date.forEach(selected => {
            if (selected.split('/')[1] === day.innerHTML && month === selected.split('/')[0] - 1 && year === parseInt(selected.split('/')[2])){
              day.classList.remove('calendar-day-hover')
              day.classList.add('calendar-day-selected')
            }
          })
        }

        // label current date
        if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
            day.classList.add('curr-date')
        }
    }
    calendar_days.appendChild(day)
  }

  // ******** Record selected elements ******** //
  calendar_days.childNodes.forEach(element => {
    element.addEventListener('click', () => {

      // ******** Skip empty elements ******** //
      if(element.textContent == "") return

      // ******** Format output ******** //
      const selected_element = `${month_names.indexOf(curr_month) + 1}/${element.textContent}/${year}`
      
      // deselect the element if element already selected
      if(element.classList.value === 'calendar-day-selected') {
        element.classList.remove('calendar-day-selected')
        element.classList.add('calendar-day-hover')
        selected_date = selected_date.filter(date => date !== selected_element)
      }

      // select the element if element hasn't been selected
      else {
        element.classList.remove('calendar-day-hover')
        element.classList.add('calendar-day-selected')
        
        // check whether date already existed
        if(selected_date.includes(selected_element)) return
        else {
          selected_date.push(selected_element)
        }
      }
    })
  })
}



// ******** Month List ******** //
let month_list = calendar.querySelector('.monthList')

month_names.forEach((e, index) => {
  let month = document.createElement('div')
  month.innerHTML = `<div data-month="${index}" id="month">${e}</div>`
  month.querySelector('div').onclick = () => {
    month_list.classList.remove('show')
    curr_month.value = index
    generateCalendar(index, curr_year.value)
  }
  month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
  month_list.classList.add('show')
}


let currDate = new Date()
let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}
let curr_time = {value: currDate.getHours()}

// ******** Generate the calendar ******** //  
generateCalendar(curr_month.value, curr_year.value)


// ******** Previous Year ******** // 
document.querySelector('#previous-year').onclick = () => {
  --curr_year.value
  generateCalendar(curr_month.value, curr_year.value)
}

// ******** Next Year ******** // 
document.querySelector('#next-year').onclick = () => {
  ++curr_year.value
  generateCalendar(curr_month.value, curr_year.value)
}

// ******** Dark Mode ******** //
let dark = document.querySelector('#dark-mode-switch')
dark.onclick = () => {
  document.querySelector('body').classList.toggle('light')
  document.querySelector('body').classList.toggle('dark')
}

// ******** Submission Button ******** // 
const btn = document.querySelector('#calendar-confirm')

btn.addEventListener('click', () => {
  console.log(selected_date)
})
