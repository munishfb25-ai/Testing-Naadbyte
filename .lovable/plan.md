# Plan: Make "Create Your Song" submissions real

## Goal

Turn the remixed NaadByte site from a static showcase into a working commission tool by persisting "Create Your Song" submissions in Lovable Cloud and giving you an admin view to read them.

## What we will build

1. Enable Lovable Cloud on the project.
2. Add a `song_requests` table with a migration that captures the full wizard payload.
3. Replace the fake local `submitSongRequest` implementation with a real `createServerFn` that writes to the database.
4. Keep the wizard UI untouched — it already calls through the service layer.
5. Add a lightweight `/admin/commissions` page protected by authentication so you can review incoming requests.

## Why this is a good next step

The remix already has the full customer-facing journey (wizard, validation, design, SEO). The only missing piece is what happens after the user clicks "Begin my song". Persisting submissions turns that journey into a business lead capture system and gives you a foundation for later features like status tracking, quotes, and payments.

## Technical details

- Database: Lovable Cloud (PostgreSQL) with Supabase under the hood.
- Table: `public.song_requests` — columns map to the `SongRequestInput` Zod schema, plus `status` and timestamps.
- Server function: `src/lib/song-request.functions.ts` using `createServerFn` from `@tanstack/react-start`, reading the Supabase service client inside the handler.
- Admin route: `src/routes/_authenticated/admin/commissions.tsx` using the Lovable Cloud auth gate.
- Security: RLS policies so anonymous users can only insert, and authenticated owners can read their own rows; the service client bypasses RLS for admin reads.

## Out of scope (can be added later)

- Email notifications to the user or admin.
- File attachment uploads (wizard UI already has the dropzone but saves only metadata).
- Commission status workflow / payment integration.
- WordPress CMS integration.

## Files to create / modify

- `.lovable/migrations/...` — new migration for `song_requests`.
- `src/lib/song-request.functions.ts` — server function for submission.
- `src/services/song-request-service.ts` — wire to server function.
- `src/routes/_authenticated/route.tsx` — auth layout gate.
- `src/routes/_authenticated/admin/commissions.tsx` — admin list.
- `src/data/routes.ts` — add admin route.
- `src/components/layout/Navbar.tsx` — optional admin link for signed-in users.
