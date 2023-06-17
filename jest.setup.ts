const mockConfig = {
  spotify: {
    maxSeeds: 5,
  }
}

jest.setMock('./src/api/config', mockConfig);