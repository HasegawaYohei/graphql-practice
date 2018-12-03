SELECT
    "article"."id",
    "article"."title",
    "article"."content",
    "article"."image",
    "article"."created_at",
    "article"."updated_at",
    "tags"."id" AS "tags.id",
    "tags"."name" AS "tags.name",
    "tags->articletag"."article_id" AS "tags.articletag.articleId",
    "tags->articletag"."tag_id" AS "tags.articletag.tagId",
    "tags->articletag"."created_at" AS "tags.articletag.created_at",
    "tags->articletag"."updated_at" AS "tags.articletag.updated_at"
FROM
    "articles" AS "article"
    LEFT OUTER JOIN
        (
            "articletags" AS "tags->articletag"
            INNER JOIN
                "tags" AS "tags"
            ON  "tags"."id" = "tags->articletag"."tag_id"
        )
    ON  "article"."id" = "tags->articletag"."article_id"
;

