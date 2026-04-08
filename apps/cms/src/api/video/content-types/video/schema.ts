export default {
  "kind": "collectionType",
  "collectionName": "videos",
  "info": {
    "singularName": "video",
    "pluralName": "videos",
    "displayName": "Video",
    "description": "Educational video with embed URL and optional transcription"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "unique": true,
      "maxLength": 255
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "description": {
      "type": "text",
      "maxLength": 1000
    },
    "videoUrl": {
      "type": "string",
      "required": true,
      "maxLength": 500
    },
    "duration": {
      "type": "integer",
      "min": 0
    },
    "thumbnail": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "transcription": {
      "type": "blocks"
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category",
      "inversedBy": "videos"
    },
    "species": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::species.species",
      "inversedBy": "videos"
    },
    "area": {
      "type": "enumeration",
      "enum": [
        "anatomia",
        "fisiologia",
        "patologia",
        "farmacologia",
        "cirugia",
        "nutricion",
        "otro"
      ],
      "required": false
    },
    "level": {
      "type": "enumeration",
      "enum": ["basico", "intermedio", "avanzado"],
      "required": false
    },
    "tags": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::tag.tag",
      "inversedBy": "videos"
    },
    "seoTitle": {
      "type": "string",
      "maxLength": 70
    },
    "seoDescription": {
      "type": "text",
      "maxLength": 160
    }
  }
} as const;
