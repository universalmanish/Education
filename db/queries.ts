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
      const subject = await db.query.subject.findMany();
      return subject;

    case 2:
      const dataTwo = await db.query.branch.findFirst({
        where: eq(branch.route, routeItem[routeItem.length - 1]),
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
         const branchid = dataThree.id
         
         const level = await db.query.levels.findMany({
            where: eq(levels.branchId, branchid)
         })

         return level
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
        where: eq(branch.route, routeItem[routeItem.length - 2])
    })

    if (levelBranch) {
        const dataLevels = await db.query.levels.findFirst({
            where: eq(levels.route, routeItem[routeItem.length - 1]),
        })

        if (dataLevels) {
           const temp = dataLevels.id
           const headings = await db.query.heading.findMany({
            where: eq(heading.levelId, temp)
           })
           const subHeadings = await db.query.subHeading.findMany({
            where: eq(subHeading.levelId, temp)
           })

           return {headings, subHeadings}
        }

    
    }
   
}
// export const getDynamicSubjects = async (
//   count: number,
//   routeItem: string[]
// ) => {
//   switch (count) {
//     case 1:
//       const dataOne = await db.query.subject.findMany();
//       return dataOne;

//     case 2:
//       const dataTwo = await db.query.subject.findFirst({
//         where: eq(subject.route, routeItem[routeItem.length - 2]),
//       });

//       if (dataTwo ) {
//         const newData = dataTwo.id;

//         const branchs = await db.query.branch.findMany({
//           where: eq(branch.subjectId, newData),
//         });

//         return branchs;
//       }

//     case 3:
//       const dataThree = await db.query.branch.findFirst({
//         where: eq(subject.route, routeItem[routeItem.length - 2]),
//       });

//       if (dataThree) {
//         const newData = dataThree.id;

//         const level = await db.query.levels.findMany({
//           where: eq(level.branchId, newData),
//         });

//         return level;
//       }

//     default:
//       const dataDefault = await db.query.subject.findMany();
//       return dataDefault;
//   }
// };

// export const getDynamicBranches = async (
//   count: number,
//   routeItem: string[]
// ) => {
//   switch (count) {
//     case 1:
//       const data = await db.query.subjects.findFirst({
//         where: eq(subjects.route, routeItem[routeItem.length - 1]),
//       });

//       if (data) {
//         const newData = data.id;

//         const branch = await db.query.branches.findMany({
//           where: eq(branches.subjectId, newData),
//         });

//         return branch;
//       }

//     default:
//       const dataDefault = await db.query.branches.findMany();
//       return dataDefault;
//   }
// };

// export const getDynamicLevels = async (count: number, routeItem: string[]) => {
//   switch (count) {
//     case 2:
//       const data = await db.query.branches.findFirst({
//         where: eq(subjects.route, routeItem[routeItem.length - 1]),
//       });

//       if (data) {
//         const newData = data.id;

//         const level = await db.query.levels.findMany({
//           where: eq(levels.branchId, newData),
//         });

//         return level;
//       }

//     default:
//       const dataDefault = await db.query.levels.findMany();
//       return dataDefault;
//   }
// };

// export const getLevelContent = async (routeItem:string[]) => {
//   const data = await db.query.levelContent.findFirst({
//     where: and(
//       eq(levelContent.level, routeItem[routeItem.length - 1]),
//       eq(levelContent.branch, routeItem[routeItem.length - 2])
//     )
//   })
//    return [data]
