export const searchByName = (string, query) => {
    const words = string.split(" ");
    return words.some(word => {
        return word.toLowerCase().startsWith(query.toLowerCase());
    });
}

export const searchByCategory = (string, query, separator) => {
    const tags = string.split(separator);
    for (let i = 0; i < tags.length; i++) {
        tags[i] = tags[i].trim().toLowerCase();
    }

    const queryWords = query.split(separator);
    for (let i = 0; i < queryWords.length; i++) {
        queryWords[i] = queryWords[i].trim().toLowerCase();
    }

    return queryWords.every(queryWord => {
        return tags.some(tag => {
            const words = tag.split(" ");
            return words.some(word => word.startsWith(queryWord));
        })
    });
}