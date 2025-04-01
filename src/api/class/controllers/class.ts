/**
 * class controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::class.class", () => ({
  async addTeacherClass(ctx) {
    try {
      const { idTeacher, idClass } = ctx.request.body;

      const classUpdate = await strapi
        .documents("api::class.class")
        .findOne({ documentId: idClass });
      if (!classUpdate) {
        return ctx.notFound(`Id  ${idClass} of class not found`);
      }
      console.log("classUpdate->", classUpdate);

      const teacher = await strapi
        .documents("api::teacher.teacher")
        .findOne({ documentId: idTeacher });
      if (!teacher) {
        return ctx.notFound(`Teacher ${idTeacher} does not exist`);
      }
      console.log("teacher->", teacher);

      const teachers = await strapi.documents("api::teacher.teacher").findMany({
        where: {
          classes: {
            id: classUpdate.id,
          },
        },
        populate: {
          classes: true,
        },
      });
      console.log("teachers->", teachers);
      const updatedTeachers = [...teachers, { id: teacher.id }];

      // Paso 3: Actualizar la clase con la lista de profesores actualizada
      await strapi.db.query("api::class.class").update({
        where: { id: classUpdate.id },
        data: { teachers: updatedTeachers.map((t) => t.id) }, // Aquí asignamos solo los ids de los profesores
      });

      return {
        ok: true,
        mensaje: `Teacher ${idTeacher} joined correctly`,
      };
    } catch (error) {
      return ctx.badRequest("Error joining teacher", { error: error.message });
    }
  },
}));
