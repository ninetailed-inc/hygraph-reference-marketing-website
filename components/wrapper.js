import * as Blocks from '@/blocks'
import { Personalize } from '@ninetailed/experience-sdk-nextjs'

export default function Wrapper({ banner, blocks, hero, navigation, ...page }) {
  return (
    <>
      {blocks.map((block) => {
        const Component = Blocks[block.component] || Blocks[block.__typename]

        if (!Component) return null

        console.log(page);

        console.log(block);

console.log((block.variants || []).map(variant => ({page, key: variant.id, ...variant})))

        if (!block.variants || !block.variants.length) {
          return <Component key={block.id} page={page} {...block} />
        }

        // return null;
        return <Personalize component={Component} id={block.id} key={block.id} page={page} {...block} variants={(block.variants || []).map(variant => ({...variant, page, key: variant.id,}))} />
      })}
    </>
  )
}
