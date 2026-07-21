/* ==========================================================================
   MÓDULO DE DATOS: BASE DE DATOS Y GRAFO DE NAVEGACIÓN (PLANTA BAJA REAL)
   CFP N.º 7 - SEÑALÉTICA INSTITUCIONAL Y NUEVO PLANO
   ========================================================================== */

// Base de datos de espacios físicos del CFP N.º 7 (Planta Baja Real)
export const SPACES = {
    // ----------------------------------------------------------------------
    // SECTOR 1 - TALLERES ALA OESTE (Sector 1: Azul)
    // ----------------------------------------------------------------------
    "s1-electricidad": {
        id: "s1-electricidad",
        name: "Electricidad",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S1",
        x: 252,
        y: 153,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/aula_gastronomia.png",
        description: "Taller didáctico de instalaciones eléctricas domiciliarias e industriales, tableros de ensayo y automatización.",
        rect: { x: 246, y: 145, w: 12, h: 16 }
    },
    "s1-herreria": {
        id: "s1-herreria",
        name: "Herrería",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S1",
        x: 252,
        y: 135,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/aula_gastronomia.png",
        description: "Espacio equipado para prácticas de soldadura eléctrica, autógena y herrería de obra.",
        rect: { x: 246, y: 125, w: 12, h: 20 }
    },
    "s1-climatizacion": {
        id: "s1-climatizacion",
        name: "Climatización",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S1",
        x: 266,
        y: 135,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/aula_gastronomia.png",
        description: "Aula taller de refrigeración, aire acondicionado y sistemas de calefacción.",
        rect: { x: 260, y: 125, w: 12, h: 20 }
    },
    "s1-serigrafia": {
        id: "s1-serigrafia",
        name: "Serigrafía (Afuera)",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S1",
        x: 259,
        y: 112,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/aula_gastronomia.png",
        description: "Taller para estampado textil, revelado de shablones y prácticas de impresión.",
        rect: { x: 246, y: 99, w: 26, h: 26 }
    },

    // ----------------------------------------------------------------------
    // SECTOR 2 - CARPINTERÍA (Sector 2: Naranja)
    // ----------------------------------------------------------------------
    "s2-carpinteria": {
        id: "s2-carpinteria",
        name: "Carpintería",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S2",
        x: 133,
        y: 163,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/aula_gastronomia.png",
        description: "Taller equipado con maquinaria de corte, lijado y ensamble de maderas para oficios.",
        rect: { x: 115, y: 137, w: 37, h: 53 }
    },
    "s2-bicicleteria": {
        id: "s2-bicicleteria",
        name: "Taller de Bicicletería",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S2",
        x: 170,
        y: 163,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/aula_gastronomia.png",
        description: "Espacio para el armado, reparación y mantenimiento mecánico de bicicletas.",
        rect: { x: 152, y: 137, w: 37, h: 53 }
    },

    // ----------------------------------------------------------------------
    // SECTOR 3 - ADMINISTRACIÓN Y SISTEMAS (Sector 3: Verde)
    // ----------------------------------------------------------------------
    "s3-informes": {
        id: "s3-informes",
        name: "Informes - Regencia",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S3",
        x: 284,
        y: 175,
        type: "office",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/entrada_principal.png",
        description: "Oficina de atención a estudiantes, informes de carreras e inscripción general.",
        rect: { x: 274, y: 165, w: 20, h: 21 }
    },
    "s3-secretaria": {
        id: "s3-secretaria",
        name: "Secretaría - Dirección",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S3",
        x: 309,
        y: 175,
        type: "office",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/entrada_principal.png",
        description: "Dirección institucional y gestión de títulos oficiales.",
        rect: { x: 299, y: 165, w: 20, h: 21 }
    },
    "s3-estudiantes": {
        id: "s3-estudiantes",
        name: "Oficina de Estudiantes",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S3",
        x: 309,
        y: 155,
        type: "office",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/entrada_principal.png",
        description: "Espacio de atención administrativa para trámites del alumnado y constancias.",
        rect: { x: 299, y: 145, w: 20, h: 20 }
    },
    "s3-personal": {
        id: "s3-personal",
        name: "Sala de Personal",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S3",
        x: 284,
        y: 155,
        type: "office",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/entrada_principal.png",
        description: "Espacio de reunión de docentes e instructores de la institución.",
        rect: { x: 274, y: 145, w: 20, h: 20 }
    },
    "s3-dinamicos": {
        id: "s3-dinamicos",
        name: "Área de Talleres Dinámicos",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S3",
        x: 284,
        y: 135,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/aula_gastronomia.png",
        description: "Espacio configurable para el dictado de talleres temporales y capacitaciones dinámicas.",
        rect: { x: 274, y: 125, w: 20, h: 20 }
    },
    "s3-informatica-a": {
        id: "s3-informatica-a",
        name: "Laboratorio de Informática A",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S3",
        x: 284,
        y: 112,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/aula_gastronomia.png",
        description: "Laboratorio informático equipado con computadoras de diseño y programación web.",
        rect: { x: 274, y: 99, w: 20, h: 26 }
    },
    "s3-informatica-b": {
        id: "s3-informatica-b",
        name: "Laboratorio de Informática B",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S3",
        x: 309,
        y: 135,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/aula_gastronomia.png",
        description: "Laboratorio informático secundario para cursos de soporte de hardware y redes.",
        rect: { x: 299, y: 125, w: 20, h: 20 }
    },
    "s3-archivo": {
        id: "s3-archivo",
        name: "Archivo Institucional",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S3",
        x: 309,
        y: 112,
        type: "office",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/entrada_principal.png",
        description: "Espacio de archivo de documentación histórica y expedientes administrativos.",
        rect: { x: 299, y: 99, w: 20, h: 26 }
    },
    "s3-tecnologico": {
        id: "s3-tecnologico",
        name: "Espacio Tecnológico Multidisciplinar (Afuera)",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S3",
        x: 296,
        y: 197,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/entrada_principal.png",
        description: "Espacio modular en la galería exterior para clases prácticas al aire libre y exhibiciones tecnológicas.",
        rect: { x: 274, y: 190, w: 45, h: 15 }
    },

    // ----------------------------------------------------------------------
    // SECTOR 4 - AULAS Y GASTRONOMÍA (Sector 4: Rojo)
    // ----------------------------------------------------------------------
    "s4-aula1": {
        id: "s4-aula1",
        name: "Aula 1",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S4",
        x: 351,
        y: 108,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baños Sector 4 (al lado)",
        photo: "assets/images/aula_gastronomia.png",
        description: "Aula teórica equipada con proyector y pizarra inteligente.",
        rect: { x: 344, y: 100, w: 14, h: 16 }
    },
    "s4-aula2": {
        id: "s4-aula2",
        name: "Aula 2",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S4",
        x: 365,
        y: 108,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baños Sector 4 (al lado)",
        photo: "assets/images/aula_gastronomia.png",
        description: "Aula para clases teóricas y seminarios de gestión administrativa.",
        rect: { x: 358, y: 100, w: 14, h: 16 }
    },
    "s4-aula3": {
        id: "s4-aula3",
        name: "Aula 3 - SUM",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S4",
        x: 379,
        y: 108,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baños Sector 4 (al lado)",
        photo: "assets/images/aula_gastronomia.png",
        description: "Salón de Usos Múltiples para conferencias, actos institucionales y debates.",
        rect: { x: 372, y: 100, w: 14, h: 16 }
    },
    "s4-aula4": {
        id: "s4-aula4",
        name: "Aula 4",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S4",
        x: 393,
        y: 108,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baños Sector 4",
        photo: "assets/images/aula_gastronomia.png",
        description: "Aula común para trayectos pedagógicos y teoría técnica.",
        rect: { x: 386, y: 100, w: 14, h: 16 }
    },
    "s4-aula5": {
        id: "s4-aula5",
        name: "Aula 5",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S4",
        x: 407,
        y: 108,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baños Sector 4",
        photo: "assets/images/aula_gastronomia.png",
        description: "Aula adaptada para cursos teóricos e idiomas.",
        rect: { x: 400, y: 100, w: 14, h: 16 }
    },
    "s4-gastronomia-a": {
        id: "s4-gastronomia-a",
        name: "Gastronomía A",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S4",
        x: 426,
        y: 108,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baños Sector 4",
        photo: "assets/images/aula_gastronomia.png",
        description: "Taller principal de cocina profesional industrial con mesadas de acero inoxidable.",
        rect: { x: 414, y: 100, w: 25, h: 16 }
    },
    "s4-ifts": {
        id: "s4-ifts",
        name: "E.P.S - IFTS Nº 5",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S4",
        x: 352,
        y: 126,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baños Sector 4",
        photo: "assets/images/entrada_principal.png",
        description: "Oficina de coordinación pedagógica y dictado de clases del IFTS N° 5.",
        rect: { x: 344, y: 118, w: 16, h: 16 }
    },
    "s4-preceptoria": {
        id: "s4-preceptoria",
        name: "Preceptoria E.P.S",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S4",
        x: 367,
        y: 126,
        type: "office",
        isAccessible: true,
        nearestToilet: "Baños Sector 4",
        photo: "assets/images/entrada_principal.png",
        description: "Preceptoría y control de asistencia de la Escuela Profesional Secundaria (EPS).",
        rect: { x: 360, y: 118, w: 14, h: 16 }
    },
    "s4-baño-caballeros": {
        id: "s4-baño-caballeros",
        name: "Baño de Caballeros",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S4",
        x: 381,
        y: 126,
        type: "toilet",
        isAccessible: false,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/banio_adaptado.png",
        description: "Sanitario masculino convencional de Planta Baja.",
        rect: { x: 374, y: 118, w: 14, h: 16 }
    },
    "s4-gastronomia-c": {
        id: "s4-gastronomia-c",
        name: "Gastronomía C",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S4",
        x: 396,
        y: 126,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baños Sector 4",
        photo: "assets/images/aula_gastronomia.png",
        description: "Taller para prácticas de panadería y pastelería profesional.",
        rect: { x: 388, y: 118, w: 16, h: 16 }
    },
    "s4-gastronomia-b": {
        id: "s4-gastronomia-b",
        name: "Gastronomía B",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S4",
        x: 412,
        y: 126,
        type: "classroom",
        isAccessible: true,
        nearestToilet: "Baños Sector 4",
        photo: "assets/images/aula_gastronomia.png",
        description: "Taller para prácticas de coctelería, servicio de salón y sommelier.",
        rect: { x: 404, y: 118, w: 16, h: 16 }
    },
    "s4-baño-damas": {
        id: "s4-baño-damas",
        name: "Baño de Damas y Profesores",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S4",
        x: 429,
        y: 126,
        type: "toilet",
        isAccessible: false,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/banio_adaptado.png",
        description: "Sanitarios femeninos y de personal docente en el ala lateral.",
        rect: { x: 420, y: 118, w: 19, h: 16 }
    },

    // ----------------------------------------------------------------------
    // ACCESOS Y GENERALES
    // ----------------------------------------------------------------------
    "entrance-dragones": {
        id: "entrance-dragones",
        name: "Entrada Dragones",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S1",
        x: 227,
        y: 161,
        type: "access",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/entrada_principal.png",
        description: "Entrada peatonal principal al establecimiento desde la calle Dragones.",
        rect: { x: 220, y: 153, w: 15, h: 15 }
    },
    "entrance-ramsay": {
        id: "entrance-ramsay",
        name: "Entrada Ramsay",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S4",
        x: 457,
        y: 117,
        type: "access",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/entrada_principal.png",
        description: "Entrada vehicular y peatonal accesible desde la calle Ramsay.",
        rect: { x: 450, y: 110, w: 15, h: 15 }
    },
    "meeting-point": {
        id: "meeting-point",
        name: "Punto de Encuentro ('Estás aquí')",
        floor: "PB",
        floorLabel: "Planta Baja",
        sector: "Sector S3",
        x: 270,
        y: 222,
        type: "common",
        isAccessible: true,
        nearestToilet: "Baño Adaptado en Patio",
        photo: "assets/images/entrada_principal.png",
        description: "Cartelera central de referencia en el patio principal.",
        rect: { x: 260, y: 212, w: 20, h: 20 }
    }
};

