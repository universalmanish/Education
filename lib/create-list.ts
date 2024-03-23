export const createList = (data:string) => {
    const items = data.split(',').map(item => item.trim());
    return items
}