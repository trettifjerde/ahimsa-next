/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/content/[[...index]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import { schemaTypes, singletonActions, singletonTypeNames, singletonTypes } from '@/sanity/schema'
import { colorInput } from '@sanity/color-input'
import { ahimsaImageType } from '@/sanity/schemaTypes/imageType'

export default defineConfig({
  basePath: '/content',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: {
    types: [...schemaTypes, ...singletonTypes, ahimsaImageType],
    templates: (templates) => 
        templates.filter(({ schemaType }) => {
          return !singletonTypeNames.has(schemaType)
        }),
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Sadržaj")
          .items([

            // Our singleton type has a list item with a custom child
            ...singletonTypes.map(singleton => S.listItem()
              .title(singleton.preview?.select?.title || singleton.name)
              .id(singleton.name)
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType(singleton.name)
                  .documentId(singleton.name)
              ),
            ),
            // Regular document types
            ...schemaTypes.map(type => S.documentTypeListItem(type.name).title(type.title || type.name))
          ]),
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    colorInput()
  ],
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypeNames.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
