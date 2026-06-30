import Script from 'next/script';

export default function FAQSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best time to visit Dharamshala?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dharamshala is best visited between March and June for pleasant weather or from September to November for clear skies and scenic views and December to Feb for Snow in the mountains."
        }
      },
      {
        "@type": "Question",
        "name": "What amenities are available at the hotel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our hotel offers amenities such as free Wi-Fi, 24-hour room service, an in-house restaurant, in-house Bar, in-house Cafe, Car parking, and a travel desk."
        }
      },
      {
        "@type": "Question",
        "name": "Do you have options for vegetarian/vegan meals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer a variety of vegetarian and vegan dishes in our restaurant to cater to diverse dietary preferences. Our divine menu offers multi cuisine and local Himachali dishes."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer family rooms or suites?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer family rooms and suites designed for comfortable stays with your loved ones. Our Family suites are large, spacious and offer maximum comfort."
        }
      },
      {
        "@type": "Question",
        "name": "Are pets allowed in the hotel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we allow pets in our hotel in Dharamshala. Please inform us in advance if you plan to bring a pet."
        }
      },
      {
        "@type": "Question",
        "name": "What is your cancellation policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our cancellation policy depends on the type of booking. Typically, cancellations made 48 hours prior to check-in are free of charge. Full refund if cancelled 14 days before arrival. 50% refund before 3 days of arrival. No refund after that."
        }
      },
      {
        "@type": "Question",
        "name": "How far is your hotel from the Dharamshala / Kangra airport?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The hotel is approximately 12 kms from Kangra Airport, and we offer airport transfer services upon request."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide transportation to local attractions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we can arrange transportation to popular attractions like McLeod Ganj, Dalai Lama Temple, Bhagsunag Waterfall, and Triund Trek starting points."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer packages for honeymooners or special occasions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we have exclusive packages for honeymooners and other special occasions, including customized room décor and candlelight dinners."
        }
      },
      {
        "@type": "Question",
        "name": "Is parking available at the hotel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we have a secure parking facility available for guests."
        }
      },
      {
        "@type": "Question",
        "name": "How can I book a room at your hotel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book a room through our website, by calling our reservations at +91 86269 83777 OR emailing us at reservation@thedivinehima.com"
        }
      }
    ]
  };

  return (
    <Script id="faq-schema" type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(faqData)}
    </Script>
  );
}
