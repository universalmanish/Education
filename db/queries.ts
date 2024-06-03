import { and, eq } from "drizzle-orm";
import db from "./drizzle";
import { branch, heading, levels, subHeading, subject } from "./schema";

export const getSubjects = async () => {
  const data = await db.query.subject.findMany();
  return data;
};

export const sidebarDynamicData = async (
  count: number,
  routeItem: string[]
) => {
  switch (count) {
    case 1:
      const subjects = await db.query.subject.findMany();
      return subjects;

    case 2:
      const dataTwo = await db.query.subject.findFirst({
        where: eq(subject.route, routeItem[routeItem.length - 2]),
      });

      if (dataTwo) {
        const newData = dataTwo.id;

        const branchs = await db.query.branch.findMany({
          where: eq(branch.subjectId, newData),
        });

        return branchs;
      }

    case 3:
      const dataThree = await db.query.branch.findFirst({
        where: eq(branch.route, routeItem[routeItem.length - 2]),
      });

      if (dataThree) {
        const branchid = dataThree.id;

        const level = await db.query.levels.findMany({
          where: eq(levels.branchId, branchid),
        });

        return level;
      }

    default:
      const subjectDefault = await db.query.subject.findMany();
      return subjectDefault;
  }
};

export const pageDynamicData = async (count: number, routeItem: string[]) => {
  switch (count) {
    case 1:
      const dataOne = await db.query.subject.findFirst({
        where: eq(subject.route, routeItem[routeItem.length - 1]),
      });

      if (dataOne) {
        const subjectId = dataOne.id;

        const branchData = await db.query.branch.findMany({
          where: eq(branch.subjectId, subjectId),
        });

        return branchData;
      }

    case 2:
      const dataTwo = await db.query.branch.findFirst({
        where: eq(branch.route, routeItem[routeItem.length - 1]),
      });

      if (dataTwo) {
        const branchId = dataTwo.id;
        const levelData = await db.query.levels.findMany({
          where: eq(levels.branchId, branchId),
        });

        return levelData;
      }
  }
};

export const levelData = async (routeItem: string[]) => {
  const levelBranch = await db.query.branch.findFirst({
    where: eq(branch.route, routeItem[routeItem.length - 2]),
  });

  if (levelBranch) {
    const temp = levelBranch.id;
    const dataLevels = await db.query.levels.findFirst({
      where: and(
        eq(levels.branchId, temp),
        eq(levels.route, routeItem[routeItem.length - 1])
      ),
    });

    if (dataLevels) {
      const temp = dataLevels.id;
      const headings = await db.query.heading.findMany({
        where: eq(heading.levelId, temp),
        with: { subHeading: true },
      });

      return headings;
    }
  }
};
