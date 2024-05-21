import { landingType } from './schemaTypes/landingType'
import { newsType } from './schemaTypes/newsType'
import { memberType } from './schemaTypes/memberType'
import { contactsType } from './schemaTypes/contactType';

export const schemaTypes = [newsType, memberType];
export const singletonTypes = [landingType, contactsType];
export const singletonTypeNames = new Set(singletonTypes.map(t => t.name as string));

export const singletonActions = new Set(["publish", "discardChanges", "restore"]);
