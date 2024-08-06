import { io } from "socket.io-client";

export const socketInstance = io("http://localhost:8000");

export const joinRoom = (roomId: number) => {
  socketInstance.emit("join_room", roomId);
};

export const card_moved = (
  boardId: number,
  card_details: { id: number; position: number; listId: number },
  newListId: number
) => {
  socketInstance.emit("card_moved", { boardId, card_details, newListId });
};
