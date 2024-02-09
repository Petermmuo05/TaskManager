export function checkiftoday(date) {
    console.log("the date is:");
    console.log(date);
    const newday = new Date(date);
    console.log(newday);
  
    const todaydays = new Date().toLocaleDateString();
    const datedays = newday.toLocaleDateString();
    console.log(todaydays, datedays);
    return datedays === todaydays ? true : false;
  }
  export function checkiftomorrow(date) {
    console.log("Tomorrow date:");
    const newday = new Date(date);
    console.log(newday);
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const todaydays = today.toLocaleDateString();
    const datedays = newday.toLocaleDateString();
    console.log(todaydays, datedays);
    return datedays === todaydays;
  }
  export function checkifinweek(givendate) {
    console.log("Loading this week's tasks");
    const today = new Date();
    const date = new Date(givendate);
    const daysdiff = 6 - today.getDay();
    if (daysdiff === 0) {
      return today.toLocaleDateString() === date.toLocaleDateString();
    } else {
      const standarddate = date.toLocaleDateString();
      const standard = today.toLocaleDateString();
      const daysarray = [];
      for (let i = 0; i <= daysdiff; i++) {
        const today = new Date();
        today.setDate(today.getDate() + i);
        console.log(standard);
        daysarray.push(today.toLocaleDateString());
      }
      console.log(daysarray);
      console.log(standard, standarddate);
      return daysarray.includes(standarddate);
    }
  }
