DO $migration$
DECLARE
  password_exists BOOLEAN;
  password_hash_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = current_schema()
      AND table_name = 'users'
      AND column_name = 'password'
  ) INTO password_exists;

  SELECT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = current_schema()
      AND table_name = 'users'
      AND column_name = 'password_hash'
  ) INTO password_hash_exists;

  IF password_exists AND password_hash_exists THEN
    RAISE EXCEPTION 'Both password and password_hash columns exist on users';
  ELSIF password_exists THEN
    ALTER TABLE users RENAME COLUMN password TO password_hash;
  ELSIF NOT password_hash_exists THEN
    RAISE EXCEPTION 'Neither password nor password_hash exists on users';
  END IF;
END
$migration$;

COMMENT ON COLUMN users.password_hash IS
  'Store only one-way password hashes (bcrypt or Argon2), never plaintext.';
