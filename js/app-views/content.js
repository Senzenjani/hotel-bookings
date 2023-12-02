export const content_view = [
  {
    title: "User-dashboard",
    state: "user_dashbaord",
    links: [
      "views/dashboards/admin.html",
      "views/dashboards/health-personel.html",
    ],
    modals: ["views/modals/user.html"]
  },
  {
    title: "Map",
    state: "map",
    link:  "views/map-view.html",
    modals: ["views/modals/user.html"]
  },
  {
    title: "Overall Dashboard",
    state: "dashboard",
    link:  "views/dashboard.html",
    modals: ["views/modals/user.html"]
  },
  {
    title: "Tabular Stats",
    state: "tabular_stats",
    link:  "views/tabular-stats.html",
    modals: ["views/modals/user.html"]
  },
  {
    title: "Facilities",
    state: "facilities",
    link:  "views/user-management/facilities.html",
    modals: ["views/modals/facility.html"]
  },
  {
    title: "Users",
    state: "users",
    link:  "views/user-management/users.html",
    modals: ["views/modals/user.html"]
  },
  {
    title: "Clients",
    state: "clients",
    link:  "views/case-management/clients.html",
    modals: ["views/modals/clients.html"]
  },
  {
    title: "Cases",
    state: "cases",
    link:  "views/case-management/cases.html",
    modals: ["views/modals/cases.html"]
  }
];
