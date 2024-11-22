import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

export default function PauseButton(props: {
  isPaused: boolean;
  handleClick: () => void;
}) {
  return props.isPaused ? (
    <Button className="bg-green-400 p-16" onClick={() => props.handleClick()}>
      <Play />
    </Button>
  ) : (
    <Button className="bg-yellow-400 p-16" onClick={() => props.handleClick()}>
      <Pause />
    </Button>
  );
}
