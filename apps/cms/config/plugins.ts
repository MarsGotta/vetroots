export default ({ env }) => ({
  // Cloudflare R2 upload provider (S3-compatible)
  upload: {
    config: {
      provider: "@strapi/provider-upload-aws-s3",
      providerOptions: {
        baseUrl: `https://${env("R2_PUBLIC_DOMAIN", "media.vetroots.com")}`,
        s3Options: {
          credentials: {
            accessKeyId: env("R2_ACCESS_KEY_ID"),
            secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
          },
          endpoint: `https://${env("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
          region: "auto",
          params: {
            Bucket: env("R2_BUCKET", "vetroots-media"),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },

  // Meilisearch search integration
  meilisearch: {
    config: {
      host: env("MEILISEARCH_HOST", "http://127.0.0.1:7700"),
      apiKey: env("MEILISEARCH_MASTER_KEY"),
      ficha: {
        indexName: "ficha",
        transformEntry({ entry }) {
          return {
            ...entry,
            // Flatten relations for search
            category_name: entry.category?.name,
            species_names: entry.species?.map((s) => s.name) || [],
            tag_names: entry.tags?.map((t) => t.name) || [],
          };
        },
        settings: {
          searchableAttributes: [
            "title",
            "summary",
            "content",
            "category_name",
            "species_names",
            "tag_names",
          ],
          filterableAttributes: [
            "category_name",
            "species_names",
            "area",
            "level",
          ],
          sortableAttributes: ["title", "publishedAt", "createdAt"],
        },
      },
      poster: {
        indexName: "poster",
        transformEntry({ entry }) {
          return {
            ...entry,
            category_name: entry.category?.name,
            species_names: entry.species?.map((s) => s.name) || [],
            tag_names: entry.tags?.map((t) => t.name) || [],
          };
        },
        settings: {
          searchableAttributes: [
            "title",
            "description",
            "category_name",
            "species_names",
            "tag_names",
          ],
          filterableAttributes: [
            "category_name",
            "species_names",
            "area",
            "level",
          ],
          sortableAttributes: ["title", "publishedAt", "createdAt"],
        },
      },
      video: {
        indexName: "video",
        transformEntry({ entry }) {
          return {
            ...entry,
            category_name: entry.category?.name,
            species_names: entry.species?.map((s) => s.name) || [],
            tag_names: entry.tags?.map((t) => t.name) || [],
          };
        },
        settings: {
          searchableAttributes: [
            "title",
            "description",
            "transcription",
            "category_name",
            "species_names",
            "tag_names",
          ],
          filterableAttributes: [
            "category_name",
            "species_names",
            "area",
            "level",
          ],
          sortableAttributes: ["title", "publishedAt", "createdAt"],
        },
      },
    },
  },
});
