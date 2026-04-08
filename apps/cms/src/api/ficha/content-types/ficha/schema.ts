export default {
  "kind": "collectionType",
  "collectionName": "fichas",
  "info": {
    "singularName": "ficha",
    "pluralName": "fichas",
    "displayName": "Ficha",
    "description": "Educational veterinary card — the core content unit"
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
    "summary": {
      "type": "text",
      "maxLength": 500
    },
    "content": {
      "type": "blocks",
      "required": true
    },
    "coverImage": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "images": {
      "type": "media",
      "multiple": true,
      "required": false,
      "allowedTypes": ["images"]
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category",
      "inversedBy": "fichas"
    },
    "species": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::species.species",
      "inversedBy": "fichas"
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
      "inversedBy": "fichas"
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
