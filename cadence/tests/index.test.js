import { adminTest } from './src/setup.js'
import { useCase } from './src/useCase.js'

describe('flowns test case', () => {
  adminTest()
  useCase()
})
