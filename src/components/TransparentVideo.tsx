import { useEffect, useRef, useState } from 'react';

interface TransparentVideoProps {
  mp4Src: string;
  webmSrc: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export function TransparentVideo({
  mp4Src,
  webmSrc,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true
}: TransparentVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Synchronously detect Safari on the client during state initialization
  const [isSafari] = useState(() => {
    if (typeof window === 'undefined') return false;
    const ua = navigator.userAgent;
    return /Version\/[\d.]+.*Safari/.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS/.test(ua);
  });

  useEffect(() => {
    if (!isSafari) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isComponentActive = true;

    // Set canvas dimensions based on video dimensions
    const handleLoadedMetadata = () => {
      if (!canvas || !video) return;
      // Restrict max resolution to 480px to optimize pixel loops on mobile CPUs
      const size = Math.min(video.videoWidth || 480, 480);
      canvas.width = size;
      canvas.height = size;
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    const render = () => {
      if (!isComponentActive || !video || !canvas || !ctx) return;

      if (!video.paused && !video.ended) {
        const width = canvas.width;
        const height = canvas.height;

        if (width > 0 && height > 0) {
          ctx.drawImage(video, 0, 0, width, height);
          const imgData = ctx.getImageData(0, 0, width, height);
          const data = imgData.data;

          // Key out the solid black background (#000000)
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // If the pixel is close to black, make it fully transparent (alpha = 0)
            if (r < 18 && g < 18 && b < 18) {
              data[i + 3] = 0;
            }
          }

          ctx.putImageData(imgData, 0, 0);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handlePlay = () => {
      render();
    };

    video.addEventListener('play', handlePlay);

    // If video is already playing
    if (!video.paused) {
      render();
    }

    // Trigger video playback
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('TransparentVideo autoplay was prevented:', err);
      });
    }

    return () => {
      isComponentActive = false;
      cancelAnimationFrame(animationFrameId);
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('play', handlePlay);
        video.pause();
      }
    };
  }, [isSafari]);

  if (!isSafari) {
    // Native, high-performance hardware accelerated video playback for non-Safari browsers
    return (
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload="auto"
        className={className}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  // Live Canvas keyer for Safari/Apple devices
  return (
    <>
      <video
        ref={videoRef}
        src={mp4Src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload="auto"
        style={{ display: 'none' }}
        crossOrigin="anonymous"
      />
      <canvas ref={canvasRef} className={className} />
    </>
  );
}
