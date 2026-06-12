export function getEmbeddableVideoUrl(videoUrl: string | null | undefined) {
  if (!videoUrl) return null;

  try {
    const url = new URL(videoUrl);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      if (url.pathname.startsWith("/embed/")) return videoUrl;
      if (url.pathname.startsWith("/shorts/")) {
        const videoId = url.pathname.split("/").filter(Boolean)[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;
      }
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;
    }

    return videoUrl;
  } catch {
    return videoUrl;
  }
}
