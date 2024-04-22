import { type SchemaTypeDefinition } from 'sanity'
import { eventType } from './schemaTypes/eventType'
import { venueType } from './schemaTypes/venueType'
import { artistType } from './schemaTypes/artistType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, venueType, artistType],
}
