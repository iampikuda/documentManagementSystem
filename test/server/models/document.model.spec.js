/* eslint-disable no-unused-expressions */

import chai from 'chai';
import model from '../../../server/models';
import params from '../test-helper';

const expect = chai.expect;
const documentParams = params.testDocument;
const userParams = params.testUser2;
const requiredFields = ['title', 'content', 'ownerId', 'access'];

describe('Document Model', () => {
  describe('How document model is created', () => {
    let document;
    let owner;
    describe('Create Role', () => {
      before((done) => {
        // model.sequelize.sync({ force: true })
        model.Role.create({ title: 'badolee' })
        .then((createdRole) => {
          userParams.roleId = createdRole.id;  // user's roleId
          return model.User.create(userParams);
        })
        .then((createdUser) => {
          owner = createdUser;
          documentParams.ownerId = owner.id;
          done();
        });
      });

      beforeEach(() => {
        document = model.Document.build(documentParams);
      });

      // afterEach(() => model.Document.destroy({ where: {} }));

      after(() => model.sequelize.sync({ force: true }));


      it('should create a document', (done) => {
        document.save()
        .then((createdDocument) => {
          expect(createdDocument).to.exist;
          expect(typeof createdDocument).to.equal('object');
          done();
        });
      });

      it('should create document with title and content', (done) => {
        document.save()
          .then((createdDocument) => {
            expect(createdDocument.title).to.equal(documentParams.title);
            expect(createdDocument.content).to.equal(documentParams.content);
            done();
          });
      });

      it('should create a document with owner', (done) => {
        document.save()
          .then((createdDocument) => {
            expect(createdDocument.ownerId).to.equal(owner.id);
            done();
          });
      });

      it('should create a document with publish date', (done) => {
        document.save()
        .then((createdDocument) => {
          expect(createdDocument.createdAt).to.exist;
          done();
        });
      });

      it('should create a document with role that can access it', (done) => {
        document.save()
          .then((createdDocument) => {
            expect(createdDocument.access).to.equal('public');
            done();
          });
      });

      describe('Document Model Validations', () => {
        describe('Fields Validation', () => {
          requiredFields.forEach((field) => {
            it(`requires a ${field} field to create a document`, () => {
              document[field] = null;
              return document.save()
              .catch((error) => {
                expect(/notNull Violation/.test(error.message)).to.be.true;
              });
            });
          });
        });
      });

    });
  });
});
