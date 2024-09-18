export const isVideo = (urlPath: string) => {
    const videoExtensions = [".mp4", ".webm", ".ogg"];
    return videoExtensions.some((ext) => urlPath.toLowerCase().endsWith(ext));
};
