/**
 * eventのpathを取得します
 * @link https://gist.github.com/leofavre/d029cdda0338d878889ba73c88319295
 * ES6版に書き直し
 */
export const getEventPaths = (evt: Event): (Node | Window)[] => {
  let path = evt.composedPath?.() || null
  const target = evt.target as Node

  if (path != null) {
    // Safari doesn't include Window, and it should.
    path = path.indexOf(window) < 0 ? path.concat([window]) : path
    return path as (Node | Window)[]
  }

  if (target instanceof Window) {
    return [window]
  }

  const getParents = (node: Node, memo: Node[]): Node[] => {
    const updatedMemo = memo || []
    const parentNode = node.parentNode

    if (!parentNode) {
      return memo
    }

    return getParents(parentNode, updatedMemo.concat([parentNode]))
  }

  return ([target] as (Node | Window)[])
    .concat(getParents(target, []))
    .concat([window])
}
