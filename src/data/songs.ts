import { Song } from '../types';

export const INITIAL_SONGS: Song[] = [
  // HINDI SONGS
  {
    id: 'hindi-1',
    title: 'Tum Hi Ho (Acoustic Unplugged)',
    artist: 'Hindi Melodies & Flute',
    album: 'Aashiqui Soul',
    language: 'Hindi',
    genre: 'Romantic',
    duration: 262,
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    isPopular: true,
    lyrics: `Hum tere bin ab reh nahi sakte
Tere bina kya wajood mera
Tujhse juda gar ho jaayenge
Toh khud se hi ho jaayenge judaa

Kyunki tum hi ho, ab tum hi ho
Zindagi ab tum hi ho
Chain bhi, mera dard bhi
Meri aashiqui ab tum hi ho...`
  },
  {
    id: 'hindi-2',
    title: 'Kesariya (Chill Guitar Vibe)',
    artist: 'Bollywood Chill Sessions',
    album: 'Brahmastra Beats',
    language: 'Hindi',
    genre: 'Bollywood',
    duration: 218,
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=sunset-landscape-10940.mp3',
    isPopular: true,
    lyrics: `Mujhko kitna pyaar hai tumse
Mera chaand dekh kar bataya tha
Ho kesariya tera ishq hai piya
Rang jaaun jo main haath lagaun

Biti saari teri firozi raatain
Kajraare dil ki toofani baatein
Kesariya tera ishq hai piya...`
  },
  {
    id: 'hindi-3',
    title: 'Raabta (Indian Classical Flute)',
    artist: 'Pandit Sharma & Group',
    album: 'Spiritual Strings',
    language: 'Hindi',
    genre: 'Classical Fusion',
    duration: 245,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=relaxing-light-piano-10831.mp3',
    isPopular: false,
    lyrics: `Ik tera raabta hai mere dil se
Kuch toh hai tujhse raabta
Kuch toh hai tujhse raabta

Kahte hain khuda ne iss jahan mein sabhi ke liye
Kisi na kisi ko hai banaya har kisi ke liye...`
  },
  {
    id: 'hindi-4',
    title: 'Phaasle (Indie Hindi Wave)',
    artist: 'Aditya & The Band',
    album: 'Independent Beats Vol. 1',
    language: 'Hindi',
    genre: 'Indie Pop',
    duration: 195,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f73f11.mp3?filename=in-the-forest-casual-guitar-124996.mp3',
    isPopular: true,
    lyrics: `Phaasle jo hai darmiyaan
Kaash yeh mit jaayen
Raste jo alag huye
Phir wahi pe mil jaayen

Subah ki dhoop mein teri yaad aaye
Raat ke andhere mein dil ghabraye...`
  },
  {
    id: 'hindi-5',
    title: 'Chura Liya Hai (Retro Revisit)',
    artist: 'Classic R.D. Tributes',
    album: 'Vintage Hindi Lounge',
    language: 'Hindi',
    genre: 'Retro Classic',
    duration: 230,
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_bf031e434e.mp3?filename=sweet-piano-11029.mp3',
    isPopular: false,
    lyrics: `Chura liya hai tumne jo dil ko
Nazar nahi churaana sanam
Badalke meri tum zindagani
Kahi badal na jaana sanam...`
  },
  {
    id: 'hindi-6',
    title: 'Apna Bana Le (Unplugged Rain Sessions)',
    artist: 'Arijit & Acoustic Strings',
    album: 'Bhediya Melodies',
    language: 'Hindi',
    genre: 'Romantic',
    duration: 224,
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8828945cf.mp3?filename=acoustic-guitars-ambient-10659.mp3',
    isPopular: true,
    lyrics: `Tu mera koi na hoke bhi kuch laage
Apna bana le mujhe, apna bana le mujhe
Ankhon se chhu le mujhe, chhu le mujhe
Apna bana le mujhe, apna bana le...`
  },
  {
    id: 'hindi-7',
    title: 'Sajjna (Indie Folk Pop)',
    artist: 'Badshah & Jasleen Royal Sessions',
    album: 'Indie Monsoon Hits',
    language: 'Hindi',
    genre: 'Indie Pop',
    duration: 208,
    coverUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_24855479cb.mp3?filename=warm-acoustic-guitar-126290.mp3',
    isPopular: true,
    lyrics: `Mera sajjna ve, sajjna ve
Dil di baatein tujhko sunavaan
Mera sajjna ve, sajjna ve
Raste saare tujh pe gavaan...`
  },
  {
    id: 'hindi-8',
    title: 'Tera Ban Jaunga (Piano Ballad)',
    artist: 'Acoustic Bollywood Lounge',
    album: 'Kabir Singh Melodies',
    language: 'Hindi',
    genre: 'Romantic Ballad',
    duration: 236,
    coverUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c13.mp3?filename=soft-inspiring-piano-116499.mp3',
    isPopular: true,
    lyrics: `Meri raahein tere tak hain
Tujhpe hi toh mera haq hai
Main taan tere naal hi rehna ji
Main taan tera ban jaunga...`
  },
  {
    id: 'hindi-9',
    title: 'Ghar (Acoustic Sunset Beats)',
    artist: 'Bharat Beats & Guitar',
    album: 'Indie Highway',
    language: 'Hindi',
    genre: 'Indie Folk',
    duration: 215,
    coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/21/audio_31362e4939.mp3?filename=acoustic-breeze-10821.mp3',
    isPopular: false,
    lyrics: `Ghar aaja pardesi, dil pukare
Sham dhale jo deep jalaaye
Thandi hawaa mein teri khushboo aaye
Ghar aaja pardesi dil pukare...`
  },
  {
    id: 'hindi-10',
    title: 'Zaalim (Desi Hip Hop & Sitar Fusion)',
    artist: 'Badshah & Beats Collective',
    album: 'Urban Desi 2026',
    language: 'Hindi',
    genre: 'Desi Fusion',
    duration: 192,
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/11/25/audio_946761c944.mp3?filename=calm-instrumental-flute-11880.mp3',
    isPopular: true,
    lyrics: `Zaalim yeh nigaahein teri
Chura le dil mera har ghadi
Desi rhythm pe sitar bajaye
Raat ko bhi dhoop dikhaye...`
  },

  // NEPALI SONGS
  {
    id: 'nepali-1',
    title: 'Resham Firiri (Nepali Mountain Folk)',
    artist: 'Himalayan Folk Ensemble',
    album: 'Heritage of Nepal',
    language: 'Nepali',
    genre: 'Folk Classic',
    duration: 210,
    coverUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8828945cf.mp3?filename=acoustic-guitars-ambient-10659.mp3',
    isPopular: true,
    lyrics: `Resham firiri, resham firiri
Udi jaau bhane bhanjyangma
Bhanjyangma pahaada, resham firiri...

Kukur lai kutai, biralo lai surai
Timi mero maya, sadhai bhari dhyanma...`
  },
  {
    id: 'nepali-2',
    title: 'Kaha Kahan (Kathmandu Acoustic)',
    artist: 'Bipul & Mountain Echoes',
    album: 'Himalaya Chillout',
    language: 'Nepali',
    genre: 'Acoustic Indie',
    duration: 238,
    coverUrl: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_24855479cb.mp3?filename=warm-acoustic-guitar-126290.mp3',
    isPopular: true,
    lyrics: `Kaha kahan khoje timilai
Bataasle sodhdchha mero chhaya
Masta pahaad, sheetal chhaya
Kathmanduko barsaat ma maya...`
  },
  {
    id: 'nepali-3',
    title: 'Simsim Pani Ma (Sarangi Beats)',
    artist: 'Pokhara Acoustic Band',
    album: 'Lakeside Serenade',
    language: 'Nepali',
    genre: 'Folk Fusion',
    duration: 205,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/11/25/audio_946761c944.mp3?filename=calm-instrumental-flute-11880.mp3',
    isPopular: true,
    lyrics: `Simsim pani ma, raato gham lagaa
Sano mero gaau ko, maaya laagaa
Maya le bolayo, Himal ko kaap bhanda
Bato bhari laali guras ko ranga...`
  },
  {
    id: 'nepali-4',
    title: 'Maya (Everest Acoustic Serenade)',
    artist: 'Sujan Chapagain Fan Tributes',
    album: 'Sunsari Strings',
    language: 'Nepali',
    genre: 'Ballad',
    duration: 250,
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c13.mp3?filename=soft-inspiring-piano-116499.mp3',
    isPopular: false,
    lyrics: `Maya timi nai hau mero jeevan ko
Harek chhyan ra dhadkan ko
Udna deu aakash ma hamro maya
Sadhai bhari sath rahane chhaya...`
  },
  {
    id: 'nepali-5',
    title: 'Asare Mahinama (Traditional Madal Beats)',
    artist: 'Nepal Cultural Heritage',
    album: 'Terai & Mountain Rhythms',
    language: 'Nepali',
    genre: 'Traditional',
    duration: 182,
    coverUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/21/audio_31362e4939.mp3?filename=acoustic-breeze-10821.mp3',
    isPopular: false,
    lyrics: `Asare mahinama pani paryo rimjhim
Ropain garne dhaan ko
Madal gungunayo pari pahaad ma
Khushi chhayiyo manma...`
  },
  {
    id: 'nepali-6',
    title: 'Basanta (Kathmandu Spring Melody)',
    artist: 'Sushant KC Tributes',
    album: 'Patale Khet Sessions',
    language: 'Nepali',
    genre: 'Acoustic Pop',
    duration: 228,
    coverUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    isPopular: true,
    lyrics: `Basanta aayo aakash khulyo
Timi bina mero man bhulyo
Kathmanduko firozi hawa ma
Naya umanga bhariyo manma...`
  },
  {
    id: 'nepali-7',
    title: 'Fuleko Laligurans (Himalayan Folk Rhythms)',
    artist: 'Lalitpur Heritage Group',
    album: 'Sounds of Annapurna',
    language: 'Nepali',
    genre: 'Mountain Folk',
    duration: 214,
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=sunset-landscape-10940.mp3',
    isPopular: true,
    lyrics: `Fuleko laligurans pahaada ma
Pahile maya thiyo mero manma
Sarangi gungunayo leka ma
Maya ko jhalko aayo aakha ma...`
  },
  {
    id: 'nepali-8',
    title: 'Saino (Lakeside Pokhara Acoustic)',
    artist: 'Tribal Rain & Friends',
    album: 'Fewa Lake Whispers',
    language: 'Nepali',
    genre: 'Indie Rock/Acoustic',
    duration: 242,
    coverUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=relaxing-light-piano-10831.mp3',
    isPopular: true,
    lyrics: `Saino juriyo hamro aaja
Pahadi feto ma baja baja
Phewatal ma machhapuchhre ko chhaye
Timi ra ma maya ko daaya...`
  },
  {
    id: 'nepali-9',
    title: 'Bipana (Ethereal Night Acoustic)',
    artist: 'Elements Band Fan Tributes',
    album: 'Kaski Sunset Beats',
    language: 'Nepali',
    genre: 'Acoustic Ballad',
    duration: 200,
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f73f11.mp3?filename=in-the-forest-casual-guitar-124996.mp3',
    isPopular: false,
    lyrics: `Sapana hoina yo bipana mero
Maya le bhario sansara mero
Sital jharana ko pani jhai chokho
Harek paila ma chhahi rahane moko...`
  },
  {
    id: 'nepali-10',
    title: 'Aakashai Ma (Traditional Madal & Bansuri)',
    artist: 'Gorkha Cultural Collective',
    album: 'Traditional Nepal 2026',
    language: 'Nepali',
    genre: 'Folk Fusion',
    duration: 210,
    coverUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_bf031e434e.mp3?filename=sweet-piano-11029.mp3',
    isPopular: false,
    lyrics: `Aakashai ma udne chill
Pahadi gaauma maya ko killa
Bansuri ko mitho dhun ma
Khushi chhayiyo harek gaau ma...`
  },

  // INSTRUMENTAL / RELAXING
  {
    id: 'inst-1',
    title: 'Himalayan Morning Breeze',
    artist: 'Adha Sunset Ensemble',
    album: 'Peaceful Meditations',
    language: 'Instrumental',
    genre: 'Meditation',
    duration: 275,
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=inspiring-cinematic-ambient-116199.mp3',
    isPopular: false,
    lyrics: '[Instrumental Track - Enjoy the serene flute and acoustic guitar notes]'
  },

  // LYRIA 3 AI TRACKS
  {
    id: 'lyria-1',
    title: 'Himalayan Starlight Synth',
    artist: 'Lyria 3 AI Studio',
    album: 'Lyria 3 Soundscapes',
    language: 'Lyria 3',
    genre: 'Synthwave & Ambient',
    duration: 210,
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    isPopular: true,
    lyrics: `[Generated with Lyria 3 - lyria-3-pro-preview]
Cinematic synth melodies merging Himalayan mountain breeze with electronic ambient pulses.
Crafted with high fidelity audio streams by Google Lyria 3.`
  },
  {
    id: 'lyria-2',
    title: 'Kathmandu Lo-Fi Dreams',
    artist: 'Lyria 3 AI Studio',
    album: 'Lyria 3 Soundscapes',
    language: 'Lyria 3',
    genre: 'Lo-Fi Chill',
    duration: 198,
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=sunset-landscape-10940.mp3',
    isPopular: true,
    lyrics: `[Generated with Lyria 3 - lyria-3-clip-preview]
Soft lo-fi beats, gentle rain ambience, and warm fender rhodes piano chords.
Designed for studying, relaxation, and late-night focus.`
  },
  {
    id: 'lyria-3',
    title: 'Vedic Flute & Cosmic Strings',
    artist: 'Lyria 3 AI Studio',
    album: 'Lyria 3 Soundscapes',
    language: 'Lyria 3',
    genre: 'Indian Fusion',
    duration: 235,
    coverUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=relaxing-light-piano-10831.mp3',
    isPopular: true,
    lyrics: `[Generated with Lyria 3 - lyria-3-pro-preview]
Traditional bamboo bansuri flute harmonic resonance layered over deep cosmic pad strings and acoustic drone.`
  },
  {
    id: 'lyria-4',
    title: 'Everest Dawn Acoustic',
    artist: 'Lyria 3 AI Studio',
    album: 'Lyria 3 Soundscapes',
    language: 'Lyria 3',
    genre: 'Acoustic Folk',
    duration: 185,
    coverUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f73f11.mp3?filename=in-the-forest-casual-guitar-124996.mp3',
    isPopular: false,
    lyrics: `[Generated with Lyria 3 - lyria-3-clip-preview]
Bright fingerpicked acoustic guitar with subtle mountain wind percussion and organic string textures.`
  },
  {
    id: 'lyria-5',
    title: 'Bollywood Cyber Rhapsody',
    artist: 'Lyria 3 AI Studio',
    album: 'Lyria 3 Soundscapes',
    language: 'Lyria 3',
    genre: 'Electro Bollywood',
    duration: 220,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_bf031e434e.mp3?filename=sweet-piano-11029.mp3',
    isPopular: true,
    lyrics: `[Generated with Lyria 3 - lyria-3-pro-preview]
Futuristic electronic tabla rhythms blended with energetic synth basslines and orchestral brass swells.`
  },
  {
    id: 'lyria-6',
    title: 'Deep Zen Meditation 432Hz',
    artist: 'Lyria 3 AI Studio',
    album: 'Lyria 3 Soundscapes',
    language: 'Lyria 3',
    genre: 'Meditation',
    duration: 260,
    coverUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=inspiring-cinematic-ambient-116199.mp3',
    isPopular: false,
    lyrics: `[Generated with Lyria 3 - lyria-3-clip-preview]
Ultra-relaxing 432Hz harmonic ambient soundscape for deep sleep, mindfulness, and transcendental meditation.`
  }
];
