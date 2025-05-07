document.addEventListener('DOMContentLoaded', () => {
    const time = dotify.utils.currentTimeInfo();
    const now = dayjs();
    const currentHour = now.hour()%12;
    const currentDate = now.format('DD [of] MMMM');
    const currentMinute = now.minute();
    const weekDay = now.format("dddd")
    const weekDayElement = document.getElementById('weekday');
    if(weekDayElement){ // if is not null will run the code (to avoid error when at preferences remove this tag)
      weekDayElement.textContent = `${currentDate}  ( ${weekDay}) -  ${currentHour}:${currentMinute} ${time.ampm}`;
    }
  });