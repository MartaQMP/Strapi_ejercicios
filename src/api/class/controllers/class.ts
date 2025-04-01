/**
 * class controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::class.class", () => ({
  async addTeacherClass(ctx) {
    try {
      const { Name, id } = ctx.request.body;

      const classRecord = await strapi.db.query("api::class.class").findOne({
        where: { id: id },
      });
      if (!classRecord) {
        return ctx.notFound(`Id  ${id} of class not found`);
      }

      const teacher = await strapi.db.query("api::teacher.teacher").findOne({
        where: { Name: Name },
      });
      if (!teacher) {
        return ctx.notFound(`Teacher ${Name} does not exist`);
      }
      const teachers = await strapi.db.query("api::teacher.teacher").findMany({
        where: {
          classes: {
            id: classRecord.id,
          },
        },
        populate: {
          classes: true,
        },
      });
      const updatedTeachers = [...teachers, { id: teacher.id }];

      await strapi.db.query("api::class.class").update({
        where: { id: classRecord.id },
        data: { teachers: updatedTeachers.map((t) => t.id) },
      });

      return {
        ok: true,
        mensaje: `Teacher ${Name} joined correctly`,
        clase: classRecord.Name,
        profesor: teacher.Name,
      };
    } catch (error) {
      return ctx.badRequest("Error joining teacher", { error: error.message });
    }
  },
}));
