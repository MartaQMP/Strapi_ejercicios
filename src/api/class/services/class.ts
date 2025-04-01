/**
 * class service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::class.class",
  ({ strapi }) => ({
    async numberTeachers(ctx) {
      try {
        const { idTeacher, idClass } = ctx.request.body;

        const classUpdate = await strapi
          .documents("api::class.class")
          .findOne({ documentId: idClass });
        if (!classUpdate) {
          return ctx.notFound(`Id  ${idClass} of class not found`);
        }

        const teacher = await strapi
          .documents("api::teacher.teacher")
          .findOne({ documentId: idTeacher });
        if (!teacher) {
          return ctx.notFound(`Teacher ${idTeacher} does not exist`);
        }

        const teachers = await strapi.db
          .query("api::teacher.teacher")
          .findMany({
            where: {
              classes: {
                id: classUpdate.id,
              },
            },
            populate: {
              classes: true,
            },
          });
        const updatedTeachers = [...teachers, { id: teacher.id }];

        await strapi.db.query("api::class.class").update({
          where: { id: classUpdate.id },
          data: { teachers: updatedTeachers.map((t) => t.id) },
        });

        return {
          ok: true,
          mensaje: `Teacher ${idTeacher} joined correctly`,
        };
      } catch (error) {
        return ctx.badRequest("Error joining teacher", {
          error: error.message,
        });
      }
    },
  })
);
