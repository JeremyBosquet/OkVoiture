export function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string[0].toUpperCase() + string.slice(1);
}
