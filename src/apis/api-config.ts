export const apiConfig = {
  uploadImage: {
    method: "POST",
    endpoint: "/api.upload/image",
  },
  login: {
    method: "POST",
    endpoint: "/api.auth/login-student",
  },
  getMe: {
    method: "GET",
    endpoint: "/api.auth/profile",
  },
  notification: {
    getAll: {
      method: "GET",
      endpoint: "/api.notification/public/me",
    },
  },
  exam: {
    getAll: {
      method: "GET",
      endpoint: "/api.exam/public/me",
    },
  },
  attendance: {
    getAll: {
      method: "GET",
      endpoint: "/api.attendance/public/me",
    },
  },
  class: {
    getAll: {
      method: "GET",
      endpoint: "/api.user/public/class/me",
    },
  },
  letter: {
    getAll: {
      method: "GET",
      endpoint: "/api.letter/public/me",
    },
    create: {
      method: "POST",
      endpoint: "/api.letter",
    },
    delete: {
      method: "DELETE",
      endpoint: "/api.letter/:id",
    },
  },
  language: {
    getAll: {
      method: "GET",
      endpoint: "/api.language",
    },
  },
  googleAI: {
    generateCode: {
      method: "POST",
      endpoint: "/api.googleai",
    },
  },
};
