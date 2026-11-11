import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ, { type FAQItem } from '@/components/FAQ';
import JsonLd from '@/components/JsonLd';
import { WHATSAPP_URL } from '@/lib/contact';
import { EMAIL, HOTEL_ID, SITE } from '@/lib/schema';
import styles from './page.module.css';

// Copy from the live WordPress /retreats/ page. Dated editions were dropped:
// guests message us for the next available week instead.
const HERO = '/wp-content/uploads/2026/07/yoga-meditation-retreats-dharamshala-hero.jpg';
const description =
  'The Himalayan Reset: a 6-day, 5-night yoga and wellness retreat in Dharamshala for up to 12 guests. Private rooms, all meals, daily yoga, meditation and the Triund trek, from $599.';

export const metadata: Metadata = {
  title: { absolute: 'Yoga Retreat in Dharamshala: 6 Days from $599 | The Divine Hima' },
  description,
  openGraph: {
    title: 'The Himalayan Reset: Yoga Retreat in Dharamshala',
    description,
    url: `${SITE}/retreats/`,
    images: [{ url: HERO, width: 1200, height: 630, alt: 'Yoga and meditation retreat in Dharamshala' }],
  },
  alternates: { canonical: '/retreats/' },
};

const glance: [string, string][] = [
  ['Duration', '6 days / 5 nights, Monday to Saturday'],
  ['Group size', 'Up to 12 guests, so classes stay personal'],
  ['Room', 'Your own private room with mountain views. No shared dorms.'],
  ['Style', 'Hatha and Vinyasa yoga, meditation, Himalayan hiking, Tibetan culture'],
  ['Level', 'All levels and beginners welcome. Taught in English and Hindi.'],
  ['Best months', 'March to June and September to November, with quieter monsoon weeks in July and August'],
  ['Where', 'The Divine Hima, opposite the Norbulingka Institute, Sidhpur, Dharamshala'],
];

const included = [
  '5 nights in a private room with Dhauladhar mountain views',
  'All meals: vegetarian Indian, Tibetan and continental food from our own kitchen, plus herbal teas and evening chai at the café',
  '8 yoga sessions with a certified instructor: morning Hatha or Vinyasa, evening Yin and restorative',
  '4 guided meditation sessions, including one traditional Tibetan meditation',
  'A guided Triund trek day, or the Bhagsu waterfall and Gallu temple walk if the weather turns',
  'A McLeod Ganj culture walk: the Dalai Lama Temple, Namgyal Monastery and the Tibetan Museum',
  'A visit to the Norbulingka Institute across the road to see Tibetan woodcarving and thangka painting',
  'A momo-making session with our kitchen team',
  'Transfers from Kangra (Gaggal) airport or the Dharamshala bus stand',
  'A free 60-minute Himalayan Ayurvedic massage with warm herbal oils, booked whenever suits you',
];

const days = [
  { title: 'Arrive and ground', text: 'Pickup and a welcome chai at the café. Gentle restorative yoga at 4 pm, a sunset meditation facing the Dhauladhars, then a Himachali thali for dinner.' },
  { title: 'Find the rhythm', text: 'Morning Hatha yoga and breakfast, a pranayama and meditation workshop, a free afternoon (a good time for your massage), then evening Yin yoga and dinner.' },
  { title: 'Tibetan Dharamshala', text: 'Vinyasa flow, then a full day in McLeod Ganj: the Dalai Lama Temple, Namgyal Monastery, the Tibetan Museum and the kora walk, with a Tibetan lunch in town. Tibetan meditation at 4 pm and momo-making after dinner.' },
  { title: 'Mountain day', text: 'An early breakfast and the guided Triund trek: 9 km, moderate, with a packed lunch on the ridge facing the full Dhauladhar range. Restorative yoga and a hot foot soak in the evening.' },
  { title: 'Art, stillness, celebration', text: 'Morning Hatha, then Tibetan woodcarving and thangka painting at Norbulingka. Journaling, a closing meditation circle, a last sunset session and a farewell dinner with live acoustic music at The Bar By Far.' },
  { title: 'Depart', text: 'An optional sunrise meditation, breakfast, check-out by 11 am and transfers onward.' },
];

