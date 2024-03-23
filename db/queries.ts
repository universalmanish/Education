import { eq } from "drizzle-orm";
import db from "./drizzle";
import { branches, levels, subjects } from "./schema";

export const getSubjects = async () => {
  const data = await db.query.subjects.findMany();
  return data;
};

export const getDynamicSubjects = async (
  count: number,
  routeItem: string[]
) => {
  switch (count) {
    case 1:
      const dataOne = await db.query.subjects.findMany();
      return dataOne;

    case 2:
      const dataTwo = await db.query.subjects.findFirst({
        where: eq(subjects.route, routeItem[routeItem.length - 2]),
      });

      if (dataTwo ) {
        const newData = dataTwo.id;

        const branch = await db.query.branches.findMany({
          where: eq(branches.subjectId, newData),
        });

        return branch;
      }

    case 3:
      const dataThree = await db.query.branches.findFirst({
        where: eq(subjects.route, routeItem[routeItem.length - 2]),
      });

      if (dataThree) {
        const newData = dataThree.id;

        const level = await db.query.levels.findMany({
          where: eq(levels.branchId, newData),
        });

        return level;
      }

    default:
      const dataDefault = await db.query.subjects.findMany();
      return dataDefault;
  }
};

export const getDynamicBranches = async (
  count: number,
  routeItem: string[]
) => {
  switch (count) {
    case 1:
      const data = await db.query.subjects.findFirst({
        where: eq(subjects.route, routeItem[routeItem.length - 1]),
      });

      if (data) {
        const newData = data.id;

        const branch = await db.query.branches.findMany({
          where: eq(branches.subjectId, newData),
        });

        return branch;
      }

    default:
      const dataDefault = await db.query.branches.findMany();
      return dataDefault;
  }
};

export const getDynamicLevels = async (count: number, routeItem: string[]) => {
  switch (count) {
    case 2:
      const data = await db.query.branches.findFirst({
        where: eq(subjects.route, routeItem[routeItem.length - 1]),
      });

      if (data) {
        const newData = data.id;

        const level = await db.query.levels.findMany({
          where: eq(levels.branchId, newData),
        });

        return level;
      }

    default:
      const dataDefault = await db.query.levels.findMany();
      return dataDefault;
  }
};
