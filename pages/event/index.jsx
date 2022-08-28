import React, { useState, useEffect } from "react";

import {
  Stack,
  Text,
  Input,
  Flex,
  Box,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Card } from "../../common/components";
import { localEnv, serverEnv } from "../../common/constant/env";
import axios from "axios";
import Router from "next/router";
import Head from "next/head";

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
    gender: "2",
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
    let filteredData = data;

    if (filterState.activity !== "" && filterState.location !== "") {
      setFilterText({
        ...filterText,
        activity: `Hasil pencarian dari "${filterState.activity}"`,
        location: `${filterState.location}`,
      });

      filteredData = data.filter(
        (ctx) =>
          ctx.name
            .toLowerCase()
            .includes(filterState.activity.toLocaleLowerCase()) &&
          ctx.location
            .toLowerCase()
            .includes(filterState.location.toLocaleLowerCase())
      );
    } else if (filterState.activity !== "") {
      setFilterText({
        ...filterText,
        location: `semua lokasi`,
        activity: `Hasil pencarian dari "${filterState.activity}"`,
      });

      filteredData = data.filter((ctx) =>
        ctx.name
          .toLowerCase()
          .includes(filterState.activity.toLocaleLowerCase())
      );
    } else if (filterState.location !== "") {
      setFilterText({
        ...filterText,
        activity: `Semua aktivitas`,
        location: `${filterState.location}`,
      });

      filteredData = data.filter((ctx) =>
        ctx.location
          .toLowerCase()
          .includes(filterState.location.toLocaleLowerCase())
      );
    } else {
      setFilterText({
        ...filterText,
        activity: `Semua aktivitas`,
        location: `semua lokasi`,
      });
    }

    // Filtering by gender
    filteredData = filteredData.filter((ctx) => {
      switch (filterState.gender) {
        case "2":
          return true;
        default:
          return ctx.gender == filterState.gender;
      }
    });

    setShowData(filteredData);
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
    <>
      <Head>
        <title>TemanRaga - Events</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex flexDirection="column">
        <Flex flexDirection="column" p="0px">
          <Flex flexDirection="column" px={{base: "8%" , lg:"18%"}} py={{ base: "36px", lg: "5%" }}>
            <Text
              fontSize="3xl"
              textAlign="center"
              mb="2%"
              fontWeight="semibold"
            >
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
            </Flex>
          </Flex>

          <Flex flexDirection={{ base: "column", lg: "row" }} px="8%" mb="10%">
            <Flex
              width={{ base: "100%", lg: "13%" }}
              mb={{ base: "48px", lg: null }}
              flexDirection="column"
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                mb={{ base: "4px", lg: "3%" }}
                fontWeight="semibold"
              >
                Filter
              </Text>
              <Text fontSize="lg" mb="1%" fontWeight="medium">
                Gender
              </Text>
              <RadioGroup
                defaultValue="2"
                onChange={(val) => {
                  setFilterState({
                    ...filterState,
                    gender: val,
                  });
                }}
              >
                <Stack direction={{ base: "row", lg: "column" }} flexWrap="wrap">
                  <Radio value="2">Semua Gender</Radio>
                  <Radio value="0">Laki - Laki</Radio>
                  <Radio value="1">Perempuan</Radio>
                </Stack>
              </RadioGroup>
            </Flex>

            <Flex w={{base:"0%", lg: "8%"}} ml="10px">
              <Box width="4px" />
            </Flex>

            <Flex width={{ base: "100%", lg: "80%" }} flexDirection="column" alignItems={{base:"center", lg: "flex-start"}}>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                mb="24px"
                fontWeight="semibold"
              >
                {`${filterText.activity} di ${filterText.location}`}
              </Text>

              <Flex
                flexDirection="row"
                flexWrap="wrap"
                gap={6}
                justifyContent={{ base: "space-between", lg: "flex-start" }}
              >
                {showData.map((ctx, idx) => (
                  <Box key={idx} m={{base:"auto", lg: "inherit"}}>
                    <Card
                      name={ctx.name}
                      creator={ctx.created_by.name}
                      location={ctx.location}
                      date={ctx.date}
                      time={ctx.start + " - " + ctx.finish}
                      participant={
                        ctx.num_participants + " / " + ctx.max_participants
                      }
                      picture={ctx.image}
                      gender={ctx.gender}
                      onClick={() => {
                        Router.push(`/event/${ctx.id}`);
                      }}
                    />
                  </Box>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
