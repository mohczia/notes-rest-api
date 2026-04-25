# TODO: Fix Supabase Deployment Issues

## Problem
App works locally but several Postman requests fail after switching database to Supabase (public) using connection string URL.

## Root Causes Found
1. **PostgreSQL Strict Mode Error in `getNotes`**: Query uses `GROUP BY notes.id` but selects `notes.*`. PostgreSQL 15 (Supabase) requires all non-aggregated columns in GROUP BY. This causes SQL errors on Supabase but may have been silently accepted on older local PostgreSQL.
2. **No Pool Error Handling**: `pg.Pool` has no `error` event listener. Connection drops/timeouts from Supabase cause unhandled errors/crashes.
3. **Controllers Lack try-catch**: Async database calls in controllers are not wrapped in `try-catch`. Database/network errors become unhandled rejections.
4. **Missing Pool Timeouts**: Default pool keeps connections indefinitely; Supabase direct connections have idle limits.

## Steps

- [x] 1. Read all relevant files
- [x] 2. Fix `src/database/pool.js` — add pool config (max, timeouts) + error listener
- [x] 3. Fix `src/services/notes/repositories/note-repositories.js` — replace `GROUP BY` with `DISTINCT` in `getNotes`
- [x] 4. Add try-catch to `src/services/notes/controller/node-controller.js`
- [x] 5. Add try-catch to `src/services/users/controller/user-controller.js`
- [x] 6. Add try-catch to `src/services/authentications/controller/authentication-controller.js`
- [x] 7. Add try-catch to `src/services/collaborations/controller/collaboration-controller.js`
- [x] 8. Improve `src/middlewares/error.js` — log database error codes/network errors
- [x] 9. Test by running the app and checking console output

