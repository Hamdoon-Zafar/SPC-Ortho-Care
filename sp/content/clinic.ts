// LOCAL FALLBACK CONTENT. The live site reads from Sanity (lib/content.ts); this file is only used when Sanity is
// not configured, unreachable or empty, and it is the source for scripts/seed-data.json (one-time migration).
// Once your Sanity data is verified you can empty this file down to the types below.
export type Bi = { en: string; ur: string };
/** Responsive image: `src` is the default file, `srcSet` lets phones download a smaller one. */
export type Img = { src: string; srcSet?: string };
export type Service = { id: string; name: Bi; desc: Bi; image?: Img; thumb?: string };
export type Doctor = { id: string; name: Bi; title: Bi; role: Bi; bio: Bi; tags: Bi[]; qualifications?: Bi; photo?: Img };
export type Contact = { name: Bi; role: Bi; phone: string; display: string };
export type Hours = { day: Bi; open: Bi };
export type Clinic = {
  name: string; address: Bi; street: string; city: string; postalCode: string; mapQuery: string; mapsUrl?: string; mapEmbedSrc?: string; whatsapp: string; contacts: Contact[]; hours: Hours[]; homeService: Bi; social?: { facebook?: string; instagram?: string };
  schemaHours: { days: string[]; opens: string; closes: string }[];
};

const ALL = { en: '11:00 AM – 10:00 PM', ur: 'صبح 11 تا رات 10' };
export const clinic: Clinic = {
  name: 'South Punjab Ortho Care Center',
  address: { en: 'Suraj Miani Road, Chungi No.1, Multan, 59070, Pakistan', ur: 'سورج میانی روڈ، چونگی نمبر 1، ملتان، 59070، پاکستان' },
  street: 'Suraj Miani Road, Chungi No.1', city: 'Multan', postalCode: '59070',
  mapQuery: 'South Punjab OPD Clinic, Suraj Miani Road, Chungi No.1, Multan, 59070, Pakistan',
  mapsUrl: 'https://maps.app.goo.gl/amV1ZVqWT7ozSJrU8',
  // INPUT NEEDED (optional): paste the src="..." address from Google Maps > Share > Embed a map. Leave undefined to use the address search.
  mapEmbedSrc: undefined,
  whatsapp: '923324306761', // international format, digits only
  contacts: [
    { name: { en: 'Primary Line', ur: 'مرکزی نمبر' }, role: { en: 'Appointments', ur: 'اپائنٹمنٹ' }, phone: '+923110015200', display: '+92 311 0015200' },
    { name: { en: 'Inquiries', ur: 'معلومات' }, role: { en: 'General inquiries', ur: 'عمومی معلومات' }, phone: '+923324306671', display: '+92 332 4306671' },
    { name: { en: 'Alternative Line', ur: 'متبادل نمبر' }, role: { en: 'Backup contact', ur: 'متبادل رابطہ' }, phone: '+923092803355', display: '+92 309 2803355' },
  ],
  hours: [
    { day: { en: 'Monday', ur: 'پیر' }, open: ALL },
    { day: { en: 'Tuesday', ur: 'منگل' }, open: ALL },
    { day: { en: 'Wednesday', ur: 'بدھ' }, open: ALL },
    { day: { en: 'Thursday', ur: 'جمعرات' }, open: ALL },
    { day: { en: 'Friday', ur: 'جمعہ' }, open: { en: '11:00 AM – 1:00 PM\n3:00 PM – 10:00 PM', ur: 'صبح 11 تا دوپہر 1\nسہ پہر 3 تا رات 10' } },
    { day: { en: 'Saturday', ur: 'ہفتہ' }, open: ALL },
    { day: { en: 'Sunday', ur: 'اتوار' }, open: ALL },
  ],
  homeService: { en: 'Home service available. Appointment is mandatory.', ur: 'ہوم سروس دستیاب ہے۔ اپائنٹمنٹ لازمی ہے۔' },
  schemaHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'], opens: '11:00', closes: '22:00' },
    { days: ['Friday'], opens: '11:00', closes: '13:00' }, // Jummah break 13:00-15:00
    { days: ['Friday'], opens: '15:00', closes: '22:00' },
  ],
  social: { facebook: 'https://www.facebook.com/profile.php?id=61595513341466' },
};

