import { formatDate } from "../date";

describe('formatDate', () => {
  it('check format', () => {
    expect(formatDate(1607940552000, 'yyyy')).toBe('2020')
  })
})