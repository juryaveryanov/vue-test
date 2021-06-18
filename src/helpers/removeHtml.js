export default function removeHtml (str) {
  return str.replace(/<\/?[^>]+(>|$)/g, '').trim()
}
