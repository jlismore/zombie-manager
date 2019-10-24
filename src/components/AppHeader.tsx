import {
  Alignment,
  AnchorButton,
  Button,
  Classes,
  Menu,
  MenuItem,
  Navbar,
  Popover,
  Position
} from "@blueprintjs/core";
import React from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";

const StyledNavbar = styled(Navbar)`
  .bp3-popover-wrapper {
    display: none;
  }
  @media only screen and (max-width: 1200px) {
    .bp3-icon {
      display: none;
    }
  }
  @media only screen and (max-width: 975px) {
    .bp3-icon {
      display: initial;
    }
    .bp3-popover-wrapper {
      display: initial;
    }
    a.bp3-minimal {
      display: none;
    }
  }
`;

export const AppHeader = () => {
  const history = useHistory();
  const location = useLocation();
  const isActive = (href: string) => location.pathname.startsWith(href);
  const onSelect = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    history.push("/" + event.currentTarget.id);
  };
  const menu = (
    <Menu>
      <MenuItem
        id="dashboard"
        href="/dashboard"
        icon="dashboard"
        active={isActive("/dashboard")}
        text="Dashboard"
        onClick={onSelect}
      />
      <MenuItem
        id="location"
        href="/location"
        icon="office"
        active={isActive("/location")}
        text="Locations"
        onClick={onSelect}
      />
    </Menu>
  );
  return (
    <header>
      <StyledNavbar className={Classes.DARK}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Zombie Manager</Navbar.Heading>
          <AnchorButton
            id="dashboard"
            href="/dashboard"
            icon="dashboard"
            active={isActive("/dashboard")}
            minimal
            text="Dashboard"
            onClick={onSelect}
          />
          <AnchorButton
            id="location"
            href="/location"
            icon="office"
            active={isActive("/location")}
            minimal
            text="Locations"
            onClick={onSelect}
          />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Popover content={menu} position={Position.BOTTOM}>
            <Button icon="menu" />
          </Popover>
        </Navbar.Group>
      </StyledNavbar>
    </header>
  );
};
