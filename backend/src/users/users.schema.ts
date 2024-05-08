import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

export const users = pgTable('users', {
  id: varchar('id')
    .$defaultFn(() => nanoid())
    .primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  logoutAt: timestamp('logout_at', { withTimezone: true }),
  loginCount: integer('login_count').notNull().default(0),
  email: varchar('email').unique().notNull(),
  name: varchar('name').notNull(),
  password: varchar('password').notNull(),
});

export type User = Omit<typeof users.$inferSelect, 'password'>;
export type CreateUserResponse = Pick<
  typeof users.$inferSelect,
  'id' | 'email' | 'name'
>;
export type UserWithPassword = typeof users.$inferSelect;
