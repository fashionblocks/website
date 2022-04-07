

export function imgUrl(filename: string) {

    return [
        '/fs',
        filename.substr(0, 2),
        filename.substr(2, 2),
        filename
    ].join('/')
}
