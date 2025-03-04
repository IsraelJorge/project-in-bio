export function sanitizeLink(link?: string) {
  if (!link) return ''

  return link
    .replace(/\s/g, '')
    .replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,ˆ.<>\/?]+/, '')
    .toLocaleLowerCase()
}
