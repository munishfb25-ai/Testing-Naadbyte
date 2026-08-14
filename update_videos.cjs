const fs = require("fs");
let content = fs.readFileSync("src/routes/videos.tsx", "utf-8");

// Insert useLocation import if not exists
if (!content.includes("useLocation")) {
  content = content.replace(
    'import { createFileRoute } from "@tanstack/react-router";',
    'import { createFileRoute, useLocation, useNavigate } from "@tanstack/react-router";',
  );
}

// In the VideosPage component, add useEffect to handle hash
if (!content.includes("// Handle Hash Navigation for Play/Filter")) {
  content = content.replace(
    "  const [isPlaying, setIsPlaying] = useState(false);\n  const { controls: audioControls } = useAudioPlayer();",
    `  const [isPlaying, setIsPlaying] = useState(false);\n  const { controls: audioControls } = useAudioPlayer();\n  const location = useLocation();\n  const navigate = useNavigate();\n\n  // Handle Hash Navigation for Play/Filter\n  useEffect(() => {\n    const hash = location.hash;\n    if (!hash) return;\n    \n    if (hash.startsWith("play-")) {\n      const videoId = hash.replace("play-", "");\n      const video = videos.find((v) => v.id === videoId);\n      if (video) {\n        setActiveVideo(video);\n        setIsPlaying(true);\n        audioControls.pause();\n        // smooth scroll to top where player is\n        window.scrollTo({ top: 0, behavior: 'smooth' });\n      }\n      // Clear hash gracefully without reloading\n      navigate({ to: "/videos", replace: true });\n    }\n  }, [location.hash, videos]);`,
  );
}

fs.writeFileSync("src/routes/videos.tsx", content);
