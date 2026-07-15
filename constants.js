// constants.js
const CONFIG = {
  business: {
    name: "Ortiz Floristería",
    phone: "9514990142", // Tu número real de WhatsApp
    address: "Centro Histórico, Oaxaca, México",
    schedule: "Lunes a Sábado: 9:00 AM - 8:00 PM",
    socials: {
      facebook: "https://facebook.com/ortiz_floristeria",
      instagram: "https://instagram.com/ortiz_floristeria",
      linkedin: "#",
      youtube: "#"
    }
  },

  topAlert: {
    text: "Tu seguridad es nuestra prioridad. Entregas 100% seguras y sin contacto físico en todos los pedidos."
  },

  navbar: {
    links: [
      { name: "Diseños de Temporada", url: "#productos" },
      { name: "Diseño Especial", url: "#diseno-especial" },
      { name: "Cómo Funciona", url: "#como-funciona" },
      { name: "Preguntas", url: "#faq" }
    ],
    ctaText: "Enviar Flores"
  },

  hero: {
    title: "Flores para todos los momentos de la vida",
    subtitle: "Floristas locales trabajando con amor y dedicación",
    ctaText: "Comprar Ahora",
    // Imagen de portada actualizada con tu selección:
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80"
  },

  inAHurry: {
    title: "¿Tienes Prisa?",
    text: "Selecciona una opción express de entrega para hoy mismo. Revisa la disponibilidad de flores de temporada listas para salir.",
    ctaText: "Enviar Express"
  },

  howItWorks: {
    title: "Cómo funciona",
    subtitle: "Compra localmente y regala con un significado real, todo en línea.",
    ctaText: "Comenzar Pedido",
    steps: [
      {
        number: "1",
        icon: "bi-chat-heart",
        title: "Cuéntanos tu motivo",
        description: "¿En quién estás pensando? ¿Por qué deseas enviarle flores? Nosotros te ayudamos incluso a redactar el mensaje perfecto."
      },
      {
        number: "2",
        icon: "bi-gift",
        title: "Nosotros nos encargamos",
        description: "Te enlazamos con un florista artesanal que diseñará y entregará a mano un arreglo único adaptado a ti."
      },
      {
        number: "3",
        icon: "bi-envelope-heart",
        title: "Les encantará el detalle",
        description: "Disfruta de la tranquilidad de saber que esa persona tan especial recibió flores frescas de la más alta calidad."
      }
    ]
  },

  products: [
    {
      id: "prod-1",
      name: "Ramillete Imperial de Rosas",
      price: 1200,
      description: "Elegante envoltura en papel coreano con 24 rosas seleccionadas.",
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "prod-2",
      name: "Cesta Armonía de Tulipanes",
      price: 850,
      description: "Combinación de tulipanes de colores en una delicada cesta artesanal.",
      image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "prod-3",
      name: "Girasoles del Sol",
      price: 650,
      description: "Girasoles vibrantes envueltos finamente listos para sorprender.",
      image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "prod-4",
      name: "Orquídea Premium Doble",
      price: 1500,
      description: "Elegante orquídea de doble tallo en base de cerámica fina para interiores.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80"
    }
  ],

  customBouquet: {
    title: "¿Buscas un diseño especial?",
    subtitle: "Si tienes una idea específica en mente o quieres ajustar un arreglo a tu propio presupuesto, nuestros artesanos floristas lo diseñan exclusivamente para ti.",
    options: [
      "Tú eliges el tipo de flor (Rosas, Tulipanes, Girasoles, Gerberas)",
      "Define la paleta de colores ideal para la ocasión",
      "Elige el tamaño y presentación (Ramo, caja premium, base de cerámica o madera)",
      "Nos adaptamos por completo al presupuesto que tengas establecido"
    ],
    ctaText: "Cotizar Diseño Especial"
  },

  midCta: {
    title: "¿En qué estás pensando para hoy?",
    text: "Nuestra comunidad de diseñadores florales está lista para crear arreglos con un valor real que marquen la diferencia en cada momento especial.",
    ctaText: "Celebrar Momentos",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80"
  },

  faqs: [
    {
      question: "¿Cuál es el costo de entrega a domicilio?",
      answer: "Nuestra tarifa estándar de envío se calcula según el código postal del destinatario, garantizando un manejo delicado de cada arreglo durante el trayecto."
    },
    {
      question: "¿Por qué enviar flores con nosotros?",
      answer: "Porque trabajamos exclusivamente con floristas locales experimentados y flores de corte diario, asegurando diseños premium y una frescura excepcional."
    },
    {
      question: "¿Ofrecen entregas el mismo día?",
      answer: "Sí, todos los pedidos locales realizados antes de las 2:00 PM se pueden entregar el mismo día de manera express."
    },
    {
      question: "¿Puedo personalizar las flores de mi arreglo?",
      answer: "Por supuesto. Puedes contactarnos de manera directa para elegir flores específicas, colores y el tamaño ideal de tu presupuesto."
    },
    {
      question: "¿Cómo puedo realizar el pago?",
      answer: "Aceptamos transferencias electrónicas directas, depósitos bancarios y pagos con tarjeta mediante un enlace de cobro seguro."
    },
    {
      question: "¿Recibiré una confirmación de entrega?",
      answer: "Sí, te enviaremos una notificación de WhatsApp con la foto del arreglo terminado una vez que haya sido entregado en su destino."
    }
  ],

  whatsappPromo: {
    title: "Mira nuestro catálogo diario en WhatsApp",
    subtitle: "Subimos diseños frescos todas las mañanas a nuestros estados. Agréganos para no perderte ninguna flor de temporada.",
    ctaText: "Ver Catálogo Activo",
    defaultMsg: "Hola, me gustaría agendar su contacto para ver sus diseños florales de temporada y consultar precios."
  }
};