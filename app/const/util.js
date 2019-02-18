export const getLimitedString = (str, start, targetLength, position) => {
    if (!str || str === undefined || str.length === 0) {
        return '';
    }
    if (targetLength >= str.length) {
        return str;
    }
    const length = targetLength - 3;
    if (position === 'end') {
        return str.substring(start, length) + '...';
    }
    if (position === 'mid') {
        const firstPart = (length % 2 === 1) ? (length - 1) / 2 : length / 2;
        const secondPart = length - firstPart;
        return str.substring(start, firstPart) + '...' + str.substring(str.length - secondPart);
    }
    if (position === 'start') {
        return '...' + str.substring(start.length - length);
    }
};