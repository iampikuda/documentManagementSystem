const expect = require('chai').expect;
const models = require('../../models');

describe('Create models', () => {
  it('should have user model created', () => {
    expect(models.User).to.exist;
  });
  it('should have role model created', () => {
    expect(models.Role).to.exist;
  });
  it('should have document model created', () => {
    expect(models.Document).to.exist;
  });
});
