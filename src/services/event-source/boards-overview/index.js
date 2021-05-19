import EventSource from '@/services/event-source'
import BoardCreatedHandler from '@/services/event-source/boards-overview/handlers/BoardCreatedHandler'
import BoardClosedHandler from '@/services/event-source/boards-overview/handlers/BoardClosedHandler'
import BoardTitleChangedHandler from '@/services/event-source/boards-overview/handlers/BoardTitleChangedHandler'
import BoardReopenedHandler from '@/services/event-source/boards-overview/handlers/BoardReopenedHandler'

export default {
  create () {
    return EventSource.create('https://cqrs-event-sourcing-example.com/boards', [
      BoardCreatedHandler,
      BoardClosedHandler,
      BoardTitleChangedHandler,
      BoardReopenedHandler
    ])
  }
}
