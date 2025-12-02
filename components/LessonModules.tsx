import React, { useState, useRef, useEffect } from 'react';
import { Question, Flashcard } from '../types';
import { Button } from './Button';
import { Play, Pause, RotateCcw, Check, X, Volume2, ExternalLink, Rewind, FastForward, Maximize, Download, Lock } from 'lucide-react';

// --- Flashcard Component ---
export const FlashcardDeck: React.FC<{ cards: Flashcard[], onComplete: () => void }> = ({ cards, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (index < cards.length - 1) {
        setIndex(index + 1);
      } else {
        onComplete();
      }
    }, 200);
  };

  const currentCard = cards[index];

  if (!currentCard) return <div className="p-8 text-center text-gray-500">Kart bulunamadı.</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto p-4 w-full">
      <div className="w-full text-center mb-4 text-gray-500 font-bold uppercase tracking-wider">
        Kart {index + 1} / {cards.length}
      </div>
      
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className={`relative w-full aspect-[4/5] sm:aspect-[3/2] cursor-pointer transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ perspective: '1000px' }}
      >
        {/* Front */}
        <div className={`absolute inset-0 w-full h-full bg-white border-b-4 border-gray-200 rounded-3xl flex items-center justify-center p-8 text-2xl font-bold text-center text-gray-800 shadow-sm ${isFlipped ? 'hidden' : 'block'}`}>
          {currentCard.front}
          <span className="absolute bottom-4 text-sm text-gray-400 font-normal">Çevirmek için dokun</span>
        </div>
        
        {/* Back */}
        <div className={`absolute inset-0 w-full h-full bg-blue-50 border-b-4 border-blue-200 rounded-3xl flex items-center justify-center p-8 text-xl font-medium text-center text-blue-800 shadow-sm ${isFlipped ? 'block' : 'hidden'}`}>
          {currentCard.back}
        </div>
      </div>

      <div className="flex w-full gap-4 mt-8">
        <Button variant="danger" fullWidth onClick={handleNext}>Bilmiyorum</Button>
        <Button variant="primary" fullWidth onClick={handleNext}>Biliyorum</Button>
      </div>
    </div>
  );
};

// --- Quiz Component ---
export const QuizModule: React.FC<{ questions: Question[], onComplete: (score: number) => void }> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const currentQuestion = questions[currentIndex];

  const handleCheck = () => {
    if (selectedOption === null) return;
    
    setIsChecked(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setStatus('correct');
      setScore(s => s + 1);
    } else {
      setStatus('wrong');
    }
  };

  const handleNext = () => {
    setIsChecked(false);
    setSelectedOption(null);
    setStatus('idle');
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(score);
    }
  };

  if (!currentQuestion) return <div className="p-8 text-center">Soru yükleniyor...</div>;

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4 w-full">
      <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
        <div 
          className="bg-primary h-4 rounded-full transition-all duration-300" 
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        ></div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-8">{currentQuestion.text}</h2>

      <div className="space-y-4 flex-1 overflow-y-auto">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !isChecked && setSelectedOption(idx)}
            className={`w-full p-4 rounded-2xl border-2 border-b-4 text-left font-semibold transition-all
              ${isChecked && idx === currentQuestion.correctIndex 
                ? 'bg-green-100 border-green-500 text-green-800' 
                : isChecked && idx === selectedOption && idx !== currentQuestion.correctIndex
                  ? 'bg-red-100 border-red-500 text-red-800'
                  : selectedOption === idx 
                    ? 'bg-blue-50 border-blue-400 text-blue-700' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-center">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 mr-4 ${selectedOption === idx ? 'border-blue-400 text-blue-500' : 'border-gray-200 text-gray-400'}`}>
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </div>
          </button>
        ))}
      </div>

      <div className={`mt-auto pt-6 border-t ${status === 'correct' ? 'bg-green-50' : status === 'wrong' ? 'bg-red-50' : ''} -mx-4 px-4 pb-4 -mb-4`}>
        {isChecked ? (
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                {status === 'correct' ? (
                  <>
                    <div className="bg-green-500 rounded-full p-1"><Check className="text-white w-6 h-6" /></div>
                    <span className="text-green-700 font-bold text-lg">Harika! Doğru cevap.</span>
                  </>
                ) : (
                  <>
                    <div className="bg-brand-red rounded-full p-1"><X className="text-white w-6 h-6" /></div>
                    <div className="flex flex-col">
                      <span className="text-red-700 font-bold text-lg">Yanlış cevap.</span>
                      <span className="text-red-600 text-sm">Doğru cevap: {currentQuestion.options[currentQuestion.correctIndex]}</span>
                    </div>
                  </>
                )}
             </div>
             <Button variant={status === 'correct' ? 'primary' : 'danger'} onClick={handleNext}>Devam Et</Button>
          </div>
        ) : (
          <Button 
            variant="primary" 
            fullWidth 
            disabled={selectedOption === null} 
            onClick={handleCheck}
          >
            Kontrol Et
          </Button>
        )}
      </div>
    </div>
  );
};

