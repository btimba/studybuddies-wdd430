CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL UNIQUE,
  password   TEXT        NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS study_groups (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  description TEXT,
  subject     TEXT        NOT NULL,
  owner_id    INT         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS group_members (
  id        SERIAL PRIMARY KEY,
  group_id  INT         NOT NULL REFERENCES study_groups(id) ON DELETE CASCADE,
  user_id   INT         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (group_id, user_id)
);

CREATE TABLE IF NOT EXISTS study_sessions (
  id           SERIAL PRIMARY KEY,
  group_id     INT         NOT NULL REFERENCES study_groups(id) ON DELETE CASCADE,
  title        TEXT        NOT NULL,
  description  TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  location     TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resources (
  id          SERIAL PRIMARY KEY,
  group_id    INT         NOT NULL REFERENCES study_groups(id) ON DELETE CASCADE,
  uploaded_by INT         REFERENCES users(id) ON DELETE SET NULL,
  title       TEXT        NOT NULL,
  url         TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);