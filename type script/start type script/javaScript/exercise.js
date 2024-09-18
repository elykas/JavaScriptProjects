"use strict";
var ItemType;
(function (ItemType) {
    ItemType["Book"] = "book";
    ItemType["DVD"] = "dvd";
})(ItemType || (ItemType = {}));
function filterItems(items, filterFn) {
    return items.filter(filterFn);
}
const printItemsData = (items) => {
    items.forEach(item => {
        console.log(item);
    });
};
const libraryItems = [
    { type: ItemType.Book, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { type: ItemType.DVD, title: 'Inception', duration: 148 },
    { type: ItemType.Book, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { type: ItemType.DVD, title: 'Avatar', duration: 162 },
    { type: ItemType.Book, title: 'Go Set a Watchman', author: 'Harper Lee' },
];
const IsDvD = (item) => {
    return item.type === ItemType.DVD;
};
const longMovies = filterItems(libraryItems, (item) => IsDvD(item)
    && item.duration > 120);
console.log(longMovies);
function printItemsData1(items) {
    items.forEach(item => {
        if (item.type === ItemType.Book) {
            console.log(`Book - Title: ${item.title}, Author: ${item.author}`);
        }
        else if (item.type === ItemType.DVD) {
            console.log(`DVD - Title: ${item.title}, Duration: ${item.duration} minutes`);
        }
    });
}
printItemsData(libraryItems);
function arrayOfTypes(item1, item2) {
    return [item1, item2];
}
const pair = arrayOfTypes('gy', 6);
console.log(pair);
function getValue(obj, key) {
    return obj[key];
}
function addObjectToArray(items, objToAdd) {
    return items.map(item => {
        return Object.assign(Object.assign({}, item), objToAdd);
    });
}
