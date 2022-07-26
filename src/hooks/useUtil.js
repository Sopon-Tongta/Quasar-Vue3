import { ref } from "vue";

function uid() {
  let a = new Uint32Array(3);
  window.crypto.getRandomValues(a);
  return (
    performance.now().toString(36) +
    Array.from(a)
      .map((A) => A.toString(36))
      .join("")
  ).replace(/\./g, "");
}

function useMenu() {
  const listMenu = ref([]);

  function getMenu() {
    setTimeout(() => {
      listMenu.value = [
        {
          menuId: 1,
          parentId: 0,
          label: "หน้าหลัก",
          name: "index",
          path: "/",
          clickable: true,
          disable: false,
          childMenu: true,
          childItem: [
            {
              menuId: 2,
              parentId: 1,
              label: "Receive Order",
              name: "receiveOrder",
              path: "/receiveOrder",
              clickable: true,
              disable: false,
              childMenu: false,
              childItem: [
                {
                  menuId: 11,
                  parentId: 2,
                  label: "Create Receive Order",
                  name: "createReceiveOrder",
                  path: "/createReceiveOrder",
                  clickable: true,
                  disable: false,
                  childMenu: false,
                },
                {
                  menuId: 12,
                  parentId: 2,
                  label: "Edit Receive Order",
                  name: "editReceiveOrder",
                  path: "/editReceiveOrder",
                  clickable: true,
                  disable: false,
                  childMenu: false,
                },
              ],
            },
            {
              menuId: 3,
              parentId: 1,
              label: "Transfer IN",
              name: "transferIn",
              path: "/transferIn",
              clickable: true,
              disable: false,
              childMenu: false,
              childItem: [],
            },
            {
              menuId: 4,
              parentId: 1,
              label: "Transfer Out",
              name: "transferOut",
              path: "/transferOut",
              clickable: true,
              disable: false,
              childMenu: false,
              childItem: [],
            },
            {
              menuId: 5,
              parentId: 1,
              label: "Master",
              name: "index",
              path: "/",
              clickable: true,
              disable: false,
              childMenu: true,
              childItem: [
                {
                  menuId: 7,
                  parentId: 5,
                  label: "Location",
                  name: "location",
                  path: "/location",
                  clickable: true,
                  disable: false,
                  childMenu: false,
                  childItem: [
                    {
                      menuId: 10,
                      parentId: 7,
                      label: "LocationEdit",
                      name: "locationEdit",
                      path: "/locationEdit",
                      clickable: true,
                      disable: false,
                      childMenu: false,
                    },
                  ],
                },
                {
                  menuId: 8,
                  parentId: 5,
                  label: "Vehicle",
                  name: "vehicle",
                  path: "/vehicle",
                  clickable: true,
                  disable: false,
                  childMenu: false,
                },
                {
                  menuId: 9,
                  parentId: 5,
                  label: "Customer",
                  name: "index",
                  path: "/",
                  clickable: false,
                  disable: true,
                  childMenu: false,
                },
              ],
            },
            {
              menuId: 6,
              parentId: 1,
              label: "About",
              name: "about",
              path: "/about",
              clickable: true,
              disable: false,
              childMenu: false,
              childItem: [],
            },
          ],
        },
      ];
    }, 1000);
  }

  return { listMenu, getMenu };
}

function useOwner() {
  const ownerList = ref([]);
  function getOwnerList() {
    ownerList.value = ["", "Thaibev", "Sermsuk", "HAVI", "OISHI", "CVM", "TBL"];
  }
  return { ownerList, getOwnerList };
}

function useOrderType() {
  const orderTypeList = ref([]);
  function getOrderTypeList() {
    orderTypeList.value = ["", "Normal", "Return", "ADHOC"];
  }
  return { orderTypeList, getOrderTypeList };
}

export default { uid, useMenu, useOwner, useOrderType };
