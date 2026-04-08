export default {
  "kind": "collectionType",
  "collectionName": "posters",
  "info": {
    "singularName": "poster",
    "pluralName": "posters",
    "displayName": "Poster",
    "description": "High-resolution educational poster with downloadable PDF"
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
    "image": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "downloadablePdf": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["files"]
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category",
      "inversedBy": "posters"
    },
    "species": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::species.species",
      "inversedBy": "posters"
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
      "inversedBy": "posters"
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
