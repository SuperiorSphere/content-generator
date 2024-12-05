import { ContentElement } from "../types/LessonTypes";

export function stripIds(
  elements: ContentElement[]
): Omit<ContentElement, "id">[] {
  return elements.map((element) => {
    const { id, ...rest } = element;

    if ("textList" in rest) {
      return {
        ...rest,
        textList: rest.textList.map(({ id, ...entry }) => entry),
      } as Omit<ContentElement, "id">;
    }

    if ("books" in rest) {
      return {
        ...rest,
        books: rest.books.map((book) => ({ ...book })),
      } as Omit<ContentElement, "id">;
    }

    return rest as Omit<ContentElement, "id">;
  });
}
