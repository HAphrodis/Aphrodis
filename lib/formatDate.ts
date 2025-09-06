export const getFormattedDateRange = (
  startDate?: string,
  releaseDate?: string,
  date?: string,
) => {
  if (startDate && releaseDate) {
    const startDateObj = new Date(startDate);
    const releaseDateObj = new Date(releaseDate);

    const startMonth = startDateObj.toLocaleString("en-US", { month: "short" });
    const startDay = startDateObj.getDate();
    const releaseMonth = releaseDateObj.toLocaleString("en-US", {
      month: "short",
    });
    const releaseDay = releaseDateObj.getDate();
    const releaseYear = releaseDateObj.getFullYear();

    return `${startMonth} ${startDay} - ${releaseMonth} ${releaseDay}, ${releaseYear}`;
  }

  return releaseDate
    ? new Date(releaseDate).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : date;
};

//  project duration
export const getProjectDuration = (
  startDate?: string,
  releaseDate?: string,
) => {
  if (startDate && releaseDate) {
    const start = new Date(startDate);
    const end = new Date(releaseDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} days`;
    } else {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
    }
  }
  return null;
};
