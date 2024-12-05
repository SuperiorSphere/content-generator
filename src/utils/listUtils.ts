import { TextListElementTypeEnum } from "../types/LessonTypes";

export const getListCharacter = (
  type: TextListElementTypeEnum,
  position: number
) => {
  if (type === TextListElementTypeEnum.DASH) {
    return "-";
  } else if (type === TextListElementTypeEnum.NUMBER) {
    return `${position}.`;
  } else if (type === TextListElementTypeEnum.POINT) {
    return "·";
  } else {
    return "?";
  }
};
