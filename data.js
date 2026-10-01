/* ===== DATA ===== */
const LAYERS = [
  { n:1, c:'#2E6BE6',
    es:{name:'SVOD', tag:'Contenidos curados', role:'Base de la arquitectura',
        desc:'Base de contenidos de alta calidad alineados a competencias y estándares curriculares. Material audiovisual y multimodal, disponible 24/7 en cualquier dispositivo.'},
    en:{name:'SVOD', tag:'Curated content', role:'Foundation layer',
        desc:'A high-quality content base aligned to competencies and curricular standards. Audiovisual and multimodal material, available 24/7 on any device.'},
    feats:[
      {ic:'play-circle', es:['Video Interactivo','Clases en video con interacción'], en:['Interactive Video','Video lessons with interaction']},
      {ic:'file-text',   es:['Lecturas Curadas','Textos seleccionados por expertos'], en:['Curated Readings','Expert-selected texts']},
      {ic:'flask-conical',es:['Simulaciones y Labs','Práctica en entornos seguros'], en:['Simulations & Labs','Practice in safe environments']},
      {ic:'layers',      es:['Recursos Multiformato','Material para cada estilo'], en:['Multi-format Resources','Material for every style']} ]},

  { n:2, c:'#7C3AED',
    es:{name:'FLEXCLASS (PACCC)', tag:'Personaliza · Aprende · Conversa · Crea · Comparte', role:'Marco pedagógico propio',
        desc:'Marco pedagógico propio que convierte la interacción en aprendizaje profundo. El estudiante piensa antes de usar IA y construye conocimiento propio en un ciclo activo.'},
    en:{name:'FLEXCLASS (PACCC)', tag:'Personalize · Learn · Converse · Create · Share', role:'A pedagogical framework of its own',
        desc:'A pedagogical framework of its own that turns interaction into deep learning. Students think before using AI and build their own knowledge in an active loop.'},
    feats:[
      {ic:'user-round',     es:['Personaliza','Adapta el recorrido a cada alumno'], en:['Personalize','Adapts the path to each student']},
      {ic:'messages-square',es:['Conversa','Dialoga para justificar ideas'], en:['Converse','Dialogues to justify ideas']},
      {ic:'sparkles',       es:['Crea','Produce con herramientas reales'], en:['Create','Builds with real tools']},
      {ic:'book-open',      es:['Aprende','Construye conocimiento propio'], en:['Learn','Builds its own knowledge']},
      {ic:'share-2',        es:['Comparte','Difunde y colabora'], en:['Share','Shares and collaborates']} ]},

  { n:3, c:'#E23B3B',
    es:{name:'FLEXGPT', tag:'IA Socrática', role:'Orquestador socrático agnóstico de modelos',
        desc:'Capa de inteligencia conversacional que guía, cuestiona y potencia el pensamiento crítico mediante mayéutica socrática. Las respuestas son punto de partida, no destino.'},
    en:{name:'FLEXGPT', tag:'Socratic AI', role:'Model-agnostic Socratic orchestrator',
        desc:'A conversational intelligence layer that guides, questions and strengthens critical thinking through Socratic maieutics. Answers are a starting point, not a destination.'},
    feats:[
      {ic:'brain',          es:['Ingeniería Socrática','Preguntas que activan el pensar'], en:['Socratic Engineering','Questions that spark thinking']},
      {ic:'puzzle',         es:['Modelo Agnóstico','Funciona con cualquier LLM'], en:['Agnostic Model','Works with any LLM']},
      {ic:'message-circle', es:['Diálogo Guiado','Acompaña paso a paso'], en:['Guided Dialogue','Guides step by step']},
      {ic:'scale',          es:['Ética y Contención','Límites y resguardos activos'], en:['Ethics & Safeguards','Active limits and safeguards']} ]},

  { n:4, c:'#C1691B',
    es:{name:'FLEXFLOW', tag:'Orquestación pedagógica', role:'Flujos de trabajo y metodologías orquestadas',
        desc:'Orquesta procesos pedagógicos inteligentes que estructuran experiencias de aprendizaje efectivas. Estandariza calidad y escala sin perder personalización.'},
    en:{name:'FLEXFLOW', tag:'Pedagogical orchestration', role:'Orchestrated workflows and methodologies',
        desc:'Orchestrates intelligent pedagogical processes that structure effective learning experiences. Standardizes quality and scales without losing personalization.'},
    feats:[
      {ic:'workflow',        es:['Workflows Pedagógicos','Procesos de enseñanza orquestados'], en:['Pedagogical Workflows','Orchestrated teaching processes']},
      {ic:'clipboard-check', es:['Rúbricas y Evaluaciones','Medición consistente y clara'], en:['Rubrics & Assessments','Consistent, clear measurement']},
      {ic:'route',           es:['Rutas de Aprendizaje','Trayectorias a medida'], en:['Learning Paths','Tailored journeys']},
      {ic:'settings',        es:['Integraciones SIS / LMS','Conecta con tus sistemas'], en:['SIS / LMS Integrations','Connects to your systems']} ]},

  { n:5, c:'#219351',
    es:{name:'FLEXMIND (IDCA)', tag:'Datos cognitivos', role:'Capa de datos y trazabilidad longitudinal',
        desc:'Captura y orquesta los datos cognitivos para medir lo que realmente importa: el desarrollo del pensamiento. Separa memoria privada, evidencia compartida y datos agregados.'},
    en:{name:'FLEXMIND (IDCA)', tag:'Cognitive data', role:'Data and longitudinal traceability layer',
        desc:'Captures and orchestrates cognitive data to measure what truly matters: the development of thinking. Separates private memory, shared evidence and aggregated data.'},
    feats:[
      {ic:'database',    es:['Repositorio Longitudinal','Historial cognitivo en el tiempo'], en:['Longitudinal Repository','Cognitive history over time']},
      {ic:'fingerprint', es:['IDCA — Índice Cognitivo','Mide el desarrollo del pensar'], en:['IDCA — Cognitive Index','Measures thinking development']},
      {ic:'activity',    es:['Modelos de Evolución','Proyecta trayectorias de avance'], en:['Evolution Models','Projects progress trajectories']},
      {ic:'lock',        es:['Privacidad y Seguridad','Datos protegidos por diseño'], en:['Privacy & Security','Data protected by design']} ]},

  { n:6, c:'#3551A6',
    es:{name:'FLEXAGENTS', tag:'Agentes por rol, con conducción humana', role:'Agentes personalizados por rol, bajo conducción humana y gobernanza institucional.',
        desc:'Personalizamos sin etiquetar. Hipótesis situadas y corregibles, no identidades algorítmicas. El docente aprueba, modifica o rechaza cada propuesta.'},
    en:{name:'FLEXAGENTS', tag:'Role-based agents, human-led', role:'Role-based personalized agents, under human direction and institutional governance.',
        desc:'We personalize without labeling. Situated, correctable hypotheses — not algorithmic identities. The teacher approves, edits or rejects every proposal.'},
    note:{es:{title:'Espejo PACCC', body:'Modo especializado del Copiloto. Mejora profesional privada y voluntaria.'},
          en:{title:'PACCC Mirror', body:'A specialized Copilot mode. Private, voluntary professional development.'}},
    feats:[
      {ic:'user-round',    es:['Mentor IA del Estudiante','Acompañamiento adaptado a cada rol'], en:['AI Student Mentor','Support tailored to each role']},
      {ic:'refresh-cw',    es:['Continuidad PACCC','Desarrollo integral entre clases'], en:['PACCC Continuity','Integral development between classes']},
      {ic:'users',         es:['Copiloto Pedagógico Docente','Asiste sin reemplazar al docente'], en:['Teacher Pedagogical Copilot','Assists without replacing the teacher']},
      {ic:'clipboard-list',es:['Evidencia y Loops','Hipótesis limitadas, siempre revisables'], en:['Evidence & Loops','Limited hypotheses, always reviewable']} ]},

  { n:7, c:'#1E88C7',
    es:{name:'FLEXGOV', tag:'Gobernanza y auditoría', role:'Gobernanza y auditoría cognitiva',
        desc:'El Estado gobierna, audita y mejora el sistema con evidencia agregada y trazable. No accede a conversaciones privadas, no genera perfiles psicológicos, no califica automáticamente a docentes y no rankea estudiantes.'},
    en:{name:'FLEXGOV', tag:'Governance & audit', role:'Cognitive governance and audit',
        desc:'The State governs, audits and improves the system with aggregated, traceable evidence. It does not access private conversations, generate psychological profiles, automatically grade teachers, or rank students.'},
    feats:[
      {ic:'bar-chart-3', es:['Dashboards Estratégicos','Visión ejecutiva en tiempo real'], en:['Strategic Dashboards','Real-time executive view']},
      {ic:'shield-check',es:['Auditoría Cognitiva','Trazabilidad y control total'], en:['Cognitive Audit','Full traceability and control']},
      {ic:'landmark',    es:['Gestión de Políticas','Decisiones basadas en evidencia'], en:['Policy Management','Evidence-based decisions']},
      {ic:'map-pin',     es:['Benchmark Territorial','Compara regiones y sistemas'], en:['Territorial Benchmark','Compares regions and systems']} ]},
];


