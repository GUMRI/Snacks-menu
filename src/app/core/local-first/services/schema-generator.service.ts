import { RxJsonSchema, TopLevelProperty } from 'rxdb/plugins/core';
import { BaseDoc } from '../types/doc.models';

/**
 * Generate RxDB schema properties from a model definition
 */
export function generateRxSchema<T>(
  collectionName: string,
  mainProperties: RxJsonSchema<T>['properties'],
  required: RxJsonSchema<T>['required'][] = [],
  indexes: RxJsonSchema<T>['indexes'][] = []
) {
  const properties: RxJsonSchema<T & BaseDoc>['properties'] = {
    id: {
      type: 'string',
      maxLength: 100,
    },
   
   
    
    files: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          data: { type: 'string' }, // Blob as base64 string
        },
      },
    },
    logs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: { type: 'string' },
          at: {
            type: 'string',
            format: 'date-time',
          },
          by: { type: 'string' },
          before: { type: 'string' },
          updateObj: { type: 'string' },
        },
      },
    },
  } as any;

  const schema: RxJsonSchema<T & BaseDoc> = {
    title: `${collectionName}_schema`,
    primaryKey: 'id',
    version: 0,
    description: `Dynamic schema for ${collectionName}`,
    type: 'object',
    properties: {
      ...properties,
      ...mainProperties,
    },
    required: ['id'],
  };

  return schema;
}
