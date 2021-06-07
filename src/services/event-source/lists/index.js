import EventSource from '@/services/event-source'
import ListArchivedHandler from '@/services/event-source/lists/handlers/ListArchivedHandler'
import ListCreatedHandler from '@/services/event-source/lists/handlers/ListCreatedHandler'
import ListMovedHandler from '@/services/event-source/lists/handlers/ListMovedHandler'
import ListRestoredHandler from '@/services/event-source/lists/handlers/ListRestoredHandler'
import ListTitleChangedHandler from '@/services/event-source/lists/handlers/ListTitleChangedHandler'

export default {
  create () {
    return EventSource.create('https://cqrs-event-sourcing-example.com/lists', [
      ListArchivedHandler,
      ListCreatedHandler,
      ListMovedHandler,
      ListRestoredHandler,
      ListTitleChangedHandler
    ])
  }
}
