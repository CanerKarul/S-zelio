import { TopicNode, NodeStatus, LeaderboardUser } from './types';

const COMMON_VIDEO_URL = "https://firebasestorage.googleapis.com/v0/b/sozelio.firebasestorage.app/o/Tu%CC%88rkiye_nin_I%CC%87klimi__H%C4%B1zl%C4%B1_KPSS_Tekrar%C4%B1.mp4?alt=media&token=6807829f-b1ed-4672-a93b-c45cca492d87";
const COMMON_PODCAST_URL = "https://firebasestorage.googleapis.com/v0/b/sozelio.firebasestorage.app/o/Tu%CC%88rkiye_I%CC%87kliminin_S%CC%A7ifresi_Mutlak_ve_Go%CC%88receli_Konum.m4a?alt=media&token=d039ab42-74e2-4cda-b457-cfe2490a13b9";
const COMMON_INFOGRAPHIC_URL = "https://firebasestorage.googleapis.com/v0/b/sozelio.firebasestorage.app/o/unnamed.png?alt=media&token=e20189bf-7a46-4a2b-933a-5faf31c8965c";

export const HISTORY_TOPICS: TopicNode[] = [
  {
    id: '1',
    title: 'Tarih Bilimine Giriş',
    description: 'Tarihin tanımı, yöntemi ve kaynakları.',
    status: NodeStatus.COMPLETED,
    position: 'center',
    content: {
      videoUrl: COMMON_VIDEO_URL,
      podcastUrl: COMMON_PODCAST_URL,
      infographicUrl: COMMON_INFOGRAPHIC_URL,
      summary: 'Tarih, geçmişteki olayları yer ve zaman göstererek, sebep-sonuç ilişkisi içinde inceleyen bilim dalıdır.',
      flashcards: [
        { id: 'f1', front: 'Tarihin babası kimdir?', back: 'Herodot' },
        { id: 'f2', front: 'Olay vs Olgur farkı?', back: 'Olay anlık, olgu süreçtir.' }
      ],
      questions: [
        { id: 'q1', text: 'Aşağıdakilerden hangisi tarihin yöntemlerinden biri değildir?', options: ['Tarama', 'Tasnif', 'Deney', 'Tahlil'], correctIndex: 2, type: 'MULTIPLE_CHOICE' }
      ]
    }
  },
  {
    id: '2',
    title: 'İlk Çağ Uygarlıkları',
    description: 'Mezopotamya, Mısır ve Anadolu uygarlıkları.',
    status: NodeStatus.ACTIVE,
    position: 'left',
    content: {
      videoUrl: COMMON_VIDEO_URL,
      podcastUrl: COMMON_PODCAST_URL,
      infographicUrl: COMMON_INFOGRAPHIC_URL,
      summary: 'Sümerler yazıyı buldu. Mısırlılar hiyeroglifi geliştirdi.',
      flashcards: [
        { id: 'f3', front: 'Yazıyı kim buldu?', back: 'Sümerler' },
        { id: 'f4', front: 'Parayı kim buldu?', back: 'Lidyalılar' }
      ],
      questions: [
        { id: 'q2', text: 'Parayı bulan uygarlık hangisidir?', options: ['Urartular', 'Lidyalılar', 'Hititler', 'İyonlar'], correctIndex: 1, type: 'MULTIPLE_CHOICE' },
        { id: 'q3', text: 'Tarihte bilinen ilk yazılı antlaşma hangisidir?', options: ['Kadeş', 'Vestfalya', 'Ankara', 'Lozan'], correctIndex: 0, type: 'MULTIPLE_CHOICE' }
      ]
    }
  },
  {
    id: '3',
    title: 'İslamiyet Öncesi Türk Tarihi',
    description: 'Orta Asya Türk devletleri ve kültür.',
    status: NodeStatus.LOCKED,
    position: 'right',
    content: {
      videoUrl: COMMON_VIDEO_URL,
      podcastUrl: COMMON_PODCAST_URL,
      infographicUrl: COMMON_INFOGRAPHIC_URL,
      flashcards: [],
      questions: [],
      summary: 'Türk adının anlamı güç, kuvvet, olgunluk çağı demektir.'
    }
  },
  {
    id: '4',
    title: 'İlk Türk İslam Devletleri',
    description: 'Karahanlılar, Gazneliler, Selçuklular.',
    status: NodeStatus.LOCKED,
    position: 'center',
    content: {
      videoUrl: COMMON_VIDEO_URL,
      podcastUrl: COMMON_PODCAST_URL,
      infographicUrl: COMMON_INFOGRAPHIC_URL,
      flashcards: [],
      questions: [],
      summary: ''
    }
  },
  {
    id: '5',
    title: 'Türkiye Tarihi',
    description: 'Anadolu Selçuklu Devleti ve Beylikler.',
    status: NodeStatus.LOCKED,
    position: 'left',
    content: {
      videoUrl: COMMON_VIDEO_URL,
      podcastUrl: COMMON_PODCAST_URL,
      infographicUrl: COMMON_INFOGRAPHIC_URL,
      flashcards: [],
      questions: [],
      summary: ''
    }
  }
];

