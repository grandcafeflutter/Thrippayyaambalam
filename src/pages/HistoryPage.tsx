const chapters = [
  { id: 'origin', title: 'Ancient Origin', text: 'This ancient temple comes under the collective ownership of ritual rights of Nakaramannu, Kavanad, Nandyarvalli and Ponallur families that once constituted the governance of Irinjalakuda Gramam (village) of ancient Kerala.' },
  { id: 'sage', title: 'The Sage and the Sanctum', text: 'The saga of the world-famous Irinjalakuda Sree Koodalmanikyam Temple finds its continuity in Thrippayya Temple. A divine Brahmin, who was also an eminent Tantrika, summons divine life-force into a conch after having visited almost all major South Indian temples. As part of his pilgrimage, he then reaches Sree Koodalmanikyam Temple. In front of the Sanctum Sanctorum, however, the conch falls and shatters into pieces. All the divine life-force lingers in the sanctum.' },
  { id: 'revelation', title: 'The Divine Revelation', text: 'The Brahmin in anguish departs and sets off to the South, aiming to visit Kodungalluramma (Mother Goddess of Kodungallur). As he walks meditating upon the divine consciousness of the universe, the holy trinity of Brahma, Vishnu and Maheshwara appears in front of him and shows themselves upon him. The spot where this incident took place is Thrippayya Thrimoorthy Temple.' },
  { id: 'anasooya', title: 'The Story of Sathy Anasooya', text: "It is to the ancient history of Sathy Anasooya that the presence of female deities of the temple is linked. To test her chastity, Thrimoorthy arrives at Anasooya's hermitage in the guise of ascetics. She hosts them as per the customs. They ask for food. Along with it, one demand is that she should serve them in the nude. She realises the trickery. Using the power of her chastity, she turns the Thrimoorthy into infants. She feeds them her sweet breastmilk to satiate them. The Gods become happy and bless her. The place where the Thrimoorthy were turned into infants is Thrippayya (Thripayanam)." },
  { id: 'worship', title: 'Deities and Worship', text: 'Maheshwara is in the center, on his right Brahma and Vishnu to his left. This is the order of consecration. Although the worshipping rules, customs and rituals are structured placing Maheshwara as the principal deity amongst the three Gods, all the rituals are separately conducted for all three deities. Ganapathy and Sastha are the sub deities. Saraswathy, Parvathy and Lakshmi are also considered to be present. Naagas and Brahmarakshas are also consecrated within the premises.' },
] as const;

const indexItems = [
  { id: 'trinity', label: 'The Divine Trinity' },
  ...chapters.map(({ id, title }) => ({ id, label: title })),
];

export default function HistoryPage() {
  return (
    <>
      <section className="relative isolate min-h-[50vh] overflow-hidden bg-primary-900 text-neutral-50">
        <img src="https://coovcplsijznkdytdyqh.supabase.co/storage/v1/object/public/site-media/cms/temple-cms-home-hero-images/2e1a4a7c-60b5-40c4-925f-85f5a49392e3.webp" alt="Sree Thrippayya Thrimoorthy Temple" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-900 via-primary-900/80 to-primary-900/20" />
        <div className="mx-auto flex min-h-[50vh] max-w-[1400px] items-center">
          <div className="flex flex-col items-start px-4 py-20 sm:px-6 lg:px-8">
            <h1 className="mt-5 max-w-xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-neutral-50 sm:text-6xl lg:text-7xl">History of<br />the Temple</h1>
            <p className="mt-6 max-w-md text-base leading-7 text-primary-100 sm:text-lg">The legend, heritage and glorious past of Sree Thrippayya Thrimoorthy Temple.</p>
          </div>
        </div>
      </section>

      <section className="history-article" aria-labelledby="legend-title">
        <div className="history-wrap">
          <h2 id="legend-title">The Legend of Sree Thrippayya Thrimoorthy Temple</h2>
          <div className="history-grid">
            <nav className="history-index" aria-labelledby="history-index-title">
              <h3 id="history-index-title">On this page</h3>
              <ol>{indexItems.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}</ol>
            </nav>
            <div>
              <section className="history-chapter history-feature" id="trinity">
                <div><h3>The Divine Trinity</h3><p>Sree Thrippayya Thrimoorthy Temple is the only temple in the world that seats the self-manifested forms of the holy trinity (Thrimoorthy) of Brahma, Vishnu and Maheshwara together in the Sanctum upon the same pedestal. Maheshwara manifests in the centre flanked by Brahma to his right and Vishnu to his left. The divine trinity together embodies the cyclical nature of existence through Creation, Preservation and Destruction of the world.</p></div>
                <figure className="history-shrine"><img src="/moorthi.jpeg" alt="Three deities represented together within a shrine" /><figcaption>The Thrimoorthy</figcaption></figure>
              </section>
              {chapters.map((chapter) => <section className="history-chapter" id={chapter.id} key={chapter.id}><h3>{chapter.title}</h3><p>{chapter.text}</p></section>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
