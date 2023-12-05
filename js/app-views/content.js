export const content_view = [
  {
    title: "dashboard",
    state: "dashboard",
    link:  "views/dashboard.html",
    modals: ["views/modals/user.html"]
  },
  {
    title: "Response Actions",
    state: "response_actions",
    link:  "views/responses.html",
    modals: ["views/modal/responses.html"]
  },
  {
    title: "Intrusions",
    state: "intrusions",
    link:  "views/intrusions.html",
    modals: ["views/modals/intrusions.html","views/modals/responses.html"]
  },
  {
    title: "Network Events",
    state: "network_events",
    link:  "views/network-events.html",
    modals: ["views/modals/network-events.html", "views/modals/intrusions.html"]
  },
  {
    title: "Events",
    state: "events",
    link:  "views/events.html",
    modals: ["views/modals/events.html"]
  },
  {
    title: "Devices",
    state: "devices",
    link:  "views/devices.html",
    modals: ["views/modals/devices.html"]
  },
  {
    title: "Custodians",
    state: "custodians",
    link:  "views/custodians.html",
    modals: ["views/modals/custodian.html","views/modals/devices.html"]
  },
  {
    title: "Users",
    state: "users",
    link:  "views/user-management/users.html",
    modals: ["views/modals/user.html"]
  }
];
