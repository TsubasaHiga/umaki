// @vitest-environment node
import store from 'store2'
import { removeSessionStorage } from '../remove/remove-session-storage'
import { setSessionStorage } from '../set/set-session-storage'
import { getSessionStorage } from './get-session-storage'

// Without window, store2 falls back to an in-memory store shared by the whole process
describe('sessionStorage helpers in SSR', () => {
  afterEach(() => {
    store.session.clearAll()
  })

  it('setSessionStorage should not store anything', () => {
    setSessionStorage('user', 'A')
    expect(store.session.get('user')).toBeNull()
  })

  it('getSessionStorage should not read the shared in-memory store', () => {
    store.session.set('user', { id: 'A' })
    expect(getSessionStorage('user')).toBeNull()
  })

  it('removeSessionStorage should not touch the shared in-memory store', () => {
    store.session.set('user', { id: 'A' })
    removeSessionStorage('user')
    expect(store.session.get('user')).toEqual({ id: 'A' })
  })
})