// --------------------------------------------------------------------------
// RED DE NODOS PARA EL MOTOR DE CAMINOS (GRAFO DE RUTAS REALES - COORDENADAS 568x467)
// --------------------------------------------------------------------------
export const NODES = [
    // --- NODOS DE HABITACIONES / LOCALES ---
    { id: "n-s1-electricidad", floor: "PB", x: 252, y: 153, label: "Electricidad", isRoom: true, spaceId: "s1-electricidad" },
    { id: "n-s1-herreria", floor: "PB", x: 252, y: 135, label: "Herrería", isRoom: true, spaceId: "s1-herreria" },
    { id: "n-s1-climatizacion", floor: "PB", x: 266, y: 135, label: "Climatización", isRoom: true, spaceId: "s1-climatizacion" },
    { id: "n-s1-serigrafia", floor: "PB", x: 259, y: 112, label: "Serigrafía", isRoom: true, spaceId: "s1-serigrafia" },

    { id: "n-s2-carpinteria", floor: "PB", x: 133, y: 163, label: "Carpintería", isRoom: true, spaceId: "s2-carpinteria" },
    { id: "n-s2-bicicleteria", floor: "PB", x: 170, y: 163, label: "Taller de Bicicletería", isRoom: true, spaceId: "s2-bicicleteria" },

    { id: "n-s3-informes", floor: "PB", x: 284, y: 175, label: "Informes - Regencia", isRoom: true, spaceId: "s3-informes" },
    { id: "n-s3-secretaria", floor: "PB", x: 309, y: 175, label: "Secretaría - Dirección", isRoom: true, spaceId: "s3-secretaria" },
    { id: "n-s3-estudiantes", floor: "PB", x: 309, y: 155, label: "Oficina de Estudiantes", isRoom: true, spaceId: "s3-estudiantes" },
    { id: "n-s3-personal", floor: "PB", x: 284, y: 155, label: "Sala de Personal", isRoom: true, spaceId: "s3-personal" },
    { id: "n-s3-dinamicos", floor: "PB", x: 284, y: 135, label: "Talleres Dinámicos", isRoom: true, spaceId: "s3-dinamicos" },
    { id: "n-s3-informatica-a", floor: "PB", x: 284, y: 112, label: "Laboratorio Informática A", isRoom: true, spaceId: "s3-informatica-a" },
    { id: "n-s3-informatica-b", floor: "PB", x: 309, y: 135, label: "Laboratorio Informática B", isRoom: true, spaceId: "s3-informatica-b" },
    { id: "n-s3-archivo", floor: "PB", x: 309, y: 112, label: "Archivo Institucional", isRoom: true, spaceId: "s3-archivo" },
    { id: "n-s3-tecnologico", floor: "PB", x: 296, y: 197, label: "Espacio Tecnológico", isRoom: true, spaceId: "s3-tecnologico" },

    { id: "n-s4-aula1", floor: "PB", x: 351, y: 108, label: "Aula 1", isRoom: true, spaceId: "s4-aula1" },
    { id: "n-s4-aula2", floor: "PB", x: 365, y: 108, label: "Aula 2", isRoom: true, spaceId: "s4-aula2" },
    { id: "n-s4-aula3", floor: "PB", x: 379, y: 108, label: "Aula 3 - SUM", isRoom: true, spaceId: "s4-aula3" },
    { id: "n-s4-aula4", floor: "PB", x: 393, y: 108, label: "Aula 4", isRoom: true, spaceId: "s4-aula4" },
    { id: "n-s4-aula5", floor: "PB", x: 407, y: 108, label: "Aula 5", isRoom: true, spaceId: "s4-aula5" },
    { id: "n-s4-gastronomia-a", floor: "PB", x: 426, y: 108, label: "Gastronomía A", isRoom: true, spaceId: "s4-gastronomia-a" },
    { id: "n-s4-ifts", floor: "PB", x: 352, y: 126, label: "EPS - IFTS N° 5", isRoom: true, spaceId: "s4-ifts" },
    { id: "n-s4-preceptoria", floor: "PB", x: 367, y: 126, label: "Preceptoría EPS", isRoom: true, spaceId: "s4-preceptoria" },
    { id: "n-s4-baño-caballeros", floor: "PB", x: 381, y: 126, label: "Baño Caballeros", isRoom: true, spaceId: "s4-baño-caballeros" },
    { id: "n-s4-gastronomia-c", floor: "PB", x: 396, y: 126, label: "Gastronomía C", isRoom: true, spaceId: "s4-gastronomia-c" },
    { id: "n-s4-gastronomia-b", floor: "PB", x: 412, y: 126, label: "Gastronomía B", isRoom: true, spaceId: "s4-gastronomia-b" },
    { id: "n-s4-baño-damas", floor: "PB", x: 429, y: 126, label: "Baño Damas", isRoom: true, spaceId: "s4-baño-damas" },

    { id: "n-entrance-dragones", floor: "PB", x: 227, y: 161, label: "Entrada Dragones", isRoom: true, spaceId: "entrance-dragones" },
    { id: "n-entrance-ramsay", floor: "PB", x: 457, y: 117, label: "Entrada Ramsay", isRoom: true, spaceId: "entrance-ramsay" },
    { id: "n-meeting-point", floor: "PB", x: 270, y: 222, label: "Punto de Encuentro", isRoom: true, spaceId: "meeting-point" },

    // --- NODOS DE PASILLO (CONEXIONES INTERNAS DE TRANSICIÓN) ---
    // Pasillo Sector 1
    { id: "n-c-s1-entrance", floor: "PB", x: 259, y: 161, isRoom: false },
    { id: "n-c-s1-mid", floor: "PB", x: 259, y: 135, isRoom: false },
    { id: "n-c-s1-top", floor: "PB", x: 259, y: 112, isRoom: false },

    // Pasillo Sector 3
    { id: "n-c-s3-entrance", floor: "PB", x: 296, y: 186, isRoom: false },
    { id: "n-c-s3-mid-low", floor: "PB", x: 296, y: 165, isRoom: false },
    { id: "n-c-s3-mid-high", floor: "PB", x: 296, y: 135, isRoom: false },
    { id: "n-c-s3-top", floor: "PB", x: 296, y: 112, isRoom: false },

    // Pasillo Sector 4
    { id: "n-c-s4-entrance", floor: "PB", x: 344, y: 117, isRoom: false },
    { id: "n-c-s4-mid-low", floor: "PB", x: 375, y: 117, isRoom: false },
    { id: "n-c-s4-mid-high", floor: "PB", x: 410, y: 117, isRoom: false },
    { id: "n-c-s4-end", floor: "PB", x: 439, y: 117, isRoom: false },

    // Puntos de Patio y Circulación Exterior
    { id: "n-c-patio-meeting", floor: "PB", x: 270, y: 222, isRoom: false },
    { id: "n-c-patio-s2", floor: "PB", x: 186, y: 163, isRoom: false },
    { id: "n-c-patio-s1", floor: "PB", x: 235, y: 161, isRoom: false },
    { id: "n-c-patio-s3", floor: "PB", x: 296, y: 210, isRoom: false }
];

