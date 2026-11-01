import type { Bi } from '@/content/clinic';
export type Lang = 'en' | 'ur';
// Static UI strings. Move to the CMS later if non-developers need to edit them.
export const ui = {
  home: { en: 'Home', ur: 'ہوم' }, services: { en: 'Services', ur: 'خدمات' },
  team: { en: 'Team', ur: 'ہماری ٹیم' }, contact: { en: 'Contact', ur: 'رابطہ' },
  heroTitle: { en: 'Expert orthopaedic care to keep life moving', ur: 'ماہر آرتھوپیڈک نگہداشت، تاکہ زندگی رواں دواں رہے' },
  heroSub: { en: 'Custom braces, prosthetics and orthotic solutions, made with care for patients across South Punjab.', ur: 'جنوبی پنجاب کے مریضوں کے لیے محبت سے تیار کردہ بریسز، مصنوعی اعضاء اور آرتھوٹک حل۔' },
  heroCta: { en: 'Book an appointment', ur: 'اپائنٹمنٹ لیں' },
  heroCta2: { en: 'Our services', ur: 'ہماری خدمات' },
  servicesSub: { en: 'Tap a service to learn more.', ur: 'مزید جاننے کے لیے سروس پر ٹیپ کریں۔' },
  teamSub: { en: 'Experienced professionals dedicated to your mobility.', ur: 'آپ کی نقل و حرکت کے لیے وقف تجربہ کار ماہرین۔' },
  call: { en: 'Call us', ur: 'کال کریں' }, message: { en: 'Drop a message', ur: 'پیغام بھیجیں' },
  whatsapp: { en: 'Chat on WhatsApp', ur: 'واٹس ایپ پر بات کریں' },
  waMsg: { en: 'Hello South Punjab Ortho Care Center, I would like to inquire about an appointment.', ur: 'السلام علیکم، میں اپائنٹمنٹ کے بارے میں معلومات لینا چاہتا/چاہتی ہوں۔' },
  schedule: { en: 'Opening hours', ur: 'اوقاتِ کار' }, rights: { en: 'All rights reserved.', ur: 'جملہ حقوق محفوظ ہیں۔' },
  contactUs: { en: 'Contact us', ur: 'رابطہ کریں' }, top: { en: 'Back to top', ur: 'اوپر جائیں' },
  msgPlaceholder: { en: 'Write your message…', ur: 'اپنا پیغام لکھیں…' },
  msgHint: { en: 'Tap the link below to send your message on WhatsApp.', ur: 'اپنا پیغام واٹس ایپ پر بھیجنے کے لیے نیچے دیے گئے لنک پر ٹیپ کریں۔' },
  directions: { en: 'Get directions', ur: 'راستہ دیکھیں' },  jummah: { en: 'Friday break for Jummah: 1:00 PM – 3:00 PM', ur: 'جمعہ کو نماز جمعہ کا وقفہ: دوپہر 1 تا 3 بجے' },
  openMap: { en: 'Open in Google Maps', ur: 'گوگل میپس میں کھولیں' },
  imgSoon: { en: 'Photo coming soon', ur: 'تصویر جلد آ رہی ہے' },
  updates: { en: 'Latest Updates', ur: 'تازہ ترین اطلاعات' },
  theme: { en: 'Toggle dark mode', ur: 'ڈارک موڈ بدلیں' }, switchTo: { en: 'اردو', ur: 'English' },
} satisfies Record<string, Bi>;
