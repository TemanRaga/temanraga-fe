import React, { useState, useEffect } from "react";

import {
  Stack,
  Container,
  VStack,
  Text,
  Input,
  Flex,
  Spacer,
  Box,
  Checkbox,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Card } from "../../common/components";
import { localEnv, serverEnv } from "../../common/constant/env";
import axios from "axios";
import Router from "next/router";

export default function Event() {
  const [useGeolocation, setUseGeolocation] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  // States
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [filterState, setFilterState] = useState({
    location: "",
    activity: "",
    gender: 2,
  });

  const [activitySearchText, setActivitySearchText] =
    useState("Semua aktivitas");
  const [locationSearchText, setLocationSearchText] = useState("semua lokasi");
  const [filterText, setFilterText] = useState({
    activity: "Semua aktivitas",
    location: "semua lokasi",
  });

  // Handler
  const handleFetchData = () => {
    let config = {
      url: `${serverEnv}/api/v1/events/`,
      method: "GET",
    };
    axios(config)
      .then((res) => {
        let datas = res.data;
        let list = datas.data;
        setData(list);
        setShowData(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilter = () => {
    if (filterState.activity !== "" && filterState.location !== "") {
      setFilterText({
        ...filterText,
        activity: `Hasil pencarian dari "${filterState.activity}"`,
        location: `${filterState.location}`,
      });

      let filteredData = data.filter(
        (ctx) =>
          ctx.name
            .toLowerCase()
            .includes(filterState.activity.toLocaleLowerCase()) &&
          ctx.location
            .toLowerCase()
            .includes(filterState.location.toLocaleLowerCase())
      );
      setShowData(filteredData);
    } else if (filterState.activity !== "" && useGeolocation) {
      setFilterText({
        ...filterText,
        location: `lokasi terdekatmu`,
        activity: `Hasil pencarian dari "${filterState.activity}"`,
      });

      let filteredData = data.filter((ctx) =>
        ctx.name
          .toLowerCase()
          .includes(filterState.activity.toLocaleLowerCase())
      );

      setShowData(filteredData);
    } else if (filterState.activity !== "" && !useGeolocation) {
      setFilterText({
        ...filterText,
        location: `semua lokasi`,
        activity: `Hasil pencarian dari "${filterState.activity}"`,
      });

      let filteredData = data.filter((ctx) =>
        ctx.name
          .toLowerCase()
          .includes(filterState.activity.toLocaleLowerCase())
      );

      setShowData(filteredData);
    } else if (filterState.location !== "") {
      setFilterText({
        ...filterText,
        location: `${filterState.location}`,
      });

      let filteredData = data.filter((ctx) =>
        ctx.location
          .toLowerCase()
          .includes(filterState.location.toLocaleLowerCase())
      );
      setShowData(filteredData);
    } else if (useGeolocation) {
      setFilterText({
        ...filterText,
        activity: `Semua aktivitas`,
        location: `lokasi terdekatmu`,
      });
      setShowData(data);
    } else {
      setFilterText({
        ...filterText,
        activity: `Semua aktivitas`,
        location: `semua lokasi`,
      });
      setShowData(data);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setUseGeolocation(true);
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  // UseEffect
  useEffect(() => {
    handleFetchData();
    handleGetLocation();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [filterState]);

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" p="0px">
        <Flex flexDirection="column" px="18%" py="5%">
          <Text fontSize="3xl" textAlign="center" mb="2%" fontWeight="semibold">
            Aktivitas
          </Text>
          <Flex
            flexDirection="row"
            border="1px solid #C0C0C0"
            borderRadius="10px"
            px="25px"
            py="10px"
          >
            <Input
              placeholder="Cari Aktivitas"
              variant="unstyled"
              width="70%"
              onChange={(e) => {
                setFilterState({
                  ...filterState,
                  activity: e.target.value,
                });
              }}
            />
            <Flex width="1px" background="#C0C0C0" />
            <Input
              ml="4"
              placeholder="Cari Lokasi"
              variant="unstyled"
              width="30%"
              onChange={(e) => {
                setFilterState({
                  ...filterState,
                  location: e.target.value,
                });
              }}
            />
            <SearchIcon m="auto" cursor="pointer" />
          </Flex>
        </Flex>

        <Flex flexDirection="row" px="8%" mb="10%">
          <Flex width="13%" flexDirection="column">
            <Text fontSize="xl" mb="3%" fontWeight="semibold">
              Filter
            </Text>
            <Text fontSize="lg" mb="1%" fontWeight="medium">
              Gender
            </Text>
            <Checkbox defaultChecked>Semua Gender</Checkbox>
            <Checkbox defaultChecked>Khusus laki - laki</Checkbox>
            <Checkbox defaultChecked>Khusus Perempuan</Checkbox>
          </Flex>

          <Flex width="8%" ml="10px">
            <Box width="4px" background="C0C0C0" />
          </Flex>

          <Flex width="80%" flexDirection="column">
            <Text fontSize="2xl" mb="2%" fontWeight="semibold">
              {`${filterText.activity} di ${filterText.location}`}
            </Text>

            <Flex flexDirection="row" flexWrap="wrap" gap={10}>
              {showData.map((ctx, idx) => (
                <Card
                  name={ctx.name}
                  creator={ctx.created_by.name}
                  location={ctx.location}
                  date={ctx.date}
                  time={ctx.start + " - " + ctx.finish}
                  participant={ctx.num_participants + " / " + ctx.max_participants}
                  picture={ctx.image}
                  key={idx}
                  gender={ctx.gender}
                  onClick={() => {
                    Router.push(`/event/${ctx.id}`);
                  }}
                />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
