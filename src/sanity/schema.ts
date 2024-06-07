import { landingType } from './schemaTypes/landingType'
import { newsType } from './schemaTypes/newsType'
import { memberType } from './schemaTypes/memberType'
import { contactsType } from './schemaTypes/contactsType';
import { storyType } from './schemaTypes/storyType';
import { storyCategory } from './schemaTypes/storyCategory';
import { ahimsaImageType } from './schemaTypes/imageType';

export const schemaTypes = [newsType, memberType, storyType, storyCategory];
export const singletonTypes = [landingType, contactsType];

export const singletonTypeNames = new Set(singletonTypes.map(t => t.name as string));

export const singletonActions = new Set(["publish", "discardChanges", "restore"]);
