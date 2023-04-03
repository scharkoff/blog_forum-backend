export function createSortOptions(sortType) {
    const sortOptions = {};

    if (sortType === "new") {
        sortOptions.createdAt = -1;
    }

    if (sortType === "popular") {
        sortOptions.viewsCount = -1;
    }

    return sortOptions;
}