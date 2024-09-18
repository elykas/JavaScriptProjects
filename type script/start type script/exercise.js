var ItemType;
(function (ItemType) {
    ItemType["Book"] = "book";
    ItemType["DVD"] = "dvd";
})(ItemType || (ItemType = {}));
function filterItems(items, filterFn) {
    return items.filter(filterFn);
}
var printItemsData = function (items) {
    items.forEach(function (item) {
        console.log(item);
    });
};
var libraryItems = [
    { type: ItemType.Book, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { type: ItemType.DVD, title: 'Inception', duration: 148 },
    { type: ItemType.Book, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { type: ItemType.DVD, title: 'Avatar', duration: 162 },
    { type: ItemType.Book, title: 'Go Set a Watchman', author: 'Harper Lee' },
];
var IsDvD = function (item) {
    return item.type === ItemType.DVD;
};
var longMovies = filterItems(libraryItems, function (item) { return IsDvD(item)
    && item.duration > 120; });
console.log(longMovies);
printItemsData(libraryItems);
