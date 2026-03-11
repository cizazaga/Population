// Per-person default items, role-aware
// roles: ["runner"] | ["driver"] | ["runner", "driver"] (both)
export const DEFAULT_PERSONAL_ITEMS = [
  // All roles
  { label: "ID and emergency contact card", roles: ["runner", "driver"] },
  { label: "Personal water bottle (min 750ml)", roles: ["runner", "driver"] },
  { label: "Energy gels or snacks for your leg", roles: ["runner", "driver"] },
  { label: "Sunscreen SPF 50+", roles: ["runner", "driver"] },
  { label: "Hat or visor", roles: ["runner", "driver"] },
  { label: "Sunglasses", roles: ["runner", "driver"] },
  { label: "Charged personal phone", roles: ["runner", "driver"] },
  { label: "Headlamp or reflective vest (if night leg)", roles: ["runner", "driver"] },
  { label: "Cash (small bills for emergencies)", roles: ["runner", "driver"] },
  { label: "Race bib / team identifier", roles: ["runner", "driver"] },
  { label: "Signed medical / liability waiver", roles: ["runner", "driver"] },

  // Runner-only
  { label: "Trail / road running shoes", roles: ["runner"] },
  { label: "Compression socks or calf sleeves", roles: ["runner"] },
  { label: "GPS watch or running tracker", roles: ["runner"] },
  { label: "Printed / digital leg map and distance", roles: ["runner"] },
  { label: "Blister kit (moleskin, tape)", roles: ["runner"] },
  { label: "Anti-chafe balm (BodyGlide, Vaseline)", roles: ["runner"] },

  // Driver-only
  { label: "Driver's license", roles: ["driver"] },
  { label: "Vehicle registration and insurance docs", roles: ["driver"] },
  { label: "Paper map of full 230km route with checkpoints", roles: ["driver"] },
  { label: "Car charger / power bank in vehicle", roles: ["driver"] },
  { label: "First aid kit loaded in vehicle", roles: ["driver"] },
  { label: "Cooler with drinks and snacks for runners", roles: ["driver"] },
  { label: "Fuel tank at least 3/4 full before race start", roles: ["driver"] },
  { label: "Runner tracker app installed and location shared", roles: ["driver"] },
];

// Team-wide default items (one set for the whole team)
export const DEFAULT_TEAM_ITEMS = [
  "Race entry confirmation / bib packet picked up",
  "Team WhatsApp group created with all members",
  "Exchange zone locations saved in GPS / Maps",
  "Leg assignments sheet shared with everyone",
  "Support vehicle clearly labeled with team name",
  "Emergency contact list shared with all members",
  "Team first aid kit assembled",
  "Extra water jugs (10L+) in support vehicle",
  "Spare battery pack charged for team use",
  "Team banner or flag for exchange zones",
  "Post-race meal or restaurant booked",
  "Hotel / accommodation confirmed for all nights",
  "Race rules and full route booklet downloaded",
  "Photographer or GoPro mount assigned",
  "Walkie-talkie or group radio channel agreed",
];
