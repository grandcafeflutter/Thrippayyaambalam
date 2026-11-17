export const TEMPLE_NAME = 'Thrippayya Thrimoorthi Temple';

export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/history', label: 'History' },
  { href: '/pooja', label: 'Pooja' },
  { href: '/worship', label: 'Worship' },
  { href: '/administration', label: 'Administration' },
  { href: '/festival', label: 'Festival' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact us' },
] as const;

export const ABOUT_TEXT =
  'Thripaya Trimurti Temple is one among the rare temples in the world where the Trimurti sit in one pedestal in one sanctum sanctorum. With Brahma on the left, Shiva in the centre and Vishnu in the right, the Hindu triad representing the three primal aspects of Parabrahma (Almighty God), Creation-Destruction-Preservation.';

export const DARSHAN_TIMINGS = [
  { period: 'Morning', time: '5:30 AM to 10:00 AM' },
  { period: 'Evening', time: '5:30 PM to 7:30 PM' },
] as const;

export const FESTIVALS = [
  {
    id: 'utsavam',
    name: 'Annual Festival (Utsavam)',
    date: 'Mar 10 to Mar 17',
    description:
      'The temple’s grand annual festival, celebrated over eight days with processions, traditional music and community meals.',
    image: 'https://images.pexels.com/photos/31008400/pexels-photo-31008400.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Decorated elephant at a temple festival procession',
  },
  {
    id: 'deepotsavam',
    name: 'Deepotsavam',
    date: 'Nov 26',
    description:
      'The festival of lamps. Thousands of brass lamps are lit around the shrine and courtyard as devotees offer prayers after dusk.',
    image: 'https://images.pexels.com/photos/34899896/pexels-photo-34899896.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Brass oil lamps lit for a traditional ceremony',
  },
  {
    id: 'poornima',
    name: 'Special Pooja',
    date: 'Every Poornima',
    description:
      'A special pooja is performed on every full moon day, with abhishekam and archana offered to the Trimurti.',
    image: 'https://images.pexels.com/photos/8818665/pexels-photo-8818665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Floral offerings with marigolds and diyas',
  },
] as const;

export const WORSHIP_STEPS = [
  {
    title: 'Enter the East Nadappura',
    text: 'The Darshan (auspicious sight) of Thrimoorthy — the Divine Trinity of Brahma, Maheshwara and Vishnu — begins through the East Nadappura (East Pavilion).',
  },
  {
    title: 'Pass the Valiya Balikkallu',
    text: 'At the East Nadappura, proceed through the south side of the Valiya Balikkallu (Big Altar Stone) to enter the Chuttambalam (sacred enclosure around the shrine).',
  },
  {
    title: 'Bow at the Namaskara Mandapam',
    text: 'Stand in front of the Namaskara Mandapam (Pavilion meant for prostration by priests) and bow down to Thrimoorthy.',
  },
  {
    title: 'Stand Between the Pavilions',
    text: 'Proceed through the south side, stand in between the Namaskara Mandapam and the Sreekovil (Sanctum Sanctorum). Position yourself sideways and offer prayers to Thrimoorthy.',
  },
  {
    title: 'Pray to Lord Ganesha',
    text: "Step back, walk towards Lord Ganesha and pray to the deity. Circumambulation may now be undertaken, ensuring that the line of altar stones is always to one's right side.",
  },
  {
    title: 'Bow at the Homakundam',
    text: 'Bow down to the Homakundam (fire altar) located on the south side. At the lamp behind the Sreekovil, invoke Goddess Parvati and offer your devotion.',
  },
  {
    title: 'Awaken the Bhuta Ganangal',
    text: 'Proceed to the north side, stop at the water spout, look up towards the Thazhikakudam (sacred finial), awaken the Bhuta Ganangal (divine ghostly attendants of Lord Shiva) by clapping hands, and pay respects to them.',
  },
  {
    title: 'Walk to the Nirmalyadhari',
    text: "Turn right, walk against the circumambulatory path all the way until the Namaskara Mandapam and proceed through its east side to the water spout where the Nirmalyadhari (minor deity who receives the remainder after the main deity's offerings) resides. Look towards the Thazhikakudam and bow down.",
  },
  {
    title: 'Offer Prayers at Sreekovil',
    text: 'Turn back, walk towards the Sreekovil, keep to the side, and offer prayers to Thrimoorthy. Next, bow down to deity Nandikeshan.',
  },
  {
    title: 'Retreat from the Namaskara Mandapam',
    text: 'Proceed to the front of the Namaskara Mandapam. Try to retreat without turning back as far as possible before stepping out. Next, walk out through the north of Balikkal pura (Altar Stone chamber) and bow down to the Kodimaram (flag staff).',
  },
  {
    title: 'Final Prayer from East',
    text: 'From the east side of the Kodimaram, pray to Thrimoorthy once again.',
  },
  {
    title: 'Pray to Lord Shastha & Ganesha',
    text: 'As part of the circumambulation, offer prayers to Lord Shastha consecrated on the south-west side and to Lord Ganesha behind Shastha.',
  },
  {
    title: 'Offer Devotions to the Serpent Deities',
    text: 'Offer devotions to Nagadevathakal (serpent deities) and Brahmarakshasushakal (supernatural deities) consecrated on the north-east side of the temple.',
  },
  {
    title: 'Complete the Circumambulation',
    text: 'Proceed to the East Nadappura to finish the circumambulation. Additional circumambulations may be done — once inside the Chuttambalam and the rest outside on the stone pathway.',
  },
  {
    title: 'Important Guidelines',
    text: 'Never circumambulate through the paths between Thrimoorthy and the Valiya Balikkallu or between Thrimoorthy and the Namaskara Mandapam. Never stand straight in front of the Sreekovil to pray.',
  },
  {
    title: 'Receive Prasadam & Nivedyam',
    text: 'Finish Darshan to receive Prasadam and Nivedyam (holy offerings). Follow this order of worship for a peaceful, holistic and effective spiritual experience.',
  },
] as const;