const phases = [
  {
    kicker: "01 · PERSONALIZA",
    title: "Personaliza",
    text: "Adaptá FlexClass a tu aula: elegís las preguntas del reservorio curricular, sumás las tuyas, decidís con qué herramienta de IA van a trabajar tus estudiantes y ajustás los tiempos.",
    img: "assets/paccc/Paccc-01-Personaliza.jpg",
    alt: "Captura de la plataforma FlexClass en el paso Personaliza del método PACCC",
    crea: false,
  },
  {
    kicker: "02 · APRENDE",
    title: "Aprende",
    text: "Contenido adaptado a tu currículo: el tema se presenta con una narrativa propia, alineada a la base curricular de tu jurisdicción. De ahí sale la base común del curso, y sobre eso el estudiante conversa y crea después.",
    img: "assets/paccc/Paccc-02-Aprende.jpg",
    alt: "Captura de la plataforma FlexClass en el paso Aprende del método PACCC",
    crea: false,
  },
  {
    kicker: "03 · CONVERSA",
    title: "Conversa",
    text: "FlexGPT es el chat de la plataforma: una IA que solo habla del tema de la clase y está hecha para repreguntar. El estudiante dialoga con ella a partir de preguntas curadas. La IA no cierra el tema, lo abre.",
    img: "assets/paccc/Paccc-03-Conversa.jpg",
    alt: "Captura de la plataforma FlexClass en el paso Conversa del método PACCC",
    crea: false,
  },
  {
    kicker: "04 · CREA · LA IA ENTRA ACÁ",
    title: "Crea",
    text: "De consumir a producir: cada tema trae una IA y una consigna concreta. La clase da los pasos y el tutorial; el resultado es la pieza del estudiante.",
    img: "assets/paccc/Paccc-04-Crea.jpg",
    alt: "Captura de la plataforma FlexClass en el paso Crea del método PACCC",
    crea: true,
  },
  {
    kicker: "05 · COMPARTE",
    title: "Comparte",
    text: "El trabajo creado sube a la hoja de entrega del curso. El docente lo revisa y devuelve una retroalimentación puntual sobre la producción real del estudiante, cerrando el ciclo pedagógico.",
    img: "assets/paccc/Paccc-05-Comparte.jpg",
    alt: "Captura de la plataforma FlexClass en el paso Comparte del método PACCC",
    crea: false,
  },
];
