import { ListCommentsInterface } from "@/types/comment/comment.type";

export interface CommentModalProps {
  isOpen: boolean;
  modalMode: "deleteComment" | "updateComment" | null;
  commentValues: Omit<ListCommentsInterface, "userEmail" | "task"> | null;
  onClose: () => void;
  closeModalAfterSubmission: () => void;
  refetch: () => void;
}
