export type WorkerProfile = {
  id: string;
  name: string;
  role: string;
  city: string;
  experience: string;
  rating: string;
  status: string;
  score: string;
  bio: string;
};

export type DemoMission = {
  id: string;
  title: string;
  city: string;
  budget: string;
  schedule: string;
  description: string;
};

export type DemoState = {
  profiles: WorkerProfile[];
  missions: DemoMission[];
  contacts: string[];
  hires: string[];
  applications: string[];
};

const initialState: DemoState = {
  profiles: [
    {
      id: "mariam-d",
      name: "Mariam D.",
      role: "Nounou expérimentée",
      city: "Abidjan",
      experience: "5 ans",
      rating: "4,9/5",
      status: "Vérifiée",
      score: "96%",
      bio: "Expérience en garde d’enfants, préparation des repas et accompagnement scolaire. Références vérifiées.",
    },
    {
      id: "aicha-k",
      name: "Aïcha K.",
      role: "Femme de ménage",
      city: "Dakar",
      experience: "4 ans",
      rating: "4,8/5",
      status: "Très fiable",
      score: "92%",
      bio: "Entretien complet du domicile et organisation quotidienne. Disponible en semaine.",
    },
    {
      id: "rosine-t",
      name: "Rosine T.",
      role: "Aide à domicile",
      city: "Lomé",
      experience: "6 ans",
      rating: "4,7/5",
      status: "À proximité",
      score: "89%",
      bio: "Accompagnement des personnes âgées, courses et aide dans les tâches quotidiennes.",
    },
    {
      id: "fatou-s",
      name: "Fatou S.",
      role: "Garde d’enfants",
      city: "Accra",
      experience: "3 ans",
      rating: "4,9/5",
      status: "Disponible",
      score: "94%",
      bio: "Garde d’enfants et activités d’éveil. Disponible à temps plein.",
    },
  ],
  missions: [
    {
      id: "mission-demo-1",
      title: "Garde d’enfants",
      city: "Abidjan",
      budget: "220 000 FCFA",
      schedule: "Temps plein",
      description: "Garde de deux enfants et accompagnement après l’école.",
    },
    {
      id: "mission-demo-2",
      title: "Ménage complet",
      city: "Dakar",
      budget: "180 000 FCFA",
      schedule: "Du lundi au vendredi",
      description: "Entretien du domicile et aide à la préparation des repas.",
    },
    {
      id: "mission-demo-3",
      title: "Aide à domicile",
      city: "Accra",
      budget: "260 000 FCFA",
      schedule: "Temps partiel",
      description: "Accompagnement quotidien et aide aux courses.",
    },
  ],
  contacts: [],
  hires: [],
  applications: [],
};

export function createInitialDemoState(): DemoState {
  return structuredClone(initialState);
}

export function readDemoState(): DemoState {
  try {
    const stored = window.localStorage.getItem("domesticare-demo");
    if (!stored) return createInitialDemoState();

    const parsed: unknown = JSON.parse(stored);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "profiles" in parsed &&
      "missions" in parsed &&
      "contacts" in parsed &&
      "hires" in parsed &&
      "applications" in parsed
    ) {
      return parsed as DemoState;
    }
  } catch {
    return createInitialDemoState();
  }

  return createInitialDemoState();
}

export function saveDemoState(state: DemoState) {
  window.localStorage.setItem("domesticare-demo", JSON.stringify(state));
}