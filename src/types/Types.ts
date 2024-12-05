type Basic = {
  id: string;
};

export type ContentType =
  | "text"
  | "textList"
  | "title"
  | "subtitle"
  | "image"
  | "curiosity"
  | "important"
  | "books"
  | "author";

export interface ImportantElement extends Basic {
  important: string;
}

export interface CuriosityElement extends Basic {
  curiosity: string;
}

export interface ImageElement extends Basic {
  key: string;
  image: string;
  caption?: string;
}

export enum TextListElementType {
  DASH = "DASH",
  POINT = "POINT",
  NUMBER = "NUMBER",
}

export interface ListEntry extends Basic {
  title?: string;
  text: string;
}

export interface TextListElement extends Basic {
  marginTop?: number;
  type: TextListElementType;
  textList: Array<ListEntry>;
}

export interface TextElement extends Basic {
  id: string;
  text: string;
}

export interface TitleElement extends Basic {
  title: string;
}

export interface SubtitleElement extends Basic {
  subtitle: string;
}

export type Book = {
  title: string;
  author: string;
};

export interface BookElement extends Basic {
  books: Array<Book>;
}

export interface AuthorElement extends Basic {
  author: AuthorData;
}

export type AuthorData = {
  fullName: string;
  url?: string;
  description: string;
  secondaryUrl?: string;
  photoUrl?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  blog?: string;
};

export type LessonContent = {
  content: Array<ContentElement>;
};
export type ContentElement =
  | TextElement
  | TextListElement
  | ImageElement
  | CuriosityElement
  | ImportantElement
  | TitleElement
  | SubtitleElement
  | BookElement
  | AuthorElement;