// --------------------------------------------------------------------------
// CONEXIONES (ENLACES) DEL GRAFO DE PLANTA BAJA CON PESOS EN METROS REALES
// --------------------------------------------------------------------------
export const LINKS = [
    // --- CONEXIONES SECTOR 1 ---
    { u: "n-s1-electricidad", v: "n-c-s1-entrance", weight: 2.16, accessible: true, desc: "Salir de Electricidad al pasillo central del Sector 1." },
    { u: "n-s1-herreria", v: "n-c-s1-mid", weight: 1.5, accessible: true, desc: "Salir del Taller de Herrería al pasillo del Sector 1." },
    { u: "n-s1-climatizacion", v: "n-c-s1-mid", weight: 1.5, accessible: true, desc: "Salir del espacio de Climatización al pasillo del Sector 1." },
    { u: "n-s1-serigrafia", v: "n-c-s1-top", weight: 1.5, accessible: true, desc: "Salir de Serigrafía al final del pasillo del Sector 1." },

    // Pasillo Sector 1
    { u: "n-c-s1-entrance", v: "n-c-s1-mid", weight: 9.20, accessible: true, desc: "Avanzar por el pasillo del Sector 1 hacia los talleres de Herrería y Climatización." },
    { u: "n-c-s1-mid", v: "n-c-s1-top", weight: 7.00, accessible: true, desc: "Continuar hacia el fondo del pasillo del Sector 1." },

    // --- CONEXIONES SECTOR 2 (Aulas externas) ---
    { u: "n-s2-carpinteria", v: "n-c-patio-s2", weight: 5.00, accessible: true, desc: "Salir del taller de Carpintería hacia la galería de acceso exterior." },
    { u: "n-s2-bicicleteria", v: "n-c-patio-s2", weight: 3.00, accessible: true, desc: "Salir de Bicicletería hacia la galería de acceso exterior." },

    // --- CONEXIONES SECTOR 3 ---
    { u: "n-s3-informes", v: "n-c-s3-mid-low", weight: 1.50, accessible: true, desc: "Salir de Informes - Regencia al pasillo central del Sector 3." },
    { u: "n-s3-secretaria", v: "n-c-s3-mid-low", weight: 1.50, accessible: true, desc: "Salir de Secretaría - Dirección al pasillo central del Sector 3." },
    { u: "n-s3-estudiantes", v: "n-c-s3-mid-high", weight: 1.50, accessible: true, desc: "Salir de la Oficina de Estudiantes al pasillo." },
    { u: "n-s3-personal", v: "n-c-s3-mid-high", weight: 1.50, accessible: true, desc: "Salir de la Sala de Personal al pasillo." },
    { u: "n-s3-dinamicos", v: "n-c-s3-mid-high", weight: 1.50, accessible: true, desc: "Salir de Talleres Dinámicos al pasillo." },
    { u: "n-s3-informatica-a", v: "n-c-s3-top", weight: 1.50, accessible: true, desc: "Salir de Informática A al corredor norte." },
    { u: "n-s3-informatica-b", v: "n-c-s3-mid-high", weight: 1.50, accessible: true, desc: "Salir de Informática B al pasillo." },
    { u: "n-s3-archivo", v: "n-c-s3-top", weight: 1.50, accessible: true, desc: "Salir de Archivo al corredor norte." },
    { u: "n-s3-tecnologico", v: "n-c-s3-entrance", weight: 1.50, accessible: true, desc: "Dirigirse desde el Espacio Tecnológico al ingreso del Sector 3." },

    // Pasillo Sector 3
    { u: "n-c-s3-entrance", v: "n-c-s3-mid-low", weight: 1.50, accessible: true, desc: "Avanzar por el pasillo de administración (Sector 3) hacia la zona de Regencia." },
    { u: "n-c-s3-mid-low", v: "n-c-s3-mid-high", weight: 3.07, accessible: true, desc: "Continuar por el pasillo hacia los laboratorios informáticos." },
    { u: "n-c-s3-mid-high", v: "n-c-s3-top", weight: 10.80, accessible: true, desc: "Avanzar hacia la zona norte de informática y archivos." },

    // --- CONEXIONES SECTOR 4 ---
    { u: "n-s4-aula1", v: "n-c-s4-entrance", weight: 1.50, accessible: true, desc: "Salir de Aula 1 al pasillo del Sector 4." },
    { u: "n-s4-ifts", v: "n-c-s4-entrance", weight: 1.50, accessible: true, desc: "Salir de la Oficina de E.P.S - IFTS al pasillo." },
    { u: "n-s4-aula2", v: "n-c-s4-entrance", weight: 3.96, accessible: true, desc: "Salir de Aula 2 al pasillo del Sector 4." },
    { u: "n-s4-preceptoria", v: "n-c-s4-entrance", weight: 3.30, accessible: true, desc: "Salir de Preceptoría al pasillo." },
    { u: "n-s4-aula3", v: "n-c-s4-mid-low", weight: 2.40, accessible: true, desc: "Salir de Aula 3 - SUM al pasillo." },
    { u: "n-s4-baño-caballeros", v: "n-c-s4-mid-low", weight: 1.50, accessible: true, desc: "Salir del Baño de Caballeros al pasillo." },
    { u: "n-s4-aula4", v: "n-c-s4-mid-low", weight: 5.70, accessible: true, desc: "Salir de Aula 4 al pasillo." },
    { u: "n-s4-gastronomia-c", v: "n-c-s4-mid-high", weight: 6.32, accessible: true, desc: "Salir de Gastronomía C al pasillo." },
    { u: "n-s4-aula5", v: "n-c-s4-mid-high", weight: 3.20, accessible: true, desc: "Salir de Aula 5 al pasillo." },
    { u: "n-s4-gastronomia-b", v: "n-c-s4-mid-high", weight: 4.00, accessible: true, desc: "Salir de Gastronomía B al pasillo." },
    { u: "n-s4-gastronomia-a", v: "n-c-s4-end", weight: 8.67, accessible: true, desc: "Salir de Gastronomía A al pasillo cerca de la salida." },
    { u: "n-s4-baño-damas", v: "n-c-s4-end", weight: 2.00, accessible: true, desc: "Salir de la zona lateral de baños al pasillo principal." },

    // Pasillo Sector 4
    { u: "n-c-s4-entrance", v: "n-c-s4-mid-low", weight: 10.50, accessible: true, desc: "Avanzar por el pasillo principal del Sector 4 hacia las aulas teóricas." },
    { u: "n-c-s4-mid-low", v: "n-c-s4-mid-high", weight: 10.00, accessible: true, desc: "Continuar por el pasillo hacia los talleres gastronómicos." },
    { u: "n-c-s4-mid-high", v: "n-c-s4-end", weight: 9.78, accessible: true, desc: "Avanzar por el pasillo hacia el acceso este (Calle Ramsay)." },

    // --- CONEXIONES EXTERIORES / PATIO ---
    { u: "n-c-patio-meeting", v: "n-c-patio-s2", weight: 12.00, accessible: true, desc: "Girar y caminar por el patio hacia la galería del Sector 2 (Carpintería)." },
    { u: "n-c-patio-meeting", v: "n-c-patio-s1", weight: 6.00, accessible: true, desc: "Caminar hacia la entrada del Sector 1." },
    { u: "n-c-patio-meeting", v: "n-c-patio-s3", weight: 4.00, accessible: true, desc: "Caminar hacia la galería y entrada del Sector 3 (Administración)." },

    { u: "n-c-patio-s1", v: "n-entrance-dragones", weight: 1.00, accessible: true, desc: "Avanzar hacia la Entrada de Calle Dragones." },
    { u: "n-c-patio-s1", v: "n-c-s1-entrance", weight: 2.00, accessible: true, desc: "Cruzar la puerta vidriada para entrar al Sector 1." },
    
    { u: "n-c-patio-s3", v: "n-c-s3-entrance", weight: 2.00, accessible: true, desc: "Cruzar la puerta vidriada para entrar al Sector 3." },
    { u: "n-c-s3-entrance", v: "n-c-s4-entrance", weight: 8.00, accessible: true, desc: "Girar hacia la derecha por la galería de interconexión para ir al pasillo del Sector 4." },
    
    { u: "n-c-s4-end", v: "n-entrance-ramsay", weight: 2.00, accessible: true, desc: "Cruzar el portón de salida hacia la Entrada de Calle Ramsay." },
    { u: "n-meeting-point", v: "n-c-patio-meeting", weight: 1.00, accessible: true, desc: "Moverse de la cartelera al centro del patio." }
];

