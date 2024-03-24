import { relations } from "drizzle-orm";
import { serial, text, pgTable, integer, } from "drizzle-orm/pg-core";

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  route: text("route").notNull(),
  imageUrl: text("image_url").notNull()
});

export const subjectsRelation = relations(subjects, ({ one }) => ({
  subjectBranch: one(branches),
}));

export const branches = pgTable("branches", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    route: text("route").notNull(),
    imageUrl: text("image_url").notNull(),
    subjectId: integer("subjectsId").references(() => subjects.id, {onDelete: "cascade"}).notNull()
})


export const branchRelation = relations(branches, ({one}) => ({
    subject: one(subjects, {
      fields: [branches.subjectId],
      references: [subjects.id]
    })
}))

export const levels = pgTable("levels", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    route: text("route").notNull(),
    branchId: integer("branchId").references(() => branches.id, {onDelete: "cascade"}).notNull()
})

export const levelRelation = relations(levels, ({one}) => ({
  branch: one(branches, {
    fields: [levels.branchId],
    references: [branches.id]
  })
}))

export const levelContent = pgTable("levelContent", {
  id: serial("id").notNull(),
  heading: text("heading").notNull(),
  subHeading: text("sub_heading").notNull(),
  branch: text("branch").notNull(),
  level: text("level").notNull()
})
