/*
# Create contact_messages table

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, required, max 120 chars)
  - `email` (text, required, max 200 chars)
  - `phone` (text, optional, max 30 chars)
  - `message` (text, required, max 2000 chars)
  - `created_at` (timestamptz, defaults to now)

2. Security
- Row Level Security is enabled on `contact_messages`.
- Visitors (anon role) may only INSERT new messages. They cannot read, edit or delete messages.
- Only the temple office (via the dashboard / service role) can read the stored messages.

3. Notes
- The table is single-tenant: no user ownership columns, because the public contact form is open to all visitors.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 30),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_messages TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
