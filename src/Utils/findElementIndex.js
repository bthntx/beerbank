export function findElementIndex(needle, array) {
    return array.findIndex((element) => {
        return (element === needle);
    })
}
