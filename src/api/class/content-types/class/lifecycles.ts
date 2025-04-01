module.exports = {
  afterUpdate: async (event) => {
    const { params } = event;

    if (params.data.teachers) {
      const idTeacherAddCount = params.data.teachers.connect.map(
        (item) => item.id
      );
      const idTeacherDisCount = params.data.teachers.disconnect.map(
        (item) => item.id
      );

      if (idTeacherAddCount.length > 0) {
        const currentTeacher = await strapi.db
          .query("api::teacher.teacher")
          .findOne({
            where: {
              id: idTeacherAddCount,
            },
            populate: { classes: true },
          });

        if (!currentTeacher) {
          throw new Error("Class with id ${params.where.id} not found");
        }

        const currentTeacherCount = currentTeacher.classes.length;

        await strapi.db.query("api::teacher.teacher").update({
          where: { id: idTeacherAddCount },
          data: {
            NumeroClases: currentTeacherCount,
          },
        });
      } else if (idTeacherDisCount.length > 0) {
        const currentTeacher = await strapi.db
          .query("api::teacher.teacher")
          .findOne({
            where: {
              id: idTeacherDisCount,
            },
            populate: { classes: true },
          });

        if (!currentTeacher) {
          throw new Error("Class with id ${params.where.id} not found");
        }

        const currentTeacherCount = currentTeacher.classes.length;

        await strapi.db.query("api::teacher.teacher").update({
          where: { id: idTeacherDisCount },
          data: {
            NumeroClases: currentTeacherCount,
          },
        });
      }
    }
  },
};
