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
    GET_BOARD_BY_ID: "/boards/:boardId",
    GET_USERS_IN_BOARD: "/boards/:boardId/users",
    GET_BOARDS_BY_WORKSPACE_ID: "/workspaces/:workspaceId/boards",
    CREATE_BOARD: "/workspaces/:workspaceId/boards",
    UPDATE_BOARD: "/boards/:boardId",
    DELETE_BOARD: "/boards/:boardId",
    GET_LABELS_IN_BOARD: "/boards/:boardId/labels",
  },
  CARD: {
    CREATE_CARD: "/lists/:listId/cards",
    GET_CARDS_IN_LIST: "/lists/:listId/cards",
    UPDATE_CARD: "/cards/:cardId",
    GET_CARDS_OF_USER: "/cards/",
    ADD_USER_TO_CARD: "/cards/:cardId/users",
    REMOVE_USER_FROM_CARD: "/cards/:cardId/users/:userId",
  },
  WORKSPACE: {
    CREATE_WORKSPACE: "/workspaces",
    GET_WORKSPACES: "/workspaces",
    GET_WORKSPACE_BY_ID: "/workspaces/:workspaceId",
    ADD_USER_TO_WORKSPACE: "/workspaces/:workspaceId/users",
    GET_USERS_IN_WORKSPACE: "/workspaces/:workspaceId/users",
    SEARCH_USERS_IN_WORKSPACE: "/workspaces/:workspaceId/users/search?q=:email",
  },
  USER: {
    SEARCH_USER: "/users?q=:q",
  },
};
