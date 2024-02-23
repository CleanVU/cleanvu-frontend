import { UserButton, useUser } from "@clerk/clerk-react";
import { faBroom, faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Title,
  Text,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const App = () => {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { user } = useUser();

  const data = [
    { label: "Dashboard", link: "/dashboard", icon: faHome },
    {
      label: "Requests",
      link: "/requests",
      icon: faEnvelope,
    },
    {
      label: "C Requests",
      link: "/custodian-requests",
      icon: faBroom,
    },
  ];

  const navigateToPage = (path: string) => {
    navigate(path);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      style={{
        backgroundColor: "#EFEFEF",
      }}
    >
      <AppShell.Header
        style={{
          border: 0,
        }}
      >
        <Group
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            padding: "0 30px",
          }}
        >
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group>
            <Title order={1} fw={500}>
              CleanVU
            </Title>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        p="md"
        style={{
          backgroundColor: "#EFEFEF",
          gap: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack w={"100%"} gap={10}>
          {data.map((item, index) => (
            <NavLink
              href="#required-for-focus"
              key={item.label}
              active={index === active}
              w={"100%"}
              label={
                <Group w={"100%"}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{
                      paddingBottom: "2px",
                    }}
                  />
                  <Title order={6} fw={600}>
                    {item.label}
                  </Title>
                </Group>
              }
              onClick={() => {
                setActive(index);
                navigateToPage(item.link);
              }}
              fw={600}
              style={{
                borderRadius: 10,
              }}
            />
          ))}
        </Stack>
        <Group
          pb={20}
          w={"100%"}
          style={{
            display: "flex",
            gap: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserButton />
          <Stack
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            gap={0}
          >
            <Title order={6}>{user?.fullName}</Title>
            <Text size={"xs"}>{user?.primaryEmailAddress?.emailAddress}</Text>
          </Stack>
        </Group>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
