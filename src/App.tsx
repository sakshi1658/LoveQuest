import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Coffee, Heart, MessageCircle, Music, ArrowDown, Play, Pause, SkipForward } from 'lucide-react';

function App() {
  const [conversation, setConversation] = useState(0);
  const [characterPosition, setCharacterPosition] = useState(0);
  const [showEvening, setShowEvening] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const songs = [
    {
      title: "♪ Guzarish ♪",
      url: "/src/assets/guzarish.mp3"
    },
    {
      title: "♪ Apna Bana Le ♪",
      url: "/src/assets/Apna-Bana-Le.mp3"
    },
    {
      title: "♪ Rasiya ♪",
      url: "/src/assets/rasiya.mp3"
    },
    {
      title: "♪ Soniyo ♪",
      url: "/src/assets/Soniyo.mp3"
    },
    {
      title: "♪ Cigarette After Sex - Heavenly ♪",
      url: "/src/assets/heavenly.mp3"
    },
    // {
    //   title: "♪ Cigarette After Sex - Apocalypse ♪",
    //   url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c9a4a1d936.mp3"
    // },
    // {
    //   title: "♪ Cigarette After Sex - Sweet ♪",
    //   url: "https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3"
    // }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setConversation((prev) => (prev + 1) % 4);
    }, 4000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const walkingAnimation = setInterval(() => {
      if (characterPosition < 100) {
        setCharacterPosition((prev) => Math.min(prev + 0.5, 100));
      }
    }, 50);
    
    return () => clearInterval(walkingAnimation);
  }, [characterPosition]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(songs[currentSong].url);
      audioRef.current.addEventListener('ended', nextSong);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', nextSong);
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSong].url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleEvening = () => {
    setShowEvening(true);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-8 mt-4">
          Adi & Sakshi's Love Story
        </h1>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Software Developer (Adi) */}
          <div className="relative">
            <div className="bg-blue-100 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center animate-bounce">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-blue-800">Software Developer</h2>
                  <p className="text-sm text-blue-600">Adi</p>
                </div>
              </div>
              <div className={`message-bubble ${conversation === 1 || conversation === 3 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                {conversation === 1 && (
                  <p className="text-gray-700">"Yes love, I have my lunch! Take care, I'll pick you up in the evening for our coffee date! ☕️"</p>
                )}
                {conversation === 3 && (
                  <p className="text-gray-700">"Can't wait to play your favorite songs tonight! 🎵"</p>
                )}
              </div>
            </div>
          </div>

          {/* CSE Engineer (Sakshi) */}
          <div className="relative">
            <div className="bg-pink-100 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center animate-bounce">
                  <MessageCircle className="w-8 h-8 text-pink-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-pink-800">CS Engineer</h2>
                  <p className="text-sm text-pink-600">Sakshi</p>
                </div>
              </div>
              <div className={`message-bubble ${conversation === 0 || conversation === 2 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                {conversation === 0 && (
                  <p className="text-gray-700">"Hey honey! Did you take your lunch box? I'm leaving for office! 🍱"</p>
                )}
                {conversation === 2 && (
                  <p className="text-gray-700">"Bye love! Can't wait for our evening together! 👋"</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Morning Scene */}
        <div className="mt-12 relative h-48 bg-gradient-to-b from-sky-200 to-sky-100 rounded-lg overflow-hidden">
          <div className="absolute top-4 right-8 w-12 h-12 bg-yellow-300 rounded-full animate-pulse" />
          
          {/* Walking Character (Sakshi) */}
          <div 
            className="absolute bottom-0 transition-all duration-300"
            style={{ left: `${characterPosition}%` }}
          >
            <div className="relative">
              <div className="w-8 h-16 bg-pink-400 rounded-t-full animate-[walk_1s_infinite]" />
              <div className="absolute -top-4 w-6 h-6 bg-pink-300 rounded-full left-1" />
            </div>
          </div>
          
          {/* Waving Character (Adi) */}
          <div className="absolute bottom-0 left-4">
            <div className="relative">
              <div className="w-8 h-16 bg-blue-400 rounded-t-full" />
              <div className="absolute -top-4 w-6 h-6 bg-blue-300 rounded-full left-1" />
              <div className="absolute -right-4 top-0">
                <div className="w-4 h-4 bg-blue-300 rounded-full animate-[wave_1s_infinite]" />
                <div className="absolute -top-6 -right-2 bg-white px-2 py-1 rounded-full text-xs font-bold text-blue-500 animate-bounce">
                  Bye!
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 w-full flex justify-around">
            <div className="w-24 h-32 bg-gray-800 rounded-t-lg relative">
              <div className="absolute inset-2 grid grid-cols-2 gap-1">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-yellow-100 rounded-sm animate-pulse" />
                ))}
              </div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Heart className="w-8 h-8 text-pink-500 animate-bounce" />
              </div>
            </div>
            
            <div className="w-24 h-40 bg-gray-700 rounded-t-lg relative">
              <div className="absolute inset-2 grid grid-cols-2 gap-1">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="bg-yellow-100 rounded-sm animate-pulse" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-4">
            <div className="w-20 h-24 bg-rose-400 rounded-t-lg relative">
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <Coffee className="w-6 h-6 text-white animate-bounce" />
              </div>
            </div>
          </div>

          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${20 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                top: '50%'
              }}
            >
              <Heart className="w-4 h-4 text-pink-400" />
            </div>
          ))}
        </div>

        {/* Transition Text and Button */}
        <div className="text-center my-8">
          <p className="text-lg text-purple-700 mb-4 font-medium">
            "Hey love! Work's done, let me play your favorite songs while we spend this beautiful evening together ❤️"
          </p>
          <button
            onClick={toggleEvening}
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Start Our Evening Together
          </button>
        </div>

        {/* Evening Scene */}
        {showEvening && (
          <div className="relative h-96 bg-gradient-to-b from-indigo-900 to-purple-900 rounded-lg overflow-hidden p-6 transition-all duration-500">
            {/* Stars */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
            
            {/* Moon */}
            <div className="absolute top-4 right-8 w-12 h-12 bg-yellow-100 rounded-full" />
            
            {/* Music Player */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-4">
              <button 
                onClick={togglePlay}
                className="text-white hover:text-purple-300 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <span className="text-white font-medium">{songs[currentSong].title}</span>
              <button 
                onClick={nextSong}
                className="text-white hover:text-purple-300 transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>
            
            {/* Couch Scene */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                {/* Couch */}
                <div className="w-64 h-24 bg-purple-700 rounded-lg shadow-lg">
                  <div className="absolute top-0 left-0 w-full h-8 bg-purple-600 rounded-t-lg" />
                </div>
                
                {/* Characters */}
                <div className="absolute top-2 left-8">
                  <div className="w-8 h-12 bg-blue-400 rounded-t-full" />
                  <div className="absolute -top-4 w-6 h-6 bg-blue-300 rounded-full left-1" />
                </div>
                <div className="absolute top-2 right-8">
                  <div className="w-8 h-12 bg-pink-400 rounded-t-full" />
                  <div className="absolute -top-4 w-6 h-6 bg-pink-300 rounded-full left-1" />
                </div>

                {/* Music Notes */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <Music className="w-6 h-6 text-white animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-8 text-gray-600">
          <p className="animate-pulse">💕 A day in their life 💕</p>
        </div>
      </div>
    </div>
  );
}

export default App;