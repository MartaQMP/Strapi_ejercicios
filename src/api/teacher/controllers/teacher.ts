/**
 * teacher controller
 */

import { factories } from "@strapi/strapi";
import { execArgv } from "process";

export default factories.createCoreController("api::teacher.teacher", () => ({
  async createTeacher(ctx) {
    const { Name, Lastname, Email, Teacher_details } = ctx.request.body;

    const newTeacher = await strapi.documents("api::teacher.teacher").create({
      data: {
        Name,
        Lastname,
        Email,
        Teacher_details,
      },
      populate: {
        Teacher_details: true,
      },
    });

    return ctx.send(newTeacher);
  },

  async events(ctx) {
    const { id } = ctx.params;

    const eventsTeacher = await strapi
      .documents("api::teacher.teacher")
      .findOne({ documentId: id, populate: ["events"] });

    return ctx.send(eventsTeacher);
  },
}));
