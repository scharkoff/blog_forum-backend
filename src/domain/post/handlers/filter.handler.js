export default function createFilterOptions(searchValue, tagValue) {
    let filterOptions = {};

    if (searchValue && tagValue) {
        filterOptions = { title: new RegExp(searchValue, 'i'), tags: tagValue };
    } else {
        if (searchValue) {
            filterOptions = { title: new RegExp(searchValue, 'i') };
        }

        if (tagValue) {
            filterOptions = { tags: tagValue };
        }
    }

    return filterOptions;
}
