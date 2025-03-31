/**
 * class controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::class.class", () => ({
  async addTeacherClass(ctx) {
    console.log("holi");
    try {
      const { idClass, idTeacher } = ctx.request.body;

      console.log(ctx);
      const teacher = await strapi
        .documents("api::teacher.teacher")
        .findOne({ documentId: idTeacher });

      console.log(teacher);

      if (!teacher) {
        ctx.throw("Teacher not found");
      }

      const classUpdate = await strapi
        .documents("api::class.class")
        .findOne({ documentId: idClass });

      if (!classUpdate) {
        ctx.throw("Class not found");
      }

      /*const addTeacher = await strapi.documents("api::class.class").update({
        documentId: idClass,
        data: { teachers: teacher.id },
      });*/

      return ctx.send("ok");
    } catch (error) {
      return ctx.badRequest("Error");
    }
  },
}));
