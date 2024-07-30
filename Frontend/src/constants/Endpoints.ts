export const Endpoints = {
  LIST: {
    CREATE_LIST: "/boards/:boardId/lists",
    GET_LIST: "/boards/:boardId/lists",
    UPDATE_LIST: "/boards/:boardId/lists/:listId",
    DELETE_LIST: "/boards/:boardId/lists/:listId",
  },
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    REFRESH: "/auth/refresh",
    GET_ME: "/auth/me",
  },
  BOARD: {
    GET_BOARDS_OF_USER: "/boards",
    GET_USERS_IN_BOARD: "/boards/:boardId/users",
    CREATE_BOARD: "/workspaces/:workspaceId/boards",
    UPDATE_BOARD: "/boards/:boardId",
    GET_LABELS_IN_BOARD: "/boards/:boardId/labels",
  },
  CARD: {
    CREATE_CARD: "/lists/:listId/cards",
    GET_CARDS_IN_LIST: "/lists/:listId/cards",
  },
  WORKSPACE: {
    CREATE_WORKSPACE: "/workspaces",
    GET_WORKSPACE: "/workspaces",
  },
};
