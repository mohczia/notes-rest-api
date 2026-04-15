# TODO: Fix DB NOT NULL Error pada PUT /notes/:id

## Plan Steps:
- [x] 1. src/services/notes/validator/schema.js: title required di noteUpdatePayloadSchema
- [x] 2. src/services/notes/repositories/note-repositories.js: null check di editNote
- [x] 3. src/middlewares/error.js: handle PostgreSQL 23502 error
- [ ] 4. Test bad payload → 400, normal → 200
- [ ] COMPLETE

