export const sendEventMessage = (eventType, eventMessage) => {
    window.top.postMessage(
      JSON.stringify({
        eventType,
        eventMessage,
      }),
      "*"
    );
  };