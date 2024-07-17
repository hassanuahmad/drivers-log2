"use client";

import { useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Play } from "lucide-react";

type CustomYouTubeEmbedProps = {
    id: string;
    title: string;
    thumbnailSrc: string;
};

export default function CustomYouTubeEmbed({
    id,
    title,
    thumbnailSrc,
}: CustomYouTubeEmbedProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        setIsPlaying(true);
    };

    return (
        <div
            className="relative aspect-video w-full overflow-hidden rounded-xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <img
                src={thumbnailSrc}
                alt={title}
                className={`h-full w-full object-cover transition-opacity duration-300 ${
                    isPlaying ? "opacity-0" : "opacity-100"
                }`}
            />
            {!isPlaying && (
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-300 ${
                        isHovered ? "bg-opacity-20" : "bg-opacity-10"
                    }`}
                >
                    <Play className="h-16 w-16 text-white opacity-80" />
                </div>
            )}
            <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                    isPlaying ? "opacity-100" : "opacity-0"
                }`}
            >
                <LiteYouTubeEmbed id={id} title={title} />
            </div>
        </div>
    );
}