export const team: Doctor[] = [
  {
    id: 'lead',
    name: { en: 'Chaudhary Abuzar Akram', ur: 'چوہدری ابوذر اکرم' },
    title: { en: 'Our Team Lead', ur: 'ہمارے ٹیم لیڈ' },
    role: { en: 'Orthosis & Prosthetic Specialist', ur: 'آرتھوسس و پروسٹھیٹک اسپیشلسٹ' },
    bio: {
      en: 'Chaudhary Abuzar Akram leads our clinic with a commitment to precise, comfortable and durable orthotic and prosthetic care. He personally oversees assessment, fitting and follow-up, so every patient leaves with a device made for them and the confidence to move freely.',
      ur: 'چوہدری ابوذر اکرم ہمارے کلینک کی قیادت کرتے ہیں، جہاں درست، آرام دہ اور پائیدار آرتھوٹک و پروسٹھیٹک نگہداشت اولین ترجیح ہے۔ معائنہ، فٹنگ اور فالو اپ وہ خود دیکھتے ہیں تاکہ ہر مریض کو اس کے مطابق بنا آلہ اور آزادانہ چلنے کا اعتماد ملے۔',
    },
    tags: [
      { en: 'Artificial Limbs', ur: 'مصنوعی اعضاء' }, { en: 'Braces & Orthoses', ur: 'بریسز و آرتھوسس' },
      { en: 'Custom Fitting', ur: 'ناپ کے مطابق فٹنگ' }, { en: 'Home Service', ur: 'ہوم سروس' },
    ],
    photo: { src: '/team/abuzar.webp' },
  },
];

