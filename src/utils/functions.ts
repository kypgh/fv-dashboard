import { DateTime } from "luxon";

export const generatePagination = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  if (totalPages <= 7) {
    return Array.from(
      { length: Number(totalPages) },
      (_, index: number) => index + 1
    );
  } else {
    //at the start
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    } else if (
      Math.min(currentPage + 2, totalPages, totalPages) == totalPages
    ) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  }
};

export const formatDate = (date: string, format: string) => {
  const nDate = DateTime.fromISO(date).toFormat(format);

  return nDate;
};
