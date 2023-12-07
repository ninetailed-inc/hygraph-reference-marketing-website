import * as Blocks from '@/blocks'
import { Personalize } from '@ninetailed/experience.js-next'

export default function Wrapper({ blocks, ...page }) {
  return (
    <>
      {blocks.map((block) => {
        const Component = Blocks[block.component] || Blocks[block.__typename]

        if (!Component) return null

        return (
          <Personalize
            {...block}
            key={block.id}
            component={Component}
            page={page}
            variants={
              block.variants?.map((variant) => ({ ...variant, page })) || []
            }
          ></Personalize>
        )
      })}
    </>
  )
}
