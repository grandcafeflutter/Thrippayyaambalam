export type FestivalHighlight = {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const FESTIVAL_HIGHLIGHTS: FestivalHighlight[] = [
  {
    id: 'maha-shivaratri',
    name: 'Maha Shivaratri',
    description:
      'The main festival celebrated in the temple. Cultural and musical programmes are held in the temple premises, and many thousands of oil lamps are lit during the festival.',
    image: 'https://images.pexels.com/photos/34899896/pexels-photo-34899896.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Brass oil lamps lit for the Shivaratri festival',
  },
  {
    id: 'shivarathri-bali-tharpanam',
    name: 'Shivarathri Bali Tharpanam',
    description:
      'A sacred Hindu ritual performed on the occasion of Maha Shivaratri to offer prayers and pay respects to departed ancestors, seeking peace for their souls and well-being for the family.',
    image: 'https://images.pexels.com/photos/2566641/pexels-photo-2566641.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Devotees performing an offering ritual with lamps and flowers',
  },
  {
    id: 'thiruvathira-mahotsavam',
    name: 'Thiruvathira Mahotsavam',
    description:
      'A traditional, women-centric festival celebrated in Kerala during the Malayalam month of Dhanu (December to January). It marks the birthday of Lord Shiva and commemorates his union with Goddess Parvati.',
    image: 'https://images.pexels.com/photos/32455915/pexels-photo-32455915.png?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Woman in traditional South Indian attire',
  },
  {
    id: 'prasadhamoottu',
    name: 'Prasadhamoottu',
    description:
      'A traditional Kerala temple offering where a vegetarian meal is served to devotees after it has been offered to the deity. Served on banana leaves with rice, curries and payasam, it reflects sharing and community service.',
    image: 'https://images.pexels.com/photos/11638817/pexels-photo-11638817.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Rice and curries served on a banana leaf',
  },
  {
    id: 'thiruvulsavam',
    name: 'Thiruvulsavam',
    description:
      'The auspicious annual temple festival at Thrippayya Thrimoorthy Temple, celebrated with special poojas, religious rituals, cultural programmes and festive celebrations that preserve the temple’s heritage.',
    image: 'https://images.pexels.com/photos/31008400/pexels-photo-31008400.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Decorated elephant during the temple festival',
  },
  {
    id: 'vinayaka-chathurthi',
    name: 'Vinayaka Chathurthi',
    description:
      'A sacred festival celebrating the birth of Lord Ganesha, the remover of obstacles and god of wisdom and prosperity. Devotees offer poojas and modakams seeking success, happiness and prosperity.',
    image: 'https://images.pexels.com/photos/39524658/pexels-photo-39524658.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Ganesha idol decorated with flowers',
  },
  {
    id: 'aayilya-naagapooja',
    name: 'Aayilya Naagapooja',
    description:
      'A sacred ritual dedicated to the serpent deities (Naga Devathas), performed on the auspicious Aayilyam star day. Devotees seek blessings for family well-being, prosperity and relief from Naga doshas.',
    image: 'https://images.pexels.com/photos/36987998/pexels-photo-36987998.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Stone naga sculptures guarding a staircase',
  },
  {
    id: 'navarathri',
    name: 'Navarathri',
    description:
      'A sacred nine-day festival dedicated to Goddess Durga and her divine forms, celebrated with special poojas, devotional songs and cultural programmes for strength, wisdom and prosperity.',
    image: 'https://images.pexels.com/photos/32575458/pexels-photo-32575458.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Idol of Goddess Durga with festive decorations',
  },
];

export type FestivalCalendarEntry = {
  date: string;
  event: string;
};

const ATTHAM_PRASADOOTTU = 'Attham Prasadoottu, Narayaniya Parayanam';

export const FESTIVAL_CALENDAR_2026: FestivalCalendarEntry[] = [
  { date: 'Jan 2', event: 'Thiruvathira Mahotsavam, Umamaheshwara Pooja, Nedumangalya Pooja' },
  { date: 'Jan 10', event: ATTHAM_PRASADOOTTU },
  { date: 'Jan 15', event: 'Mandalamahotsavam Samapanam, Sasthavinu Pratyeka Abhishekam' },
  { date: 'Feb 6', event: ATTHAM_PRASADOOTTU },
  { date: 'Feb 15', event: 'Shivaratri Mahotsavam' },
  { date: 'Feb 16', event: 'Shivaratri Bali Tharpanam' },
  { date: 'Mar 6', event: ATTHAM_PRASADOOTTU },
  { date: 'Apr 2', event: `Prathishtadinacharanam, ${ATTHAM_PRASADOOTTU}` },
  { date: 'Apr 15', event: 'Vishukkani' },
  { date: 'Apr 16', event: 'Thiruvulsavam Golden Jubilee Celebration, Samapana Sammelanam' },
  { date: 'Apr 17', event: 'Thiruvulsavam Kodiyettam' },
  { date: 'Apr 18', event: 'Thiruvulsavam First Day, Utsavabali' },
  { date: 'Apr 19', event: 'Thiruvulsavam Second Day' },
  { date: 'Apr 20', event: 'Thiruvulsavam Valiya Vilakku' },
  { date: 'Apr 21', event: 'Thiruvulsavam Pallivetta' },
  { date: 'Apr 22', event: 'Thiruvulsavam Aaraattu' },
  { date: 'Apr 29', event: ATTHAM_PRASADOOTTU },
  { date: 'May 26', event: ATTHAM_PRASADOOTTU },
  { date: 'Jun 23', event: ATTHAM_PRASADOOTTU },
  { date: 'Jul 19', event: 'Oushadhakanji Vitharanam' },
  { date: 'Jul 26', event: 'Sukrutahomam' },
  { date: 'Aug 16', event: `Illamnira, ${ATTHAM_PRASADOOTTU}` },
  { date: 'Aug 17', event: 'Thripputhari' },
  { date: 'Sep 13', event: ATTHAM_PRASADOOTTU },
  { date: 'Sep 14', event: 'Vinayaka Chathurthi, Ashtadravya Mahaganapathi Homam' },
  { date: 'Oct 6', event: 'Aayilya Naagapooja, Palabhishekam' },
  { date: 'Oct 10', event: ATTHAM_PRASADOOTTU },
  { date: 'Oct 11', event: 'Navarathri Aarambham, Saraswathi Pooja' },
  { date: 'Oct 18', event: 'Pujaveppu' },
  { date: 'Oct 19', event: 'Durgashtami' },
  { date: 'Oct 20', event: 'Mahanavami' },
  { date: 'Oct 21', event: 'Vijayadashami, Vidyarambham' },
  { date: 'Nov 6', event: ATTHAM_PRASADOOTTU },
  { date: 'Nov 17', event: 'Mandalamahotsavam Aarambham' },
  { date: 'Dec 4', event: ATTHAM_PRASADOOTTU },
  { date: 'Dec 23', event: 'Thiruvathira Mahotsavam' },
  { date: 'Dec 24', event: 'Thiruvathira Umamaheshwara Pooja, Nedumangalya Pooja' },
  { date: 'Dec 31', event: ATTHAM_PRASADOOTTU },
];
