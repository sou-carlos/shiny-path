import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { useProgress } from "@/lib/progress-context";

interface IslandProps {
  id: string;
  type: "content" | "question" | "code-error";
  name: string;
  status: "completed" | "uncompleted" | "locked";
  contentText: string;
  questionData?: {
    question: string;
    answers: string[];
    correctAnswer: number;
  };
  codeErrorData?: {
    question: string;
    codeSnippet: string;
    errorLines: number[];
    explanation: string;
  };
}

export function Island(props: IslandProps) {
  const navigate = useNavigate();
  const { getIslandStatus } = useProgress();
  
  const currentStatus = getIslandStatus(props.id);

  const handleIslandClick = () => {
    if (currentStatus !== "locked") {
      navigate(`/island/${props.id}`);
    }
  };

  return (
    <div
      className={`island-container
        ${currentStatus === "locked" ? " locked" : ""}
        ${currentStatus === "completed" ? " compled" : ""}`}
      onClick={handleIslandClick}
    >
      <p>{props.name}</p>
      <div></div>
    </div>
  );
}