export const ADMIN_ROLES = [
  {
    title: 'President',
    description:
      'Leads the temple committee, presides over administrative decisions and represents the temple in public matters.',
  },
  {
    title: 'Secretary',
    description:
      'Maintains the official records, manages correspondence and coordinates the day-to-day running of the temple.',
  },
  {
    title: 'Treasurer',
    description:
      'Oversees donations, accounts and the upkeep budget, with transparent reporting to the devotees.',
  },
  {
    title: 'Head Priest (Thantri)',
    description:
      "Guides the rituals and ensures the poojas and festivals are performed according to the temple’s traditions.",
  },
] as const;

export const GALLERY_IMAGES = [
  {
    src: 'https://images.pexels.com/photos/31376426/pexels-photo-31376426.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Temple with intricate wooden architecture',
    caption: 'Traditional temple architecture',
  },
  {
    src: 'https://images.pexels.com/photos/31008400/pexels-photo-31008400.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Decorated elephants at a festival',
    caption: 'Festival procession',
  },
  {
    src: 'https://images.pexels.com/photos/34130617/pexels-photo-34130617.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Drummers in traditional attire',
    caption: 'Temple drummers',
  },
  {
    src: 'https://images.pexels.com/photos/36564694/pexels-photo-36564694.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Butter lamps burning in a traditional setting',
    caption: 'Evening lamps',
  },
  {
    src: 'https://images.pexels.com/photos/8818665/pexels-photo-8818665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Floral rangoli with marigold petals',
    caption: 'Floral offerings',
  },
  {
    src: 'https://images.pexels.com/photos/32316805/pexels-photo-32316805.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Elephant adorned for a festive procession',
    caption: 'Procession with the crowd',
  },
  {
    src: 'https://images.pexels.com/photos/34415609/pexels-photo-34415609.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Stone pillars in an ancient temple courtyard',
    caption: 'Temple courtyard',
  },
  {
    src: 'https://images.pexels.com/photos/13944315/pexels-photo-13944315.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Floral arrangement with marigolds, roses and diyas',
    caption: 'Ritual flower arrangement',
  },
] as const;

export const HERO_IMAGE =
  'https://images.pexels.com/photos/31376426/pexels-photo-31376426.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export const ABOUT_IMAGE =
  'https://images.pexels.com/photos/37355468/pexels-photo-37355468.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export const ORDER_OF_WORSHIP_IMAGE =
  'https://images.pexels.com/photos/14647083/pexels-photo-14647083.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export const TEMPLE_CONTACT = {
  address: 'Thrippayya, Kerala, India',
  phone: '+91 00000 00000',
  email: 'info@thrippayyatemple.org',
} as const;
