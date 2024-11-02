import { pd } from './pd'

describe('pd', () => {
  it('should call preventDefault on the event', () => {
    const mockEvent = {
      preventDefault: vi.fn()
    } as unknown as Event

    pd(mockEvent)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })
})