// --------------------------------------------------------------------------
// BASE DE DATOS DE UBICACIONES QR DE EJEMPLO REALES
// --------------------------------------------------------------------------
export const QR_LOCATIONS = [
    { id: "meeting-point", name: "QR Cartelera Central ('Estás aquí')" },
    { id: "entrance-dragones", name: "QR Pared Entrada Dragones" },
    { id: "s1-electricidad", name: "QR Marco de Puerta Taller Electricidad (S1)" },
    { id: "s2-carpinteria", name: "QR Pared Taller Carpintería (S2)" },
    { id: "s3-informes", name: "QR Entrada Oficina Informes S3" },
    { id: "s4-gastronomia-a", name: "QR Marco de Puerta Cocina Gastronomía A (S4)" }
];

// --------------------------------------------------------------------------
// HISTORIAS SOCIALES (INDICACIONES DE ANTICIPACIÓN Y PREVENCIÓN - PDF OFICIAL)
// --------------------------------------------------------------------------
export const SOCIAL_HISTORIES = {
    // Herrería, Climatización, Carpintería
    "s1-herreria": {
        rules: [
            "Ingreso al taller con cuidado.",
            "Preparo los elementos de protección personal (lentes/protección ocular).",
            "Me posiciono en mi lugar de trabajo.",
            "Espero las indicaciones del instructor/a."
        ]
    },
    "s1-climatizacion": {
        rules: [
            "Ingreso al taller con cuidado.",
            "Preparo los elementos de protección personal.",
            "Me posiciono en mi lugar de trabajo.",
            "Espero las indicaciones del instructor/a."
        ]
    },
    "s2-carpinteria": {
        rules: [
            "Ingreso al taller con cuidado.",
            "Preparo los elementos de protección personal (mascarillas y lentes).",
            "Me posiciono en mi lugar de trabajo.",
            "Espero las indicaciones del instructor/a."
        ]
    },

    // Gastronomía A, B, C
    "s4-gastronomia-a": {
        rules: [
            "Ingreso al sector con cuidado.",
            "Me lavo las manos, me coloco la cofia y el delantal obligatorio.",
            "Me posiciono en mi lugar de trabajo.",
            "Espero las indicaciones del instructor/a."
        ]
    },
    "s4-gastronomia-b": {
        rules: [
            "Ingreso al sector con cuidado.",
            "Me lavo las manos, me coloco la cofia y el delantal obligatorio.",
            "Me posiciono en mi lugar de trabajo.",
            "Espero las indicaciones del instructor/a."
        ]
    },
    "s4-gastronomia-c": {
        rules: [
            "Ingreso al sector con cuidado.",
            "Me lavo las manos, me coloco la cofia y el delantal obligatorio.",
            "Me posiciono en mi lugar de trabajo.",
            "Espero las indicaciones del instructor/a."
        ]
    },

    // Electricidad, Serigrafía, Bicicletería, Talleres Dinámicos
    "s1-electricidad": {
        rules: [
            "Ingreso al taller con cuidado.",
            "Me posiciono en mi lugar de trabajo (con herramientas aisladas).",
            "Espero las indicaciones del instructor/a."
        ]
    },
    "s1-serigrafia": {
        rules: [
            "Ingreso al taller con cuidado.",
            "Me posiciono en mi lugar de trabajo.",
            "Espero las indicaciones del instructor/a."
        ]
    },
    "s2-bicicleteria": {
        rules: [
            "Ingreso al taller con cuidado.",
            "Me posiciono en mi lugar de trabajo.",
            "Espero las indicaciones del instructor/a."
        ]
    },
    "s3-dinamicos": {
        rules: [
            "Ingreso al taller con cuidado.",
            "Me posiciono en mi lugar de trabajo.",
            "Espero las indicaciones del instructor/a."
        ]
    },

    // Laboratorio A y B
    "s3-informatica-a": {
        rules: [
            "Ingreso al laboratorio con cuidado.",
            "Me siento en mi lugar de trabajo (frente a la computadora).",
            "Espero las indicaciones del instructor/a antes de comenzar a usar el equipo."
        ]
    },
    "s3-informatica-b": {
        rules: [
            "Ingreso al laboratorio con cuidado.",
            "Me siento en mi lugar de trabajo (frente a la computadora).",
            "Espero las indicaciones del instructor/a antes de comenzar a usar el equipo."
        ]
    },

    // Aulas y Espacio Tecnológico
    "s3-tecnologico": {
        rules: [
            "Ingreso al aula con cuidado.",
            "Me posiciono en el lugar asignado.",
            "Espero las indicaciones del instructor/a y o el docente."
        ]
    },
    "s4-aula1": {
        rules: [
            "Ingreso al aula con cuidado.",
            "Me posiciono en el lugar asignado.",
            "Espero las indicaciones del instructor/a y o el docente."
        ]
    },
    "s4-aula2": {
        rules: [
            "Ingreso al aula con cuidado.",
            "Me posiciono en el lugar asignado.",
            "Espero las indicaciones del instructor/a y o el docente."
        ]
    },
    "s4-aula3": {
        rules: [
            "Ingreso al aula con cuidado.",
            "Me posiciono en el lugar asignado.",
            "Espero las indicaciones del instructor/a y o el docente."
        ]
    },
    "s4-aula4": {
        rules: [
            "Ingreso al aula con cuidado.",
            "Me posiciono en el lugar asignado.",
            "Espero las indicaciones del instructor/a y o el docente."
        ]
    },
    "s4-aula5": {
        rules: [
            "Ingreso al aula con cuidado.",
            "Me posiciono en el lugar asignado.",
            "Espero las indicaciones del instructor/a y o el docente."
        ]
    },

    // Informes
    "s3-informes": {
        rules: [
            "Ingreso al área de Informes con calma.",
            "Espero mi turno en el lugar indicado.",
            "Cuando me atienden, pregunto lo que necesito."
        ]
    },

    // Oficina de Estudiantes e IFTS
    "s3-estudiantes": {
        rules: [
            "Hago la fila o me siento a esperar mi turno.",
            "Cuando me atiendan, comunico mi necesidad."
        ]
    },
    "s4-ifts": {
        rules: [
            "Hago la fila o me siento a esperar mi turno.",
            "Cuando me atiendan, comunico mi necesidad."
        ]
    },

    // Preceptoría
    "s4-preceptoria": {
        rules: [
            "Ingreso a Preceptoría de forma ordenada.",
            "Espero mi turno.",
            "Realizo mi consulta o aviso mi necesidad con claridad."
        ]
    }
};

