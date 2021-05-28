export default {
  create (topic, handlers) {
    const eventSource = new EventSource(
      `${process.env.VUE_APP_MERCURE_HUB_URL}/.well-known/mercure?topic=` + encodeURIComponent(topic)
    )

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      for (const handler of handlers) {
        if (handler.eventType === data.eventType) {
          handler.handle(data.payload)
        }
      }
    }

    return eventSource
  }
}
