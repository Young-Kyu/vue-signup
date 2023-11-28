
export function unloadConfirmation() {

  function beforeUnloadEvent(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = true;
  }

  function addEvent() {
    window.addEventListener('beforeunload', beforeUnloadEvent);
  };
  function destoryEvent() {
    window.removeEventListener('beforeunload', beforeUnloadEvent)
  }

  return {
    addEvent,
    destoryEvent,
  }
}