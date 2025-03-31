export default {
  routes: [
    {
      method: "POST",
      path: "/create-teachers",
      handler: "teacher.createTeacher",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/events-teacher/:id",
      handler: "teacher.events",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
