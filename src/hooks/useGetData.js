import { ref, onMounted } from "vue";

function useGetDateLocation() {
  const locationList = ref([]);
  const locationTotal = ref(0);

  function searchLocation(locationCode, locationName, pageNum, pageSize) {
    fetch(
      `https://ftddev.apps.thaibev.com/RedNodeApi/LocationMaster/v1/GetLocation`,
      {
        method: "POST",
        headers: {
          tenant: "test",
          location: "test",
          contact: "test",
          signature: 999,
          sender: "test",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domainId: 13,
          locationCode: locationCode,
          locationName: locationName,
          lat: 0,
          lng: 0,
          openTime: "00:00:00",
          closeTime: "00:00:00",
          tihiPermit: 0,
          maxWheel: 0,
          vehicleCode: "",
          locationGroupCode: "",
          locationGroupName: "",
          pageNum: pageNum,
          pageSize: pageSize,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        locationList.value = resJson.rows;
        locationTotal.value = resJson.total;
      });
  }

  onMounted(() => {});

  return { locationList, locationTotal, searchLocation };
}

export default { useGetDateLocation };
