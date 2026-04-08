export default {
  "kind": "singleType",
  "collectionName": "home_pages",
  "info": {
    "singularName": "home-page",
    "pluralName": "home-pages",
    "displayName": "Home Page",
    "description": "Home page content — hero, featured items"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "heroTitle": {
      "type": "string",
      "required": true,
      "maxLength": 100
    },
    "heroSubtitle": {
      "type": "text",
      "maxLength": 300
    },
    "heroImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "featuredFichas": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::ficha.ficha"
    },
    "featuredPosters": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::poster.poster"
    }
  }
} as const;