// --------------------------------------------------------------------------
// BASE DE DATOS INICIAL DE CURSOS REALES Y HABILITADOS
// --------------------------------------------------------------------------
export const INITIAL_COURSES = [
    {
        id: "cur-1",
        name: "Gastronomía Profesional I",
        sector: "Sector S4",
        spaceId: "s4-gastronomia-a",
        status: "Activo",
        schedule: "Lunes y Miércoles 18:30 - 22:30",
        teacher: "Chef Carlos Bianchi"
    },
    {
        id: "cur-2",
        name: "Diseño y Maquetado Web (HTML/CSS)",
        sector: "Sector S3",
        spaceId: "s3-informatica-a",
        status: "Activo",
        schedule: "Viernes 18:30 - 22:30",
        teacher: "Ing. Laura Martínez"
    },
    {
        id: "cur-3",
        name: "Instalaciones Eléctricas Domiciliarias",
        sector: "Sector S1",
        spaceId: "s1-electricidad",
        status: "Activo",
        schedule: "Lunes a Jueves 08:30 - 11:30",
        teacher: "Téc. Roberto Gómez"
    },
    {
        id: "cur-4",
        name: "Carpintería Básica y Ensambles",
        sector: "Sector S2",
        spaceId: "s2-carpinteria",
        status: "Activo",
        schedule: "Sábados 09:00 - 13:00",
        teacher: "José Carpintero"
    }
];

