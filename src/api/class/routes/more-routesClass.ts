export default {
  routes: [
    {
      method: "PUT",
      path: "/add-teacher-class",
      handler: "class.addTeacherClass",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
