// @vitest-environment node
import store from 'store2'
import { removeLocalStorage } from '../remove/remove-local-storage'
import { setLocalStorage } from '../set/set-local-storage'
import { getLocalStorage } from './get-local-storage'

// Without window, store2 falls back to an in-memory store shared by the whole process
describe('localStorage helpers in SSR', () => {
  afterEach(() => {
    store.local.clearAll()
  })

  it('setLocalStorage should not store anything', () => {
    setLocalStorage('user', { id: 'A' })
    expect(store.local.get('user')).toBeNull()
  })

  it('getLocalStorage should not read the shared in-memory store', () => {
    store.local.set('user', { id: 'A' })
    expect(getLocalStorage('user')).toBeNull()
  })

  it('removeLocalStorage should not touch the shared in-memory store', () => {
    store.local.set('user', { id: 'A' })
    removeLocalStorage('user')
    expect(store.local.get('user')).toEqual({ id: 'A' })
  })
})
