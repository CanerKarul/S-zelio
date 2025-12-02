import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Screen, UserProfile, NodeStatus, TopicNode, LessonType, TopicContent } from './types';
import { HISTORY_TOPICS, GEOGRAPHY_TOPICS, MOCK_LEADERBOARD, MOTIVATION_QUOTES } from './constants';
import { Button } from './components/Button';
import { FlashcardDeck, QuizModule, VideoPlayer, PodcastPlayer, InfographicViewer } from './components/LessonModules';
import { generateTopicContent } from './services/geminiService';
import { Star, Lock, CheckCircle, Play, Settings, Plus, RefreshCw, Trophy, Zap, Globe, Book, Download, Image as ImageIcon } from 'lucide-react';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.ONBOARDING);
  const [onboardingStep, setOnboardingStep] = useState(0); // 0: Course, 1: Branch
  const [user, setUser] = useState<UserProfile>({
    name: 'Öğrenci',
    xp: 0,
    streak: 0,
    gems: 100,
    avatar: 'https://picsum.photos/200',
    course: 'TYT',
    branch: 'Tarih',
    isPremium: false
  });

  const [topics, setTopics] = useState<TopicNode[]>(HISTORY_TOPICS);
  const [activeTopic, setActiveTopic] = useState<TopicNode | null>(null);
  const [lessonMode, setLessonMode] = useState<LessonType | null>(null);
  
  // --- Admin State ---
  const [adminTopicTitle, setAdminTopicTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // --- Handlers ---
  
  const handleCourseSelect = (course: string) => {
    setUser({ ...user, course: course as any });
    setOnboardingStep(1);
  };

  const handleBranchSelect = (branch: string) => {
    const selectedTopics = branch === 'Coğrafya' ? GEOGRAPHY_TOPICS : HISTORY_TOPICS;
    setUser({ ...user, branch });
    setTopics(selectedTopics);
    setScreen(Screen.HOME);
  };

  const handleStartLesson = (topic: TopicNode) => {
    setActiveTopic(topic);
    setScreen(Screen.LESSON);
    setLessonMode(null); // Shows lesson menu
  };

  const completeLesson = (xpEarned: number) => {
    setUser(prev => ({ ...prev, xp: prev.xp + xpEarned, gems: prev.gems + 10 }));
    
    // Unlock next node logic (mock)
    if (activeTopic) {
        const currentIndex = topics.findIndex(t => t.id === activeTopic.id);
        const newTopics = [...topics];
        newTopics[currentIndex].status = NodeStatus.COMPLETED;
        if (currentIndex + 1 < newTopics.length) {
            if (newTopics[currentIndex + 1].status === NodeStatus.LOCKED) {
                newTopics[currentIndex + 1].status = NodeStatus.ACTIVE;
            }
        }
        setTopics(newTopics);
    }

    setLessonMode(null);
    setScreen(Screen.HOME);
    setActiveTopic(null);
    alert(`Tebrikler! ${xpEarned} XP kazandın! 🎉`);
  };

  const handleAdminGenerate = async () => {
      if (!adminTopicTitle) return;
      setIsGenerating(true);
      const generatedContent = await generateTopicContent(adminTopicTitle);
      
      const newTopic: TopicNode = {
          id: Date.now().toString(),
          title: adminTopicTitle,
          description: generatedContent.summary || 'Açıklama yok',
          status: NodeStatus.LOCKED,
          position: topics.length % 2 === 0 ? 'left' : 'right',
          content: {
              summary: generatedContent.summary || '',
              flashcards: generatedContent.flashcards || [],
              questions: generatedContent.questions || []
          }
      };
      
      setTopics([...topics, newTopic]);
      setAdminTopicTitle('');
      setIsGenerating(false);
  };

  // --- Render Functions ---

  const renderOnboarding = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 max-w-md mx-auto">
      <div className="w-24 h-24 bg-primary rounded-full mb-8 flex items-center justify-center animate-bounce-short">
         <span className="text-4xl">🦉</span>
      </div>
      <h1 className="text-3xl font-extrabold text-gray-700 text-center mb-2">Sözelio'ya Hoş Geldin!</h1>
      <p className="text-gray-500 text-center mb-8">KPSS, TYT ve AYT sözel dersleri artık cebinde.</p>
      
      {onboardingStep === 0 ? (
        <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="font-bold text-gray-600">Hangi sınava hazırlanıyorsun?</h3>
          {['KPSS', 'TYT', 'AYT'].map(course => (
            <button 
              key={course}
              onClick={() => handleCourseSelect(course)}
              className="w-full p-4 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-blue-50 hover:border-brand-blue-dark transition-all text-left flex justify-between items-center group"
            >
              {course}
              <span className="text-gray-300 group-hover:text-brand-blue transition-colors">➜</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="w-full space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
           <button onClick={() => setOnboardingStep(0)} className="text-sm text-gray-400 font-bold mb-2 hover:text-gray-600">← Geri</button>
           <h3 className="font-bold text-gray-600">Hangi derse çalışmak istersin?</h3>
           <button 
              onClick={() => handleBranchSelect('Tarih')}
              className="w-full p-4 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-yellow-50 hover:border-brand-yellow-dark transition-all text-left flex items-center gap-4 group"
            >
              <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><Book className="w-6 h-6"/></div>
              <span className="flex-1">Tarih</span>
              <span className="text-gray-300 group-hover:text-brand-yellow">➜</span>
            </button>
            <button 
              onClick={() => handleBranchSelect('Coğrafya')}
              className="w-full p-4 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-blue-50 hover:border-brand-blue-dark transition-all text-left flex items-center gap-4 group"
            >
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Globe className="w-6 h-6"/></div>
              <span className="flex-1">Coğrafya</span>
              <span className="text-gray-300 group-hover:text-brand-blue">➜</span>
            </button>
        </div>
      )}
    </div>
  );

  const renderPath = () => (
    <div className="flex flex-col items-center py-12 px-4 space-y-8 min-h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
       {/* Unit Header */}
       <div className={`w-full max-w-md p-4 rounded-2xl mb-8 flex items-center justify-center relative text-white shadow-lg border-b-4 ${user.branch === 'Coğrafya' ? 'bg-brand-blue border-brand-blue-dark' : 'bg-primary border-primary-dark'}`}>
          <div className="text-center">
            <h2 className="font-extrabold text-lg uppercase opacity-90">Ünite 1</h2>
            <h3 className="font-black text-xl">{user.branch === 'Coğrafya' ? 'Doğal Sistemler' : 'Tarihe Giriş'}</h3>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">
             {user.branch === 'Coğrafya' ? <Globe className="w-12 h-12" /> : <BookOpenIcon className="w-12 h-12" />}
          </div>
       </div>

       {topics.map((topic, index) => {
          let bgColor = 'bg-gray-200';
          let borderColor = 'border-gray-300';
          let icon = <Lock className="text-gray-400 w-8 h-8" />;
          let disabled = true;
          let textColor = 'text-gray-600';

          if (topic.status === NodeStatus.COMPLETED) {
             bgColor = 'bg-brand-yellow';
             borderColor = 'border-brand-yellow-dark';
             icon = <CheckCircle className="text-white w-10 h-10" />;
             disabled = false;
             textColor = 'text-yellow-700';
          } else if (topic.status === NodeStatus.ACTIVE) {
             bgColor = user.branch === 'Coğrafya' ? 'bg-brand-blue' : 'bg-primary';
             borderColor = user.branch === 'Coğrafya' ? 'border-brand-blue-dark' : 'border-primary-dark';
             icon = <Star className="text-white w-10 h-10 fill-current animate-pulse" />;
             disabled = false;
             textColor = user.branch === 'Coğrafya' ? 'text-blue-700' : 'text-green-700';
          }

          // Zig Zag Logic
          const translateClass = topic.position === 'left' ? '-translate-x-12' : topic.position === 'right' ? 'translate-x-12' : 'translate-x-0';

          return (
            <div key={topic.id} className={`relative flex flex-col items-center z-10 ${translateClass}`}>
              <button
                disabled={disabled}
                onClick={() => handleStartLesson(topic)}
                className={`w-24 h-24 rounded-full flex items-center justify-center border-b-8 shadow-xl transition-transform active:translate-y-2 active:border-b-0 relative
                  ${bgColor} ${borderColor} ${disabled ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:brightness-110'}
                `}
              >
                {icon}
                {topic.isNew && (
                  <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce shadow-sm border border-white">
                    YENİ
                  </span>
                )}
              </button>
              {/* Connector Line (Except last) */}
              {index < topics.length - 1 && (
                 <div className="absolute top-20 w-3 h-16 bg-gray-200 -z-10 rounded-full"></div>
              )}
              <span className={`mt-2 font-bold bg-white/90 px-3 py-1.5 rounded-xl text-sm backdrop-blur-sm max-w-[160px] text-center shadow-sm border border-gray-100 ${textColor}`}>
                {topic.title}
              </span>
            </div>
          );
       })}
       
       <div className="h-32 flex items-center justify-center">
          <img src="https://picsum.photos/100/100?random=99" className="opacity-50 grayscale rounded-full" alt="Coming soon" />
       </div>
    </div>
  );

  const renderLesson = () => {
    if (!activeTopic) return null;

    if (!lessonMode) {
      // Lesson Menu
      return (
        <div className="flex flex-col h-full bg-white">
           <div className={`${user.branch === 'Coğrafya' ? 'bg-brand-blue' : 'bg-primary'} h-48 flex flex-col items-center justify-center text-white relative`}>
              <button onClick={() => setScreen(Screen.HOME)} className="absolute top-4 left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                 <span className="text-2xl font-bold">✕</span>
              </button>
              <h1 className="text-3xl font-black text-center px-4 animate-in slide-in-from-top-4">{activeTopic.title}</h1>
              <p className="opacity-90 mt-2 font-medium">{activeTopic.description}</p>
           </div>
           
           <div className="flex-1 p-6 grid grid-cols-2 gap-4 content-start overflow-y-auto animate-in slide-in-from-bottom-8 duration-500 pb-20">
              <LessonCard icon={<Play />} title="Ders İçeriği" color="bg-brand-red" onClick={() => setLessonMode(LessonType.VIDEO)} />
              <LessonCard icon={<Zap />} title="Podcast" color="bg-brand-blue" onClick={() => setLessonMode(LessonType.PODCAST)} />
              <LessonCard icon={<RefreshCw />} title="Flashcards" color="bg-brand-yellow" onClick={() => setLessonMode(LessonType.FLASHCARD)} />
              <LessonCard icon={<CheckCircle />} title="Test Çöz" color="bg-primary" onClick={() => setLessonMode(LessonType.QUIZ)} />
              
              <div className="col-span-2">
                 <LessonCard icon={<ImageIcon />} title="Ders Materyali" color="bg-purple-500" onClick={() => setLessonMode(LessonType.INFOGRAPHIC)} />
              </div>

              <div className="col-span-2 mt-2 p-4 bg-gray-50 rounded-2xl border-2 border-gray-100">
                <h4 className="font-bold text-gray-700 mb-2">Özet Not</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                   {activeTopic.content.summary || "Bu konu için henüz özet bulunmamaktadır."}
                </p>
              </div>
           </div>
        </div>
      );
    }

    // Actual Lesson Modules
    return (
      <div className="h-full flex flex-col bg-white">
         <div className="h-16 border-b flex items-center px-4 justify-between bg-white z-10 shrink-0">
            <button onClick={() => setLessonMode(null)} className="text-gray-400 hover:text-gray-600 font-bold transition-colors">ÇIKIŞ</button>
            <div className="w-full max-w-md mx-4 bg-gray-200 h-4 rounded-full">
               <div className={`${user.branch === 'Coğrafya' ? 'bg-brand-blue' : 'bg-primary'} h-4 rounded-full w-1/2 transition-all duration-1000`}></div>
            </div>
            <div className="text-brand-red font-bold animate-pulse">❤️ 5</div>
         </div>
         <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {lessonMode === LessonType.FLASHCARD && (
                <FlashcardDeck 
                  cards={activeTopic.content.flashcards.length > 0 ? activeTopic.content.flashcards : [{id:'0', front: 'Örnek Soru', back: 'Örnek Cevap'}]} 
                  onComplete={() => completeLesson(15)} 
                />
            )}
            {lessonMode === LessonType.QUIZ && (
                <QuizModule 
                  questions={activeTopic.content.questions.length > 0 ? activeTopic.content.questions : [{id:'0', text: 'Örnek Soru?', options: ['A','B'], correctIndex:0, type:'MULTIPLE_CHOICE'}]} 
                  onComplete={(score) => completeLesson(score * 10)} 
                />
            )}
            {lessonMode === LessonType.VIDEO && <VideoPlayer url={activeTopic.content.videoUrl} title={activeTopic.title} onComplete={() => completeLesson(20)} />}
            {lessonMode === LessonType.PODCAST && <PodcastPlayer url={activeTopic.content.podcastUrl} onComplete={() => completeLesson(20)} />}
            {lessonMode === LessonType.INFOGRAPHIC && <InfographicViewer url={activeTopic.content.infographicUrl} isPremium={user.isPremium} />}
         </div>
      </div>
    );
  };

  const renderLeaderboard = () => (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
         <h2 className="text-2xl font-bold text-gray-800">Elmas Ligi</h2>
         <p className="text-gray-500">İlk 3 bir üst lige çıkar!</p>
      </div>
      <div className="space-y-4">
         {MOCK_LEADERBOARD.map((u, i) => (
           <div key={i} className={`flex items-center p-4 rounded-2xl border-2 transition-transform hover:scale-102 ${i < 3 ? 'bg-yellow-50 border-brand-yellow' : 'bg-white border-gray-100'}`}>
              <div className="font-bold text-gray-400 w-8">{u.rank}</div>
              <img src={u.avatar} className="w-12 h-12 rounded-full mr-4 bg-gray-200" />
              <div className="flex-1 font-bold text-gray-700">{u.name}</div>
              <div className="font-bold text-gray-600">{u.xp} XP</div>
           </div>
         ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
       <div className="flex items-center gap-6 pb-6 border-b">
          <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-brand-blue text-4xl flex items-center justify-center">
            <span className="text-6xl">👤</span>
          </div>
          <div>
             <h2 className="text-2xl font-black text-gray-800">{user.name}</h2>
             <p className="text-gray-500 font-bold mb-2">Katılım: Ocak 2024</p>
             <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-bold text-gray-500">{user.course}</span>
                <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-bold text-gray-500">{user.branch}</span>
                {user.isPremium ? (
                    <span className="px-3 py-1 bg-brand-yellow rounded-lg text-sm font-bold text-yellow-800">Premium</span>
                ) : (
                    <span className="px-3 py-1 bg-gray-200 rounded-lg text-sm font-bold text-gray-600">Ücretsiz</span>
                )}
             </div>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4">
          <StatCard title="Toplam XP" value={user.xp} icon="⚡" color="text-brand-yellow" />
          <StatCard title="Seri" value={user.streak} icon="🔥" color="text-orange-500" />
          <StatCard title="Lig" value="Elmas" icon="🏆" color="text-purple-500" />
          <StatCard title="Başarım" value="3/20" icon="🏅" color="text-brand-blue" />
       </div>
       
       {!user.isPremium && (
           <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white text-center shadow-lg transform transition-transform hover:scale-105 cursor-pointer" onClick={() => setUser({...user, isPremium: true})}>
              <h3 className="text-xl font-bold mb-2">Premium'a Geç!</h3>
              <p className="mb-4 opacity-90">Reklamsız deneyim ve sınırsız indirme özelliği.</p>
              <div className="bg-white text-purple-600 font-bold py-2 px-6 rounded-xl inline-block">
                 Deneme Sürümünü Başlat
              </div>
           </div>
       )}
       
       <button onClick={() => {setScreen(Screen.ONBOARDING); setOnboardingStep(1);}} className="w-full py-4 text-brand-red font-bold border-2 border-red-100 rounded-xl hover:bg-red-50 transition-colors">
          Ders Değiştir
       </button>
    </div>
  );

  const renderAdmin = () => (
      <div className="p-6 max-w-4xl mx-auto">
         <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Settings className="w-6 h-6" /> İçerik Yönetim Paneli
         </h2>
         
         <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-primary">Yeni Konu Ekle</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Konu Başlığı</label>
                        <input 
                            type="text" 
                            value={adminTopicTitle}
                            onChange={(e) => setAdminTopicTitle(e.target.value)}
                            className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-primary outline-none font-bold"
                            placeholder="Örn: Tanzimat Edebiyatı"
                        />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-700">
                        <p className="font-bold mb-1">🤖 AI Asistan</p>
                        <p>Gemini API kullanarak konu başlığından otomatik Özet, Flashcard ve Soru üretilir.</p>
                    </div>
                    <Button 
                        fullWidth 
                        onClick={handleAdminGenerate} 
                        disabled={isGenerating || !adminTopicTitle}
                    >
                        {isGenerating ? 'Oluşturuluyor...' : '✨ AI İle İçerik Üret'}
                    </Button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-sm h-96 overflow-y-auto">
                <h3 className="font-bold text-lg mb-4 text-gray-700">Mevcut Konular ({user.branch})</h3>
                <div className="space-y-2">
                    {topics.map(t => (
                        <div key={t.id} className="p-3 border rounded-xl flex justify-between items-center bg-gray-50">
                            <span className="font-semibold text-sm">{t.title}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${t.status === NodeStatus.COMPLETED ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                                {t.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </div>
  );

  // --- Main Render ---

  if (screen === Screen.ONBOARDING) {
    return renderOnboarding();
  }

  if (screen === Screen.LESSON) {
    return renderLesson();
  }

  return (
    <Layout currentScreen={screen} setScreen={setScreen} user={user}>
      {screen === Screen.HOME && renderPath()}
      {screen === Screen.LEADERBOARD && renderLeaderboard()}
      {screen === Screen.PROFILE && renderProfile()}
      {screen === Screen.SHOP && (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Mağaza</h2>
            <div className="grid grid-cols-2 gap-4">
                <ShopItem icon="❄️" name="Seri Dondurucusu" cost={200} />
                <ShopItem icon="⚡" name="XP Takviyesi" cost={150} />
            </div>
          </div>
      )}
      {screen === Screen.ADMIN && renderAdmin()}
    </Layout>
  );
};

// --- Sub Components ---

const LessonCard: React.FC<{ icon: React.ReactNode, title: string, color: string, onClick: () => void }> = ({ icon, title, color, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center p-6 rounded-2xl border-b-4 text-white shadow-lg active:border-b-0 active:translate-y-1 transition-all ${color} border-black/20 hover:brightness-110 w-full`}>
        <div className="w-10 h-10 mb-2 [&>svg]:w-full [&>svg]:h-full">{icon}</div>
        <span className="font-bold text-sm sm:text-base">{title}</span>
    </button>
);

const StatCard: React.FC<{ title: string, value: string | number, icon: string, color: string }> = ({ title, value, icon, color }) => (
    <div className="border-2 border-gray-200 rounded-2xl p-4 flex flex-col hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-gray-500">{title}</span>
            <span className="text-xl">{icon}</span>
        </div>
        <span className={`text-xl font-extrabold ${color}`}>{value}</span>
    </div>
);

const ShopItem: React.FC<{ icon: string, name: string, cost: number }> = ({ icon, name, cost }) => (
    <div className="border-2 border-gray-200 rounded-2xl p-4 flex flex-col items-center hover:bg-gray-50">
        <div className="text-4xl mb-4">{icon}</div>
        <div className="font-bold text-gray-700 mb-2">{name}</div>
        <Button variant="secondary" className="w-full text-sm py-2">💎 {cost}</Button>
    </div>
);

// Icon component helper
function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

export default App;