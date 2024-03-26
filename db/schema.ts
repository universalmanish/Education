import { relations } from "drizzle-orm";
import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";

export const subject = pgTable("subject", {
    id: serial("id").primaryKey().notNull(),
    title: text("title").notNull(),
    route: text("route").notNull(),
    imageUrl: text("image_url")
})

export const subjectRelation = relations(subject, ({many}) => ({
   branch: many(branch)
}))

export const branch = pgTable("branch", {
    id: serial("id").primaryKey(),
    title: text("title"),
    route: text("route"),
    imageUrl: text("image_url"),
    subjectId: integer("subject_id").references(() => subject.id, {onDelete: "cascade"})
})

export const branchRelation = relations(branch, ({one, many}) => ({
    subject: one(subject, {
        fields: [branch.subjectId],
        references: [subject.id]
    }),
    level: many(levels)
}))

export const levels = pgTable("levels", {
    id: serial("id").primaryKey(),
    title: text("title"),
    route: text("route"),
    branchId: integer("branch_id").references(() => branch.id, {onDelete: "cascade"})
})

export const LevelRelation = relations(levels, ({one, many}) => ({
    branch: one(branch, {
        fields: [levels.branchId],
        references: [branch.id]
    }),
    heading: many(heading),
    subHeading: many(subHeading),
}))


export const heading = pgTable("heading", {
    id: serial("id").primaryKey(),
    title: text("heading"),
    levelId: integer("level_id").references(() => levels.id, {onDelete: "cascade"})
})

export const headingRelation = relations(heading, ({one}) => ({
    level: one(levels, {
        fields: [heading.levelId],
        references: [levels.id]
    })
}))


export const subHeading = pgTable("subHeading", {
    id: serial("id").primaryKey(),
    title: text("subHeading"),
    levelId: integer("level_id").references(() => levels.id, {onDelete: "cascade"})
})

export const subHeadingRelation = relations(subHeading, ({one}) => ({
    level: one(levels, {
        fields: [subHeading.levelId],
        references: [levels.id]
    })
}))