import { MEMORY_GAME_IMAGES } from "@/projects/memory-match-game/lib/constants";
import MemoryMatchGame from "@/projects/memory-match-game/components/memory-match-game";

function MemoryMatchGamePage() {
  return <MemoryMatchGame images={MEMORY_GAME_IMAGES} />;
}

export default MemoryMatchGamePage;
