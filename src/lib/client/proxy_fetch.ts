export function proxy_fetch(url: string) {
    return fetch('/api/proxy?url=' + encodeURI(url));
}