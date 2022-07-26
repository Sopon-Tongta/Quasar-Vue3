const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "index",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/receiveOrder",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/receiveOrder",
        name: "receiveOrder",
        component: () => import("src/pages/ReceiveOrder/ReceiveOrder.vue"),
      },
    ],
  },
  {
    path: "/createReceiveOrder",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/createReceiveOrder",
        name: "createReceiveOrder",
        component: () =>
          import("src/pages/ReceiveOrder/CreateReceiveOrder.vue"),
      },
    ],
  },
  {
    path: "/editReceiveOrder",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/editReceiveOrder",
        name: "editReceiveOrder",
        component: () => import("src/pages/ReceiveOrder/EditReceiveOrder.vue"),
      },
    ],
  },
  {
    path: "/transferIn",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/transferIn",
        name: "transferIn",
        component: () => import("pages/TransferIn.vue"),
      },
    ],
  },
  {
    path: "/transferOut",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/transferOut",
        name: "transferOut",
        component: () => import("pages/TransferOut.vue"),
      },
    ],
  },
  {
    path: "/location",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/location",
        name: "location",
        component: () => import("src/pages/masters/location/Location.vue"),
      },
    ],
  },
  {
    path: "/locationEdit",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/locationEdit",
        name: "locationEdit",
        component: () => import("src/pages/masters/location/LocationEdit.vue"),
      },
    ],
  },
  {
    path: "/vehicle",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/vehicle",
        name: "vehicle",
        component: () => import("src/pages/masters/vehicle/Vehicle.vue"),
      },
    ],
  },
  {
    path: "/about",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/about",
        name: "about",
        component: () => import("src/pages/About.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
