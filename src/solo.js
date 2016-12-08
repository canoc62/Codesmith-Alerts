
class SoloClock {

  constructor(seconds) {
    this.seconds = seconds;
  }

  convertMins(mins) {
    return mins * 60;
  }

  displayTime() {
    return this.displayMins() + ":" + this.displaySeconds();
  }

  displayMins(seconds) {
    const displayedMins = Math.floor(this.seconds/60);

    if (displayedMins < 10) {
      return '0' + displayedMins;
    }
    return displayedMins;
  }

  displaySeconds() {
    const displayedSeconds = this.seconds % 60;

    if (displayedSeconds < 10) {
      return '0' + displayedSeconds;
    }
    return this.seconds % 60;
  }

}

document.addEventListener('DOMContentLoaded', () => {

  const workClock = new SoloClock(2);
  const restClock = new SoloClock(10);

  const workClockDiv = document.getElementById('work-clock');
  workClockDiv.innerHTML = workClock.displayTime();
  const restClockDiv = document.getElementById('rest-clock');
  restClockDiv.innerHTML = restClock.displayTime();

  const reset = document.getElementById('reset-button');

  const workClockStart = document.getElementById('start-work-button');

  /* Refactor to one function for add and another for subtract */
  const addWorkMins = document.getElementById('add-work-mins-button');
  addWorkMins.addEventListener('click', () => {
    workClock.seconds += 300;
    workClockDiv.innerHTML = workClock.displayTime();
  });

  const subtractWorkMins = document.getElementById('subtract-work-mins-button');
  subtractWorkMins.addEventListener('click', () => {
    if (workClock.seconds - 300 >= 0) {
      workClock.seconds -= 300;
    }
    workClockDiv.innerHTML = workClock.displayTime();
  });

  const addRestMins = document.getElementById('add-rest-mins-button');
  addRestMins.addEventListener('click', () => {
    restClock.seconds += 300;
    restClockDiv.innerHTML = restClock.displayTime();
  });

  const subtractRestMins = document.getElementById('subtract-rest-mins-button');
  subtractRestMins.addEventListener('click', () => {
    if (restClock.seconds - 300 >= 0) {
      restClock.seconds -= 300;
    }
    restClockDiv.innerHTML = restClock.displayTime();
  });

  /* ----------------------------------------------------     */

  workClockStart.addEventListener('click', () => {
    workClockStart.disabled = true;
    addWorkMins.disabled = true;
    subtractWorkMins.disabled = true;
    addRestMins.disabled = true;
    subtractRestMins.disabled = true;
    reset.disabled = true;

    const workTimer = setInterval(() => {
      workClock.seconds -= 1;
      workClockDiv.innerHTML = workClock.displayTime();

      if (workClock.seconds <= 0) {
        clearInterval(workTimer);
        workClockDiv.innerHTML = workClock.displayTime();
        reset.disabled = false;

        const restTimer = setInterval(() => {
          restClock.seconds -= 1;
          restClockDiv.innerHTML = restClock.displayTime();

          if (restClock.seconds <= 0) {
            clearInterval(restTimer);
            workClockDiv.innerHTML = workClock.displayTime();

            workClock.seconds = 1500;
            workClockDiv.innerHTML = workClock.displayTime();

            restClock.seconds = 300;
            restClockDiv.innerHTML = restClock.displayTime();

            addRestMins.disabled = false;
            subtractRestMins.disabled = false;
            workClockStart.disabled = false;
            addWorkMins.disabled = false;
            subtractWorkMins.disabled = false;
          }
        }, 1000);

        reset.addEventListener('click', () => {
          clearInterval(restTimer);

          workClock.seconds = 1500;
          workClockDiv.innerHTML = workClock.displayTime();

          restClock.seconds = 300;
          restClockDiv.innerHTML = restClock.displayTime();

          reset.disabled = true;
          addRestMins.disabled = false;
          subtractRestMins.disabled = false;
          workClockStart.disabled = false;
          addWorkMins.disabled = false;
          subtractWorkMins.disabled = false;
        });

      }
    }, 1000);
  });

}); 

