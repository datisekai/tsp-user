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
  updateProfile: {
    method: "PUT",
    endpoint: "/api.user/me",
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
    join: {
      method: "GET",
      endpoint: "/api.exam/public/:id",
    },
    submitMultiChoice: {
      method: "POST",
      endpoint: "/api.submission/submit-multiple-choice",
    },
    submitCode: {
      method: "POST",
      endpoint: "/api.submission/submit-code",
    },
    submitExam: {
      method: "POST",
      endpoint: "/api.exam/submit/:id",
    },
    submitCodeHtml: {
      method: "POST",
      endpoint: "/api.submission/submit-code-html",
    },
    runTestCode: {
      method: "POST",
      endpoint: "/api.submission/run-test-code",
    },
    getHistory: {
      method: "GET",
      endpoint: "/api.submission/history/:id",
    },
    getTakeOrder: {
      method: "GET",
      endpoint: "/api.exam/take-order/:id",
    },
    saveAction: {
      method: "POST",
      endpoint: "/api.exam/action/:id",
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
    getMe: {
      method: "GET",
      endpoint: "/api.class/me",
    },
    join: {
      method: "POST",
      endpoint: "/api.class/join-class/:secretKey",
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
  major: {
    getMe: {
      method: "GET",
      endpoint: "/api.major/me",
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
