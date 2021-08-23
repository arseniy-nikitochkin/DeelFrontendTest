export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export function cn(classesObj = {}) {
    const result = [];
    for (const [className, value] of Object.entries(classesObj)) {
        if (value) result.push(className);
    }
    return result.join(' ');
}


export function getSelectedIndex(prevSelected, length, dec = false) {
    if (dec) {
        return (prevSelected + 1) === length ? 0 : prevSelected + 1;
    } else {
        return (prevSelected - 1) < 0 ? length - 1 : prevSelected - 1;
    }
}
