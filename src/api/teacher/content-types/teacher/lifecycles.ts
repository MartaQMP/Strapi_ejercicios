module.exports = {
  afterUpdate: async (event) => {
    const { params } = event;

    if (params.data.classes) {
      const currentTeacher = await strapi.db
        .query("api::teacher.teacher")
        .findOne({
          where: {
            id: params.where.id,
          },
          populate: { classes: true },
        });

      if (!currentTeacher) {
        throw new Error("Class with id ${params.where.id} not found");
      }

      const currentTeacherCount = currentTeacher.classes.length;

      await strapi.db.query("api::teacher.teacher").update({
        where: { id: params.where.id },
        data: {
          NumeroClases: currentTeacherCount,
        },
      });
    }
  },
};
