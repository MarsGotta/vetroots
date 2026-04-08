export default {
  "kind": "collectionType",
  "collectionName": "species_list",
  "info": {
    "singularName": "species",
    "pluralName": "species-list",
    "displayName": "Species",
    "description": "Animal species for taxonomy"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true,
      "maxLength": 100
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "icon": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "fichas": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::ficha.ficha",
      "mappedBy": "species"
    },
    "posters": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::poster.poster",
      "mappedBy": "species"
    },
    "videos": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::video.video",
      "mappedBy": "species"
    }
  }
} as const;
