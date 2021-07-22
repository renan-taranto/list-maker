import EventSource from '@/services/event-source'
import ItemAddedHandler from '@/services/event-source/items/handlers/ItemAddedHandler'
import ItemArchivedHandler from '@/services/event-source/items/handlers/ItemArchivedHandler'
import ItemDescriptionChangedHandler from '@/services/event-source/items/handlers/ItemDescriptionChangedHandler'
import ItemMovedHandler from '@/services/event-source/items/handlers/ItemMovedHandler'
import ItemRestoredHandler from '@/services/event-source/items/handlers/ItemRestoredHandler'
import ItemTitleChangedHandler from '@/services/event-source/items/handlers/ItemTitleChangedHandler'

export default {
  create () {
    return EventSource.create('https://cqrs-event-sourcing-example.com/items', [
      ItemAddedHandler,
      ItemArchivedHandler,
      ItemDescriptionChangedHandler,
      ItemMovedHandler,
      ItemRestoredHandler,
      ItemTitleChangedHandler
    ])
  }
}
