const colors = {
    blue: "rgba(57,81,159,0.3)",
    orange:"rgba(117,40,10,0.3)",
    red:"rgba(255,0,0,0.3)",
    yellow:"rgba(255,153,0,0.3)",
    green:"rgba(107,138,69,0.3)",
    purple: "rgba(56,34,84,0.3)"
}

export const resourcesPerso = [
    {
      fieldName: "ownerP",
      title: "ownerP",
      instances: [
        { text: "Suivi de mes projets", id: 1, color: "rgb(47,44,54, 0.8)" },
        { text: "Tâches qui me sont affectées", id: 2, color: "rgb(126,55,47,0.8)"},
      ],
    },
  ];

export const resources = [
    {
      fieldName: "jalons",
      title: "Jalons",
      instances: [
        { text: "Jalon1", id: 1, color: colors.blue },
        { text: "Jalon2", id: 2, color: colors.orange },
        { text: "Jalon3", id: 3, color: colors.red },
        { text: "Jalon4", id: 4, color: colors.yellow },
        { text: "Jalon5", id: 5, color: colors.green },
        { text: "Jalon6", id: 6, color: colors.purple },
      ],
    },
  ];