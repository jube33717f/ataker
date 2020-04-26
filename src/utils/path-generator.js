export function deleteLastSubPath(pathname) {
    return pathname.split('/').slice(0, -1).join('/');
}