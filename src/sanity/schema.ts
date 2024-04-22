import { type SchemaTypeDefinition } from 'sanity'
import { eventType } from './schemaTypes/eventType'
import { venueType } from './schemaTypes/venueType'
import { artistType } from './schemaTypes/artistType'
import { landingType } from './schemaTypes/landingType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [landingType],
}