// --------------------------------------------------------------------------
// BASE DE DATOS INICIAL DE USUARIOS DE LA PLATAFORMA
// --------------------------------------------------------------------------
export const INITIAL_USERS = [
    {
        username: "admin",
        fullName: "Director de Gestión CFP7",
        role: "Administrador",
        status: "Activo"
    },
    {
        username: "cbianchi",
        fullName: "Chef Carlos Bianchi",
        role: "Docente",
        status: "Activo"
    },
    {
        username: "lmartinez",
        fullName: "Ing. Laura Martínez",
        role: "Docente",
        status: "Activo"
    },
    {
        username: "rgomez",
        fullName: "Téc. Roberto Gómez",
        role: "Docente",
        status: "Activo"
    }
];

// --------------------------------------------------------------------------
// PANORAMAS VIRTUALES (MOCK DE ESCENAS 360 PARA EL VISOR MARZIPANO)
// --------------------------------------------------------------------------
export const PANORAMAS = {
    "entrance-dragones": "https://www.marzipano.net/demos/sample-tour/tiles/entrance/{z}/{f}/{y}/{x}.jpg",
    "entrance-ramsay": "https://www.marzipano.net/demos/sample-tour/tiles/entrance/{z}/{f}/{y}/{x}.jpg",
    "meeting-point": "https://www.marzipano.net/demos/sample-tour/tiles/entrance/{z}/{f}/{y}/{x}.jpg",
    "s1-electricidad": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s1-herreria": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s1-climatizacion": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s1-serigrafia": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s2-carpinteria": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s2-bicicleteria": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s3-informes": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s3-secretaria": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s3-estudiantes": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s3-personal": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s3-dinamicos": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s3-informatica-a": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s3-informatica-b": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s3-archivo": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s3-tecnologico": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s4-aula1": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s4-aula2": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s4-aula3": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s4-aula4": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s4-aula5": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s4-gastronomia-a": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s4-ifts": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s4-preceptoria": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s4-baño-caballeros": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s4-gastronomia-c": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s4-gastronomia-b": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg",
    "s4-baño-damas": "https://www.marzipano.net/demos/sample-tour/tiles/art-gallery/{z}/{f}/{y}/{x}.jpg"
};
