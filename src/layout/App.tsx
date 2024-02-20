import { AppShell, Burger, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const App = () => {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const data = [
    { label: "Dashboard" },
    {
      label: "Requests",
    },
    {
      label: "CustodianRequests",
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
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {data.map((item, index) => (
          <NavLink
            href="#required-for-focus"
            key={item.label}
            active={index === active}
            label={item.label}
            onClick={() => {
              setActive(index);
              navigateToPage(item.label.toLowerCase());
            }}
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
