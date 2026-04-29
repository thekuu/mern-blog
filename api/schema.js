import { pgTable, serial, text, timestamp, integer, index } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  img: text("img"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    desc: text("desc").notNull(),
    img: text("img").notNull(),
    cat: text("cat"),
    uid: integer("uid")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    catIdx: index("posts_cat_idx").on(table.cat),
    createdAtIdx: index("posts_created_at_idx").on(table.createdAt),
  })
);