export const GEOGRAPHY_TOPICS: TopicNode[] = [
  {
    id: 'g1',
    title: 'Doğa ve İnsan',
    description: 'Coğrafyanın bölümleri ve insan doğa etkileşimi.',
    status: NodeStatus.COMPLETED,
    position: 'center',
    content: {
      videoUrl: COMMON_VIDEO_URL,
      podcastUrl: COMMON_PODCAST_URL,
      infographicUrl: COMMON_INFOGRAPHIC_URL,
      summary: 'Coğrafya; fiziki ve beşeri coğrafya olarak ikiye ayrılır. İnsan ve doğa sürekli etkileşim halindedir.',
      flashcards: [
        { id: 'gf1', front: 'Fiziki Coğrafya nedir?', back: 'Doğal ortamı inceleyen bilim dalıdır.' },
        { id: 'gf2', front: 'Litosfer nedir?', back: 'Taş küre.' }
      ],
      questions: [
        { id: 'gq1', text: 'Aşağıdakilerden hangisi fiziki coğrafyanın alt dalıdır?', options: ['Klimatoloji', 'Nüfus Coğrafyası', 'Siyasi Coğrafya', 'Turizm Coğrafyası'], correctIndex: 0, type: 'MULTIPLE_CHOICE' }
      ]
    }
  },
  {
    id: 'g2',
    title: 'Coğrafi Konum',
    description: 'Matematik ve Özel Konum, Paralel ve Meridyenler.',
    status: NodeStatus.ACTIVE,
    position: 'right',
    content: {
      videoUrl: COMMON_VIDEO_URL,
      podcastUrl: COMMON_PODCAST_URL,
      infographicUrl: COMMON_INFOGRAPHIC_URL,
      summary: 'Türkiye 36-42 Kuzey paralelleri ve 26-45 Doğu meridyenleri arasındadır.',
      flashcards: [
        { id: 'gf3', front: 'Türkiye hangi saat dilimini kullanır?', back: '3. Saat Dilimi (+3 GMT)' },
        { id: 'gf4', front: 'Ekvatorun çevresi kaç kmdir?', back: '40.076 km' }
      ],
      questions: [
        { id: 'gq2', text: 'Türkiye\'nin en doğusu ile en batısı arasında kaç dakikalık zaman farkı vardır?', options: ['60', '76', '55', '40'], correctIndex: 1, type: 'MULTIPLE_CHOICE' }
      ]
    }
  },
  {
    id: 'g_yt_1',
    title: 'Konu Anlatımı (Video)',
    description: 'Coğrafi konum detaylı anlatım videosu.',
    status: NodeStatus.ACTIVE,
    position: 'left',
    isNew: true,
    content: {
      videoUrl: COMMON_VIDEO_URL,
      podcastUrl: COMMON_PODCAST_URL,
      infographicUrl: COMMON_INFOGRAPHIC_URL,
      summary: 'Video anlatımı ile konuları pekiştirin.',
      flashcards: [],
      questions: []
    }
  },
  {
    id: 'g_drive_1',
    title: 'Ders Video Serisi 2',
    description: 'Devam niteliğinde ders videosu.',
    status: NodeStatus.ACTIVE,
    position: 'center',
    isNew: true,
    content: {
      videoUrl: COMMON_VIDEO_URL,
      podcastUrl: COMMON_PODCAST_URL,
      infographicUrl: COMMON_INFOGRAPHIC_URL,
      summary: 'Videoyu izleyerek tekrar yapın.',
      flashcards: [],
      questions: []
    }
  },
  {
    id: 'g3',
    title: 'Harita Bilgisi',
    description: 'Projeksiyonlar, Ölçekler ve Harita Çeşitleri.',
    status: NodeStatus.LOCKED,
    position: 'right',
    content: {
      videoUrl: COMMON_VIDEO_URL,
      podcastUrl: COMMON_PODCAST_URL,
      infographicUrl: COMMON_INFOGRAPHIC_URL,
      flashcards: [],
      questions: [],
      summary: ''
    }
  },
  {
    id: 'g4',
    title: 'Dünya\'nın Şekli ve Hareketleri',
    description: 'Eksen eğikliği, Yıllık ve Günlük hareketler.',
    status: NodeStatus.LOCKED,
    position: 'center',
    content: {
      videoUrl: COMMON_VIDEO_URL,
      podcastUrl: COMMON_PODCAST_URL,
      infographicUrl: COMMON_INFOGRAPHIC_URL,
      flashcards: [],
      questions: [],
      summary: ''
    }
  },
  {
    id: 'g5',
    title: 'İklim Bilgisi',
    description: 'Atmosfer, Sıcaklık, Basınç ve Rüzgarlar.',
    status: NodeStatus.LOCKED,
    position: 'left',
    content: {
      videoUrl: COMMON_VIDEO_URL,
      podcastUrl: COMMON_PODCAST_URL,
      infographicUrl: COMMON_INFOGRAPHIC_URL,
      flashcards: [],
      questions: [],
      summary: ''
    }
  }
];

export const INITIAL_TOPICS = HISTORY_TOPICS;

export const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Ahmet Y.', xp: 2450, avatar: 'https://picsum.photos/50/50?random=1' },
  { rank: 2, name: 'Elif K.', xp: 2320, avatar: 'https://picsum.photos/50/50?random=2' },
  { rank: 3, name: 'Can B.', xp: 2100, avatar: 'https://picsum.photos/50/50?random=3' },
  { rank: 4, name: 'Selin D.', xp: 1950, avatar: 'https://picsum.photos/50/50?random=4' },
  { rank: 5, name: 'Mehmet O.', xp: 1800, avatar: 'https://picsum.photos/50/50?random=5' },
];

export const MOTIVATION_QUOTES = [
  "Harika gidiyorsun! 🚀",
  "Biraz daha gayret! 💪",
  "Bilgi güçtür! 📚",
  "Hedefine bir adım daha yaklaştın! 🎯"
];