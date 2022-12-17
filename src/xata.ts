// Generated by Xata Codegen 0.21.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "catalog",
    columns: [
      { name: "title", type: "string" },
      {
        name: "journal",
        type: "link",
        link: { table: "journal" },
        unique: true,
      },
    ],
  },
  {
    name: "user",
    columns: [
      { name: "name", type: "string" },
      { name: "email", type: "string" },
      { name: "password", type: "string" },
    ],
  },
  {
    name: "journal",
    columns: [
      { name: "title", type: "string" },
      { name: "user", type: "link", link: { table: "user" }, unique: true },
    ],
  },
  {
    name: "article",
    columns: [
      { name: "title", type: "string" },
      { name: "description", type: "text" },
      {
        name: "catalog",
        type: "link",
        link: { table: "catalog" },
        unique: true,
      },
      { name: "tags", type: "multiple" },
    ],
  },
  {
    name: "tag",
    columns: [
      { name: "title", type: "string" },
      {
        name: "journal",
        type: "link",
        link: { table: "journal" },
        unique: true,
      },
    ],
  },
  {
    name: "content",
    columns: [
      { name: "data", type: "text" },
      {
        name: "article",
        type: "link",
        link: { table: "article" },
        unique: true,
      },
    ],
  },
  {
    name: "comment",
    columns: [
      { name: "data", type: "text" },
      {
        name: "article",
        type: "link",
        link: { table: "article" },
        unique: true,
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Catalog = InferredTypes["catalog"];
export type CatalogRecord = Catalog & XataRecord;

export type User = InferredTypes["user"];
export type UserRecord = User & XataRecord;

export type Journal = InferredTypes["journal"];
export type JournalRecord = Journal & XataRecord;

export type Article = InferredTypes["article"];
export type ArticleRecord = Article & XataRecord;

export type Tag = InferredTypes["tag"];
export type TagRecord = Tag & XataRecord;

export type Content = InferredTypes["content"];
export type ContentRecord = Content & XataRecord;

export type Comment = InferredTypes["comment"];
export type CommentRecord = Comment & XataRecord;

export type DatabaseSchema = {
  catalog: CatalogRecord;
  user: UserRecord;
  journal: JournalRecord;
  article: ArticleRecord;
  tag: TagRecord;
  content: ContentRecord;
  comment: CommentRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Andrew-s-workspace-c59hq8.us-east-1.xata.sh/db/it-notebook-db",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};