const CONFIG = {
  // URL de Google Apps Script (REEMPLAZAR con la URL de TU implementación pública,
  // igual que se hizo en el proyecto de C&H Consultorio Dental)
  API_URL: 'https://script.google.com/macros/s/AKfycbxLx45ZkKgcMKMQlvHkL07sSZ6ROfEmgHnNCAIKzOpojy1Towhte6mzxLF6VOlCTajO9Q/exec',

  business: {
    name: "Florería Natura",
    phone: "529511284003", // Número real de WhatsApp
    address: "Almendros 600, esq. Manuel Ruiz (Edificio Núñez Banuet), Col. Reforma, 68050 Oaxaca de Juárez, Oax.",
    schedule: "Lunes a Sábado: 8:00 AM - 10:30 PM | Domingo: 9:00 AM - 5:00 PM",
    socials: {
      facebook: "https://facebook.com/florerianatura",
      instagram: "https://instagram.com/florerianatura",
      twitter: "https://x.com/florerianatura"
    }
  },

  topAlert: {
    text: "🌸 ¡Puntos Natura! Acumula 1 punto por cada $100 MXN de compra y úsalos como dinero real."
  },

  navbar: {
    links: [
      { name: "Catálogo", url: "#productos" },
      { name: "Diseño Especial", url: "#diseno-especial" },
      { name: "Cómo Ordenar", url: "#como-funciona" },
      { name: "Preguntas", url: "#faq" }
    ],
    ctaText: "Ordenar Ahora"
  },

  hero: {
    title: "Flores frescas que convierten momentos en recuerdos",
    subtitle: "Diseños originales, entregas cuidadas y flores de alta calidad en Oaxaca",
    ctaText: "Ver Catálogo Completo",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80"
  },

  howItWorks: {
    title: "Cómo realizar tu pedido",
    subtitle: "Tres sencillos pasos para enviar emoción a quien más quieres",
    ctaText: "Iniciar Pedido",
    steps: [
      {
        number: "1",
        icon: "bi-flower1",
        title: "Elige tu diseño favorito",
        description: "Explora nuestro catálogo de ramos, jarrones y cajas o solicita un diseño personalizado."
      },
      {
        number: "2",
        icon: "bi-card-checklist",
        title: "Completa el formulario",
        description: "Elige si deseas entrega a domicilio o recoger en tienda, y selecciona tu forma de pago."
      },
      {
        number: "3",
        icon: "bi-truck",
        title: "Entrega cuidadosa",
        description: "Elaboramos tu arreglo con flores frescas y lo entregamos puntualmente en la fecha programada."
      }
    ]
  },

  customBouquet: {
    title: "¿Buscas un diseño a tu medida?",
    subtitle: "En Florería Natura creamos arreglos con intención. Si tienes una idea o presupuesto específico, lo hacemos realidad para ti.",
    options: [
      "Elige tus flores preferidas (Rosas, Girasoles, Tulipanes, Gerberas, Gladiolas)",
      "Selecciona la paleta de colores para la ocasión",
      "Elige la presentación: Ramo en papel coreano, Jarrón de cristal o Caja fina",
      "Nos adaptamos 100% al presupuesto que desees asignar"
    ],
    ctaText: "Cotizar Arreglo Especial"
  },

  faqs: [
    {
      question: "¿Cuáles son las zonas de envío gratis?",
      answer: "El envío es gratuito en compras seleccionadas y según la zona dentro de Oaxaca de Juárez y municipios conurbados."
    },
    {
      question: "¿Puedo pedir entregas para el mismo día?",
      answer: "Sí, contamos con entregas el mismo día. Te sugerimos realizar tu orden con anticipación para asegurar disponibilidad de horario."
    },
    {
      question: "¿Cuáles son las formas de pago?",
      answer: "Aceptamos pago en efectivo (al recoger o contra entrega según zona) y transferencia bancaria directa."
    },
    {
      question: "¿Cómo funciona el Programa Puntos Natura?",
      answer: "Por cada $100 MXN de compra acumulas 1 Punto Natura. Cada punto equivale a $1 MXN de descuento directo en tus siguientes pedidos."
    }
  ]
};
