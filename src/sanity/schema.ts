import { type SchemaTypeDefinition } from 'sanity'
import { landingType } from './schemaTypes/landingType'
import { newsType } from './schemaTypes/newsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [landingType, newsType],
}
