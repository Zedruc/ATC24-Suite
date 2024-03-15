// define the event function for scripts that need it early
let self;
let focusOutEvent = event => {
  console.log('FOCUS');
  console.log(event.target);
  StripSaveManager.updateStrip(
    /* self */ event.target.parentElement.parentElement,
    /* self */ event.target.parentElement.parentElement.parentElement
  );
};
