import { ref } from "vue";

function useReceiveOrder() {
  const receiveOrderList = ref([]);
  const receiveOrderTotal = ref(0);

  function saveReceiveOrder(newOrder) {
    let localOrder = [];
    let localOrderJson = localStorage.getItem("ReceiveOrder");

    if (localOrderJson !== null) {
      localOrder = JSON.parse(localOrderJson);
      const isFound = localOrder.some((data) => {
        if (data.orderId == newOrder.orderId) {
          return true;
        }
        return false;
      });

      if (isFound) {
        localOrder.map((data) => {
          if (data.orderId == newOrder.orderId) {
            data.receiptNo = newOrder.receiptNo;
            data.owner = newOrder.owner;
            data.refNo = newOrder.refNo;
            data.orderType = newOrder.orderType;
            data.wareHouse = newOrder.wareHouse;
            data.supplierId = newOrder.supplierId;
            data.supplierName = newOrder.supplierName;
            data.docDate = newOrder.docDate;
            data.receiptDate = newOrder.receiptDate;
            data.status = newOrder.status;
          }
          return data;
        });
      } else {
        localOrder.push(newOrder);
      }
    } else {
      localOrder.push(newOrder);
    }
    localStorage.setItem("ReceiveOrder", JSON.stringify(localOrder));
  }

  function deleteReceiveOrder(orderRemoveList) {
    let localOrderJson = localStorage.getItem("ReceiveOrder");

    if (localOrderJson !== null) {
      let localOrder = JSON.parse(localOrderJson);
      orderRemoveList.forEach((rm) => {
        localOrder = localOrder.filter((data) => {
          return data.orderId !== rm.orderId;
        });
      });
      localStorage.setItem("ReceiveOrder", JSON.stringify(localOrder));
    }
  }

  function searchReceiveOrder(
    status,
    owner,
    orderType,
    receiptNo,
    refNo,
    supplier,
    page,
    pageSize
  ) {
    status = status == null ? "all" : status.toLowerCase();
    owner = owner == null ? "" : owner.toLowerCase();
    orderType = orderType == null ? "" : orderType.toLowerCase();
    receiptNo = receiptNo == null ? "" : receiptNo.toLowerCase();
    refNo = refNo == null ? "" : refNo.toLowerCase();
    supplier = supplier == null ? "" : supplier.toLowerCase();

    let localOrder = [];
    let localOrderJson = localStorage.getItem("ReceiveOrder");
    if (localOrderJson !== null) {
      localOrder = JSON.parse(localOrderJson);
      localOrder = localOrder.filter((data) => {
        return (
          data.status.toLowerCase() ==
          (status == "all" ? data.status.toLowerCase() : status)
        );
      });

      localOrder = localOrder.filter((data) => {
        return (
          data.owner.toLowerCase() ==
          (owner == "" ? data.owner.toLowerCase() : owner)
        );
      });

      localOrder = localOrder.filter((data) => {
        return (
          data.orderType.toLowerCase() ==
          (orderType == "" ? data.orderType.toLowerCase() : orderType)
        );
      });

      localOrder = localOrder.filter((data) => {
        return (
          data.receiptNo.toLowerCase() ==
          (receiptNo == "" ? data.receiptNo.toLowerCase() : receiptNo)
        );
      });

      localOrder = localOrder.filter((data) => {
        return (
          data.refNo.toLowerCase() ==
          (refNo == "" ? data.refNo.toLowerCase() : refNo)
        );
      });

      localOrder = localOrder.filter((data) => {
        return (
          data.supplierName.toLowerCase() ==
          (supplier == "" ? data.supplierName.toLowerCase() : supplier)
        );
      });
    }

    let total = localOrder.length;
    let finalPage = page * pageSize;
    let firstPage = finalPage - (pageSize - 1);
    finalPage = finalPage > total ? total : finalPage;

    receiveOrderList.value = localOrder.slice(firstPage - 1, finalPage);
    receiveOrderTotal.value = total;
  }

  return {
    receiveOrderList,
    receiveOrderTotal,
    saveReceiveOrder,
    deleteReceiveOrder,
    searchReceiveOrder,
  };
}

function useReceiveItem() {
  const receiveItemList = ref([]);

  function saveReceiveItem(newItem) {
    let localItem = [];
    let localItemJson = localStorage.getItem("ReceiveItem");

    if (localItemJson !== null) {
      localItem = JSON.parse(localItemJson);
      const isFound = localItem.some((data) => {
        if (
          data.orderId == newItem.orderId &&
          data.itemCode == newItem.itemCode
        ) {
          return true;
        }
        return false;
      });

      if (isFound) {
        localItem.map((data) => {
          if (
            data.orderId == newItem.orderId &&
            data.itemCode == newItem.itemCode
          ) {
            data.itemName = newItem.itemName;
            data.zone = newItem.zone;
            data.qty = newItem.qty;
            data.uom = newItem.uom;
            data.loc = newItem.loc;
            data.palletNo = newItem.palletNo;
            data.status = newItem.status;
          }
          return data;
        });
      } else {
        localItem.push(newItem);
      }
    } else {
      localItem.push(newItem);
    }

    localStorage.setItem("ReceiveItem", JSON.stringify(localItem));

    const localItemResult = localItem.filter((data) => {
      return data.orderId == newItem.orderId;
    });
    receiveItemList.value = localItemResult;
  }

  function deleteReceiveItem(itemRemoveList) {
    let localItemJson = localStorage.getItem("ReceiveItem");

    if (localItemJson !== null) {
      let localItem = JSON.parse(localItemJson);
      itemRemoveList.forEach((rm) => {
        localItem = localItem.filter((data) => {
          return data.orderId !== rm.orderId || data.itemCode !== rm.itemCode;
        });
      });
      localStorage.setItem("ReceiveItem", JSON.stringify(localItem));
      receiveItemList.value = localItem;
    }
  }

  function deleteAllReceiveItem(orderId) {
    let localItemJson = localStorage.getItem("ReceiveItem");

    if (localItemJson !== null) {
      let localItem = JSON.parse(localItemJson);
      localItem = localItem.filter((data) => {
        return data.orderId !== orderId;
      });
      localStorage.setItem("ReceiveItem", JSON.stringify(localItem));
      receiveItemList.value = localItem;
    }
  }

  function searchReceiveItem(orderId) {
    let localItemJson = localStorage.getItem("ReceiveItem");
    if (localItemJson !== null) {
      let localItem = JSON.parse(localItemJson);
      localItem = localItem.filter((data) => {
        return data.orderId == orderId;
      });
      receiveItemList.value = localItem;
    } else {
      receiveItemList.value = [];
    }
  }

  return {
    receiveItemList,
    saveReceiveItem,
    deleteReceiveItem,
    deleteAllReceiveItem,
    searchReceiveItem,
  };
}

export default { useReceiveOrder, useReceiveItem };