// --- Custom Video Player ---
export const VideoPlayer: React.FC<{ url?: string, title?: string, onComplete: () => void }> = ({ url, title, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTime(video.currentTime);
      }
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onComplete();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleDurationChange);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('waiting', () => setIsLoading(true));
    video.addEventListener('playing', () => setIsLoading(false));

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('waiting', () => setIsLoading(true));
      video.removeEventListener('playing', () => setIsLoading(false));
    };
  }, [onComplete]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
    }
  };

  const changeSpeed = () => {
    const newRate = playbackRate >= 2 ? 1 : playbackRate + 0.25;
    setPlaybackRate(newRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = newRate;
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        // Attempt to lock landscape if supported (mobile)
        if (screen.orientation && 'lock' in screen.orientation) {
           // @ts-ignore
           screen.orientation.lock('landscape').catch(() => {});
        }
      } catch (err) {
        console.error("Fullscreen error", err);
      }
    } else {
      await document.exitFullscreen();
      // Unlock orientation
       if (screen.orientation && 'unlock' in screen.orientation) {
          screen.orientation.unlock();
       }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto p-4 select-none">
      <div 
        ref={containerRef}
        className="bg-black rounded-2xl overflow-hidden shadow-2xl relative border-4 border-gray-800 mb-6 aspect-video flex flex-col group fullscreen:rounded-none fullscreen:border-0 fullscreen:mb-0 fullscreen:h-screen fullscreen:w-screen"
      >
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        )}
        
        <video
          ref={videoRef}
          src={url}
          className="w-full h-full object-contain bg-black"
          playsInline
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
        >
            Tarayıcınız bu videoyu desteklemiyor.
        </video>

        {/* Custom Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:opacity-100">
           
           <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-brand-blue rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
           </div>

           <div className="flex items-center justify-between text-white mt-2">
              <div className="flex items-center gap-4">
                 <button 
                    onClick={togglePlay}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                 >
                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
                 </button>

                 <button 
                    onClick={handleRewind}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors flex items-center gap-1 text-sm font-bold"
                 >
                    <Rewind className="w-6 h-6" />
                    <span>-5s</span>
                 </button>
                 
                 <div className="text-sm font-mono font-bold text-gray-300 ml-2">
                    {formatTime(currentTime)} / {formatTime(duration)}
                 </div>
              </div>

              <div className="flex items-center gap-4">
                 <button 
                    onClick={changeSpeed}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 font-bold text-sm transition-colors border border-white/20 min-w-[60px]"
                 >
                    {playbackRate}x
                 </button>
                 
                 <button 
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                 >
                    <Maximize className="w-6 h-6" />
                 </button>
              </div>
           </div>
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title || "Ders Videosu"}</h3>
        <p className="text-gray-600 bg-blue-50 p-3 rounded-xl border border-blue-100 text-sm">
           ℹ️ <strong>Önemli:</strong> İleri sarma özelliği kısıtlıdır. Kaçırdığınız yerler için 5 saniye geri sarabilirsiniz. Tam ekran modu için köşedeki simgeyi kullanın.
        </p>
      </div>

      <Button onClick={onComplete} fullWidth className="mt-auto" disabled={progress < 90}>
         {progress < 90 ? `Dersi Tamamla (%${Math.floor(progress)})` : "Dersi Tamamla"}
      </Button>
    </div>
  );
};

// --- Podcast Player ---
export const PodcastPlayer: React.FC<{ url?: string, onComplete: () => void }> = ({ url, onComplete }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
        setIsPlaying(false);
        onComplete();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onComplete]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    }
  };

  const changeSpeed = () => {
    const newRate = playbackRate >= 2 ? 1 : playbackRate + 0.25;
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 max-w-md mx-auto">
      
      {/* Visualizer */}
      <div className="w-48 h-48 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-200 mb-8 shadow-xl relative overflow-hidden">
        <Volume2 className={`w-20 h-20 text-blue-500 z-10 ${isPlaying ? 'animate-pulse' : ''}`} />
        {isPlaying && (
            <div className="absolute inset-0 bg-brand-blue/10 animate-pulse rounded-full"></div>
        )}
      </div>

      <audio ref={audioRef} src={url} preload="metadata" />

      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Ders Sohbetleri</h3>
      <p className="text-gray-500 text-sm mb-6">Sesli konu anlatımı</p>

      {/* Progress Bar (Read Only) */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2 relative overflow-hidden">
        <div 
            className="bg-brand-blue h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="w-full flex justify-between text-xs font-bold text-gray-400 mb-8">
         <span>{formatTime(currentTime)}</span>
         <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mb-12">
        <button 
            onClick={handleRewind}
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-brand-blue transition-colors"
        >
            <div className="p-3 rounded-full bg-gray-100 hover:bg-gray-200">
                <RotateCcw className="w-6 h-6"/>
            </div>
            <span className="text-xs font-bold">-5sn</span>
        </button>

        <button 
            onClick={togglePlay}
            className="p-6 rounded-full bg-primary hover:bg-green-500 text-white shadow-lg transform transition-transform active:scale-95"
        >
            {isPlaying ? <Pause className="w-8 h-8 fill-current"/> : <Play className="w-8 h-8 fill-current ml-1"/>}
        </button>

        <button 
            onClick={changeSpeed}
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-brand-blue transition-colors"
        >
            <div className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 w-12 h-12 flex items-center justify-center font-bold">
                {playbackRate}x
            </div>
            <span className="text-xs font-bold">Hız</span>
        </button>
      </div>

      <Button onClick={onComplete} variant="secondary" fullWidth className="max-w-xs" disabled={progress < 90}>
         {progress < 90 ? `Dinlemeye Devam Et (%${Math.floor(progress)})` : "Dersi Tamamla"}
      </Button>
    </div>
  );
};

