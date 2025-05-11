document.addEventListener('DOMContentLoaded', () => {
    const time = dotify.utils.currentTimeInfo();
    const now = dayjs();
    const currentHour = (now.hour())?now.hour()%12:now.hour();
    const currentDate = now.format('DD [of] MMMM');
    let currentMinute = now.minute();
    if(currentMinute<10)currentMinute='0'+currentMinute;
    
    const weekDay = now.format("dddd")
    const weekDayElement = document.getElementById('weekday');
    const currentTimeDiv = document.getElementById('headerTime');
    if(weekDayElement){ // if is not null will run the code (to avoid error when at preferences remove this tag)
      weekDayElement.textContent = `${currentDate}  (${weekDay}) `;
      console.log("header is loading");
    }
    currentTimeDiv.textContent +=` ${currentHour}:${currentMinute} ${time.ampm}`;
  });