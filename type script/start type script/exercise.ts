enum ItemType {
    Book = 'book',
    DVD = 'dvd'
}

interface Book {
    type : ItemType,
    title : string,
    author : string
}

interface DVD {
    type:string,
    title:string,
    duration:number
}

function filterItems <T>(items: T[],filterFn:(item:T) => boolean):T[] {
    return items.filter(filterFn)
}

const printItemsData = <T>(items: T[]): void => {
    items.forEach(item => {
        console.log(item);
    });
}



const libraryItems: (Book | DVD)[] = [
    { type: ItemType.Book, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { type: ItemType.DVD, title: 'Inception', duration: 148 },
    { type: ItemType.Book, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { type: ItemType.DVD, title: 'Avatar', duration: 162 },
    { type: ItemType.Book, title: 'Go Set a Watchman', author: 'Harper Lee' },
  ];

  const IsDvD = (item: Book|DVD): item is DVD => {
    return item.type === ItemType.DVD 
  }

  const longMovies = filterItems(libraryItems, (item):item is DVD => IsDvD(item) 
  && item.duration > 120)
  console.log(longMovies);
  
  function printItemsData1(items: (Book | DVD)[]): void {
    items.forEach(item => {
        if (item.type === ItemType.Book) {
            console.log(`Book - Title: ${(item as Book).title}, Author: ${(item as Book).author}`);
        } else if (item.type === ItemType.DVD) {
            console.log(`DVD - Title: ${(item as DVD).title}, Duration: ${(item as DVD).duration} minutes`);
        }
    });
}
printItemsData(libraryItems)
  
  


function arrayOfTypes <T,U>(item1: T,item2:U): [T,U]{
    return [item1,item2]
}

const pair = arrayOfTypes<string,number>('gy',6);
console.log(pair);

function getValue<T,K extends keyof T>(obj : T, key: K):T[K]{
    return obj[key]
}


function addObjectToArray<T extends object, K extends keyof any, V>(
    items: T[],
    objToAdd: Record<K, V>
): (T & Record<K, V>)[] {
    return items.map(item => {
        return { ...item, ...objToAdd };
    });
}






