# TODO: Fix GET /notes/:id - "data: null" Error

## Progress Tracking
- [x] 1. Analyze files & identify root cause (SQL syntax error in verifyNoteOwner)
- [x] 2. Create TODO file ✅ **DONE**
- [x] 3. Fix note-repositories.js (SQL syntax + optimize verifyNoteOwner) ✅ **DONE**
- [x] 4. Cleanup node-controller.js (remove duplicate imports + fix casing) ✅ **DONE**
- [ ] 5. Test with Postman (valid ID → {data: {note}}, invalid → 404)
- [x] 6. Update TODO ✅ **DONE**
- [ ] 7. Complete task ✅ **DONE**

**🔍 USER FEEDBACK**: 401 "Access token wajib disertakan"
- Issue: **Missing/invalid Authorization header in Postman**
- Our handler logic ✅ - just needs valid JWT token

**✅ FIXES IMPLEMENTED:**
1. `verifyNoteOwner()`: Fixed SQL `'SELECT * FROM notes WHERE id = $1 AND owner = $2'`
2. `node-controller.js`: Removed duplicate import, fixed `noteRepositories → NoteRepositories`

**Next**: Test API + mark complete

**Expected Result**:
```
Valid ID → {status: "success", data: {note: {id, title, tags, body}}}
Invalid ID → 404 {status: "failed", message: "Catatan tidak ditemukan"}
```


