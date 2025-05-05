document.addEventListener('DOMContentLoaded', () => {
    const time = dotify.utils.currentTimeInfo();
    const weekDay = dayjs().add(2, 'day').format('dddd');
    const weekDayElement = document.getElementById('weekday');
    if(weekDayElement){ // if is not null will run the code (to avoid error when at preferences remove this tag)
      weekDayElement.textContent = `${weekDay}  -  ${time.hour12}:${time.min} ${time.ampm}`;
    }
  });