import { faBroom, faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppShell, Burger, Group, NavLink, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const App = () => {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

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
            <Text
              style={{
                textDecoration: "underline",
              }}
            >
              Logout
            </Text>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        p="md"
        style={{
          backgroundColor: "#EFEFEF",
          gap: 10,
        }}
      >
        {data.map((item, index) => (
          <NavLink
            href="#required-for-focus"
            key={item.label}
            active={index === active}
            label={
              <Group>
                <FontAwesomeIcon icon={item.icon} />
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
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