const s = (id: string, en: string, ur: string, den: string, dur: string): Service => ({ id, name: { en, ur }, desc: { en: den, ur: dur } });
const baseServices: Service[] = [
  s('db-shoes', 'DB Shoes', 'ڈی بی شوز', 'Shoes fixed to a Denis Browne bar that hold a child\'s feet in the correct position. Commonly used after clubfoot correction to help keep the result.', 'ڈینس براؤن بار والے جوتے جو بچے کے پاؤں کو درست پوزیشن میں رکھتے ہیں۔ عام طور پر کلب فُٹ کی درستی کے بعد نتیجہ برقرار رکھنے کے لیے استعمال ہوتے ہیں۔'),
  s('hand-splint', 'Hand Splint', 'ہینڈ اسپلنٹ', 'A custom-fitted support for the hand, wrist or fingers. It rests the joint, eases pain and protects healing after injury or surgery.', 'ہاتھ، کلائی یا انگلیوں کے لیے ناپ کے مطابق سہارا۔ یہ جوڑ کو آرام دیتا ہے، درد کم کرتا ہے اور چوٹ یا آپریشن کے بعد حفاظت کرتا ہے۔'),
  s('hallux-valgus', 'Hallux Valgus Splint', 'ہیلکس ویلگس اسپلنٹ', 'A splint that supports the big toe in a better alignment. It helps relieve bunion pressure and discomfort, and is often worn at night.', 'یہ اسپلنٹ پاؤں کے انگوٹھے کو بہتر سمت میں رکھتا ہے۔ بنیئن کے دباؤ اور تکلیف میں آرام دیتا ہے اور اکثر رات کو پہنا جاتا ہے۔'),
  s('ptb-brace', 'PTB Brace', 'پی ٹی بی بریس', 'A patellar-tendon-bearing brace that shares body weight through the knee area. It protects the lower leg while fractures or injuries heal.', 'گھٹنے کے ٹینڈن سے وزن بانٹنے والا بریس۔ پنڈلی کی ہڈی ٹوٹنے یا چوٹ کے ٹھیک ہونے کے دوران ٹانگ کو محفوظ رکھتا ہے۔'),
  s('prosthetic-gloves', 'Prosthetic Gloves', 'پروسٹھیٹک گلوز', 'Life-like covers for prosthetic hands, matched to skin tone. They protect the device and give a natural, confident appearance.', 'مصنوعی ہاتھ کے لیے جلد کے رنگ سے ملتے جلتے قدرتی غلاف۔ یہ آلے کی حفاظت کرتے ہیں اور قدرتی اور پُراعتماد ظاہری شکل دیتے ہیں۔'),
  s('silicone-insole', 'Silicone Foot / Full Insole', 'سلیکون فُٹ / فُل انسول', 'Soft silicone insoles that cushion the foot and spread pressure evenly. Useful for heel or arch discomfort and for added comfort when walking.', 'نرم سلیکون انسول جو پاؤں کو گدی دیتے ہیں اور دباؤ کو برابر تقسیم کرتے ہیں۔ ایڑی یا آرچ کی تکلیف اور چلنے میں آرام کے لیے مفید ہیں۔'),
  s('hip-abduction', 'Hip Abduction Brace', 'ہپ ایبڈکشن بریس', 'Keeps the hips gently apart in a safe position. Used after hip surgery or for infants and children with hip instability.', 'کولہوں کو محفوظ پوزیشن میں ہلکا سا کھلا رکھتا ہے۔ کولہے کے آپریشن کے بعد یا بچوں میں کولہے کی کمزوری کے لیے استعمال ہوتا ہے۔'),
  s('ak-leg', 'AK Leg (Above Knee)', 'اے کے لیگ (گھٹنے سے اوپر)', 'A custom prosthetic leg for amputation above the knee, with socket, knee joint and foot. Built to help you stand and walk comfortably.', 'گھٹنے سے اوپر کٹاؤ کے لیے ناپ کے مطابق مصنوعی ٹانگ، جس میں ساکٹ، گھٹنے کا جوڑ اور پاؤں شامل ہیں۔ آرام سے کھڑے ہونے اور چلنے میں مدد دیتی ہے۔'),
  s('bk-leg', 'BK Leg (Below Knee)', 'بی کے لیگ (گھٹنے سے نیچے)', 'A prosthetic leg for amputation below the knee that keeps your natural knee moving. The socket is shaped to your limb for a secure, comfortable fit.', 'گھٹنے سے نیچے کٹاؤ کے لیے مصنوعی ٹانگ جو قدرتی گھٹنے کی حرکت برقرار رکھتی ہے۔ ساکٹ آپ کے عضو کے مطابق بنایا جاتا ہے۔'),
  s('hkafo', 'HKAFO', 'ایچ کے اے ایف او', 'A hip-knee-ankle-foot orthosis that supports the whole leg and hip. Helps people with significant weakness to stand and move more safely.', 'کولہے، گھٹنے، ٹخنے اور پاؤں کو سہارا دینے والا آرتھوسس۔ شدید کمزوری والے مریضوں کو زیادہ محفوظ طریقے سے کھڑے ہونے اور حرکت کرنے میں مدد دیتا ہے۔'),
  s('kafo', 'KAFO', 'کے اے ایف او', 'A knee-ankle-foot orthosis that stabilises the knee and ankle together. Supports standing and walking when leg muscles are weak.', 'گھٹنے اور ٹخنے کو ایک ساتھ مستحکم کرنے والا آرتھوسس۔ ٹانگ کے پٹھے کمزور ہونے پر کھڑے ہونے اور چلنے میں سہارا دیتا ہے۔'),
  s('afo', 'AAFO / AFO', 'اے اے ایف او / اے ایف او', 'An ankle-foot orthosis that supports the ankle and lifts the foot. Commonly prescribed for foot drop and ankle instability to improve walking.', 'ٹخنے کو سہارا دینے اور پاؤں کو اٹھانے والا آرتھوسس۔ فُٹ ڈراپ اور ٹخنے کی کمزوری میں چال بہتر بنانے کے لیے تجویز کیا جاتا ہے۔'),
  s('double-shell', 'Double Shell Long Leg Brace', 'ڈبل شیل لانگ لیگ بریس', 'A two-part shell brace running from thigh to foot. Gives firm, even support to keep the leg stable and protected.', 'ران سے پاؤں تک دو حصوں پر مشتمل بریس۔ ٹانگ کو مضبوط اور یکساں سہارا دے کر مستحکم اور محفوظ رکھتا ہے۔'),
  s('dfo', 'DFO', 'ڈی ایف او', 'A foot orthosis made to support and position the foot correctly. Helps improve comfort and walking when prescribed.', 'پاؤں کو درست پوزیشن میں رکھنے اور سہارا دینے کے لیے بنایا گیا آرتھوسس۔ تجویز کیے جانے پر آرام اور چال بہتر بنانے میں مدد دیتا ہے۔'),
  s('humerus-brace', 'Humerus Brace', 'ہیومرس بریس', 'A supportive sleeve that stabilises a fractured upper-arm bone. It holds the bone in place while still allowing safe elbow and shoulder movement.', 'اوپری بازو کی ٹوٹی ہڈی کو سہارا دینے والا بریس۔ ہڈی کو اپنی جگہ رکھتا ہے جبکہ کہنی اور کندھے کو محفوظ حرکت کی اجازت دیتا ہے۔'),
  s('spinal-jacket', 'Spinal Jacket', 'اسپائنل جیکٹ', 'A custom-moulded jacket that supports and limits movement of the spine. Used for spinal conditions, fractures or recovery after surgery.', 'ریڑھ کی ہڈی کو سہارا دینے اور حرکت محدود کرنے والی ناپ کے مطابق جیکٹ۔ ریڑھ کے مسائل، فریکچر یا آپریشن کے بعد استعمال ہوتی ہے۔'),
  s('thigh-brace', 'Thigh Brace', 'تھائی بریس', 'A brace that supports and protects the thigh. Helps during recovery from muscle injuries or thigh-bone problems.', 'ران کو سہارا اور تحفظ دینے والا بریس۔ پٹھوں کی چوٹ یا ران کی ہڈی کے مسائل سے صحت یابی میں مدد دیتا ہے۔'),
];

// Local fallback photos follow one naming rule: /public/services/<id>.webp (16:9) and /public/services/thumb/<id>.webp (square).
export const services: Service[] = baseServices.map((s) => ({
  ...s,
  image: { src: `/services/${s.id}.webp` },
  thumb: `/services/thumb/${s.id}.webp`,
}));
