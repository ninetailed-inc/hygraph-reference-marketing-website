import { MergeTag } from '@ninetailed/experience.js-next'

export function parseMergeTags(content) {
  // Regular expression to match [[ ]] with optional whitespace and capture the content inside
  const regex = /\[\[\s*([^\]]+?)\s*\]\]/g

  let lastIndex = 0
  let result = []

  content.replace(regex, (match, captured, index) => {
    if (index > lastIndex) {
      result.push(content.substring(lastIndex, index))
    }

    result.push(<MergeTag id={captured} key={index} />)

    lastIndex = index + match.length
  })

  if (lastIndex < content.length) {
    result.push(content.substring(lastIndex))
  }

  return <>{result}</>
}
