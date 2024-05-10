import { type SchemaTypeDefinition } from 'sanity'
import { landingType } from './schemaTypes/landingType'
import { newsType } from './schemaTypes/newsType'
import { memberType } from './schemaTypes/memberType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [landingType, newsType, memberType],
}