// --- Infographic Viewer (Preview & Download) ---
export const InfographicViewer: React.FC<{ url?: string, isPremium: boolean }> = ({ url, isPremium }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [adTimeLeft, setAdTimeLeft] = useState(0);
    const [showAdModal, setShowAdModal] = useState(false);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (showAdModal && adTimeLeft > 0) {
            interval = setInterval(() => {
                setAdTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (adTimeLeft === 0 && showAdModal) {
            // Ad finished
            setShowAdModal(false);
            performDownload();
        }
        return () => clearInterval(interval);
    }, [showAdModal, adTimeLeft]);

    const handleDownloadClick = () => {
        if (isPremium) {
            performDownload();
        } else {
            // Start Ad Flow
            setAdTimeLeft(5);
            setShowAdModal(true);
        }
    };

    const performDownload = () => {
        if (!url) return;
        setIsDownloading(true);
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'DersMateryali.png';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => setIsDownloading(false), 2000);
    };

    return (
        <div className="flex flex-col h-full w-full max-w-3xl mx-auto p-4 relative">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Ders Materyali (İnfografik)</h3>
            
            <div className="flex-1 bg-gray-100 rounded-2xl border-4 border-gray-200 overflow-hidden relative shadow-inner mb-6 flex items-center justify-center group">
                 {url ? (
                     <img src={url} alt="Infographic Preview" className="max-h-full max-w-full object-contain" />
                 ) : (
                     <div className="text-gray-400 font-bold">Görüntülenemiyor</div>
                 )}
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 text-sm text-gray-700">
                <p className="font-bold mb-1">💡 Bilgi Kartı</p>
                <p>Bu infografik konunun en önemli noktalarını içerir. İndirip telefonunuza kaydedebilirsiniz.</p>
                {!isPremium && <p className="text-xs text-orange-600 mt-2 font-bold">* Ücretsiz kullanıcılar indirme öncesi kısa bir reklam izler.</p>}
            </div>

            <Button onClick={handleDownloadClick} fullWidth disabled={isDownloading || !url} className="flex items-center justify-center gap-2">
                {isDownloading ? (
                    'İndiriliyor...'
                ) : (
                    <>
                        <Download className="w-5 h-5" /> 
                        {isPremium ? 'Hemen İndir' : 'İndir (Reklamlı)'}
                    </>
                )}
            </Button>

            {/* Simulated Ad Modal */}
            {showAdModal && (
                <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center rounded-2xl p-8 text-white text-center">
                    <div className="w-20 h-20 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mb-6"></div>
                    <h2 className="text-2xl font-bold mb-2">Reklam Videosu</h2>
                    <p className="text-gray-300 mb-8">İçerik hazırlanıyor, lütfen bekleyin...</p>
                    <div className="text-6xl font-black text-brand-yellow animate-pulse">{adTimeLeft}</div>
                </div>
            )}
        </div>
    );
};