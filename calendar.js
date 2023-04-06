const calendar = document.querySelector('.calendar')
// ******** Input Box ******** //
const input = document.querySelector('#user-input')

// ******** Month List ******** //
const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// ******** Selected Dates ******** //
let selected_date_element = []
let selected_date = []
let input_date = []

let styled_input_date = []

// ******** Determine leap years ******** //
isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year, date) => {

  let calendar_days = calendar.querySelector('.calendar-days')
  let calendar_header_year = calendar.querySelector('#year')

  // ******** Determine days in specific month ******** // 
  let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // ******** Clear out the calendars ******** //  
  calendar_days.innerHTML = ''

  // ******** Current Date & Year & Month ******** //  
  let currDate = new Date()
  if (month == undefined || month == null) month = currDate.getMonth()
  if (year == undefined || year == null) year = currDate.getFullYear()
  if (date == undefined || date == null) date = currDate.getDate()

  // ******** Get current month & year ******** //  
  let curr_month = `${month_names[month]}`  
  month_picker.innerHTML = curr_month
  calendar_header_year.innerHTML = year

  // ******** Get first day of month ******** //
  let first_day = new Date(year, month, 1)  

  // ******** generate date elements ******** //
  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement('div')
    if (i >= first_day.getDay()) {
        day.classList.add('calendar-day-hover')
        day.innerHTML = i - first_day.getDay() + 1

        // save selected elements while rerendering
        if (selected_date.length > 0 && input_date.length == 0) {
          selected_date.forEach(date => {
            if (date.split('/')[1] === day.innerHTML && month === date.split('/')[0] - 1 && year === parseInt(date.split('/')[2])) {
              day.classList.remove('calendar-day-hover')
              day.classList.add('calendar-day-selected')
              styled_input_date.push(day)
              }

          })
        }

        // save input date
        // match day, month & year
        if (input_date.length > 0) {
          input_date.forEach(date => {
            if ((date.split('/')[1] === day.innerHTML || date.split('/')[1] === "0".concat(day.innerHTML)) && month === parseInt(date.split('/')[0] - 1) && year === date.split('/')[2]) {
              day.classList.remove('calendar-day-hover')
              day.classList.add('calendar-day-selected')
              styled_input_date.push(day)
              }

            // update selected value
            if (selected_date.length > 0) {
              selected_date.pop()
              selected_date.push(date)
            }
            else {
              selected_date.push(date)
            }

            // update selected element
            if (selected_date_element.length > 0) {
              selected_date_element.pop()
              selected_date_element.push(day)
            }
            else {
              selected_date_element.push(day)
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
      
      console.log(selected_date_element)

      // deselect the element if element already selected
      if(element.classList.value === 'calendar-day-selected') {
        element.classList.remove('calendar-day-selected')
        element.classList.add('calendar-day-hover')
        selected_date.pop()
        selected_date_element.pop()
        input.value = selected_date[0] ? selected_date[0] : ""
      }

      // select the element if element hasn't been selected
      else {

        // change color of onclick elements
        element.classList.remove('calendar-day-hover')
        element.classList.add('calendar-day-selected')
        
        // check whether date already existed in the array
        if(selected_date[0] == selected_element) return
        else {
          
          // situation 1: there is a clicked element
          if(selected_date_element.length > 0 && selected_date.length > 0) {
            selected_date_element[0].classList.remove('calendar-day-selected')
            selected_date_element[0].classList.add('calendar-day-hover')

            if (styled_input_date.length > 0) {
              styled_input_date.forEach(date => {
                  date.classList.remove('calendar-day-selected')
                  date.classList.add('calendar-day-hover')
              })
            }
          
            selected_date_element.pop()
            selected_date.pop()
          }

          // always push the elements and numbers
          selected_date_element.push(element)
          selected_date.push(selected_element)
          input.value = selected_date[0] ? selected_date[0] : ""
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
    generateCalendar(index, curr_year.value, 0)
  }
  month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
  month_list.classList.add('show')
}


// ******** Generate the today calendar ******** //  
let currDate = new Date()
let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}
let curr_time = {value: currDate.getHours()}
let curr_date = {value: currDate.getDate()}

generateCalendar(curr_month.value, curr_year.value, curr_date.value)



// input.value = "04/03/2022"
const submit = document.querySelector('#user-input-btn')
submit.addEventListener('click', (e) => {
  e.preventDefault()
  let sub_month = parseInt(input.value.split('/')[0]) - 1
  let sub_day = parseInt(input.value.split('/')[1])
  let sub_year = input.value.split('/')[2]

  curr_year.value = sub_year
  curr_month.value = sub_month
  curr_date.value = sub_day

  // check if the input data array is empty
  if (input_date.length > 0) {
    input_date.pop()
    input_date.push(input.value)
  }
  else {
    input_date.push(input.value)
  }

  generateCalendar(sub_month, sub_year, sub_day)
})


// ******** Previous Year ******** // 
document.querySelector('#previous-year').onclick = () => {
  --curr_year.value
  generateCalendar(curr_month.value, curr_year.value, 0)
}

// ******** Next Year ******** // 
document.querySelector('#next-year').onclick = () => {
  ++curr_year.value
  generateCalendar(curr_month.value, curr_year.value, 0)
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
