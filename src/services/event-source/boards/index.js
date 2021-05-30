import EventSource from '@/services/event-source'
import BoardCreatedHandler from '@/services/event-source/boards/handlers/BoardCreatedHandler'
import BoardClosedHandler from '@/services/event-source/boards/handlers/BoardClosedHandler'
import BoardTitleChangedHandler from '@/services/event-source/boards/handlers/BoardTitleChangedHandler'
import BoardReopenedHandler from '@/services/event-source/boards/handlers/BoardReopenedHandler'

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