const faqs: FAQItem[] = [
  { q: 'I have never done yoga. Can I join?', a: 'Yes. Every session is taught for mixed levels, and the group is small enough for individual attention. The retreat is designed for beginners and experienced practitioners alike.' },
  { q: 'How hard is the Triund trek?', a: 'It is a moderate 9 km walk on a well-marked trail. We go at group pace with a guide, and there is a gentler waterfall-and-temple walk as an alternative.' },
  { q: 'What is the food like?', a: 'Fully vegetarian Indian, Tibetan and continental food cooked in our own kitchen, plus herbal teas and evening chai. Tell us about any dietary needs when you book.' },
  { q: 'How do I reserve a place?', a: `Message us on WhatsApp or email ${EMAIL} with your preferred week. A 20% deposit confirms your place, the balance is due 14 days before arrival, and cancellation is free up to 30 days before.` },
  { q: 'Can I share a room or book a private retreat?', a: 'Couples and friends sharing a room can ask for our second-guest rate. Groups of four or more can book a fully private retreat on their own dates.' },
  { q: 'How do I get there?', a: 'Fly to Kangra (Gaggal) airport, about 25 minutes away, or take an overnight bus from Delhi to the Dharamshala bus stand. Transfers from both are included.' },
  { q: 'What is not included?', a: 'Flights, visas, travel insurance, drinks at the bar, extra spa treatments and the optional Bir Billing paragliding add-on.' },
];

export default function RetreatsPage() {
  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TouristTrip',
          '@id': `${SITE}/retreats/#trip`,
          name: 'The Himalayan Reset: yoga and wellness retreat in Dharamshala',
          description,
          url: `${SITE}/retreats/`,
          image: `${SITE}${HERO}`,
          touristType: ['Yoga and wellness travellers', 'Beginners', 'Solo travellers', 'Couples'],
          provider: { '@id': HOTEL_ID },
          itinerary: {
            '@type': 'ItemList',
            itemListElement: days.map((d, i) => ({ '@type': 'ListItem', position: i + 1, name: `Day ${i + 1}: ${d.title}`, description: d.text })),
          },
          offers: {
            '@type': 'Offer',
            price: '599',
            priceCurrency: 'USD',
            description: 'Per person, all-inclusive, private room',
            availability: 'https://schema.org/InStock',
            url: `${SITE}/retreats/`,
          },
        }}
      />
      <PageHero title="The Himalayan Reset" subtitle="A 6-day yoga and wellness retreat in Dharamshala" backgroundImage={HERO} alt="Yoga and meditation retreat in Dharamshala" />
      <Breadcrumbs items={[{ name: 'Holiday packages', href: '/divine-holiday-packages/' }, { name: 'Yoga retreat', href: '/retreats/' }]} />

      <section className="section">
        <div className={`container ${styles.lead}`}>
          <p className={styles.leadText}>
            A small-group yoga and wellness retreat at our boutique hotel below the Dhauladhar range. Daily Hatha and Vinyasa yoga, guided meditation, the Triund trek, Tibetan culture in McLeod Ganj, and every meal cooked in our own kitchen. Up to 12 guests, all levels welcome.
          </p>
          <div className={styles.priceBox}>
            <p className={styles.price}>From $599</p>
            <p>per person, all-inclusive: private room, all meals, the full programme and a free Ayurvedic massage.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Ask about dates on WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container prose">
          <h2>At a glance</h2>
          <dl className={styles.glance}>
            {glance.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <h2>What is included</h2>
          <ul>
            {included.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.daysSection}`}>
        <div className="container">
          <h2 className="section-title">Day by day</h2>
          <ol className={styles.days}>
            {days.map((d, i) => (
              <li key={d.title}>
                <span className={styles.dayNumber}>Day {i + 1}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Dates and booking</h2>
          <p>
            Retreats run Monday to Saturday. Places are limited to 12 guests a week, so message us with the week you have in mind and we will confirm availability within a day. Monsoon weeks in July and August are misty, green and much quieter.
          </p>
          <h2>Why The Divine Hima</h2>
          <p>
            Most Dharamshala retreats put you in an ashram dorm or a rented hall. The Himalayan Reset runs inside our own boutique hotel: your own room, our <Link href="/dining/">restaurant and kitchen</Link>, the café for slow mornings and The Bar By Far for the farewell evening. We are in quiet Sidhpur, opposite the Norbulingka Institute and away from the McLeod Ganj crowds, with the Dhauladhars filling the view from your mat.
          </p>
          <p>
            Planning ahead? Read our guides to the <Link href="/triund-trek-guide/">Triund trek</Link>, <Link href="/yoga-meditation-retreats-dharamshala/">yoga and meditation in Dharamshala</Link> and the <Link href="/best-time-to-visit-dharamshala/">best time to visit</Link>.
          </p>
        </div>
      </section>

      <FAQ items={faqs} title="Retreat questions" />

      <section className={`section ${styles.cta}`}>
        <div className="container">
          <h2 className="section-title">Ready to reset?</h2>
          <p>From $599 per person, with a private room, all meals and your free Himalayan massage.</p>
          <div className={styles.ctaButtons}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Ask about dates on WhatsApp</a>
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent('The Himalayan Reset retreat')}`} className="btn btn-secondary">Email us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
