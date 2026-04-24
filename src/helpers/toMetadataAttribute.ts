import {
  MetadataAttributeType,
  type MetadataAttribute,
} from '@lens-protocol/metadata';

export const toMetadataAttribute = (
  attr: MetadataAttribute,
): MetadataAttribute => {
  switch (attr.type) {
    case MetadataAttributeType.BOOLEAN:
      return {
        type: MetadataAttributeType.BOOLEAN,
        key: attr.key,
        value: attr.value as 'true' | 'false',
      };
    case MetadataAttributeType.DATE:
      return {
        type: MetadataAttributeType.DATE,
        key: attr.key,
        value: attr.value,
      };
    case MetadataAttributeType.NUMBER:
      return {
        type: MetadataAttributeType.NUMBER,
        key: attr.key,
        value: attr.value,
      };
    case MetadataAttributeType.JSON:
      return {
        type: MetadataAttributeType.JSON,
        key: attr.key,
        value: attr.value,
      };
    case MetadataAttributeType.STRING:
    default:
      return {
        type: MetadataAttributeType.STRING,
        key: attr.key,
        value: attr.value,
      };
  }
};
