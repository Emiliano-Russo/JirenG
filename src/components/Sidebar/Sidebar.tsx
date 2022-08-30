import {
  AppstoreOutlined,
  DesktopOutlined,
  CloudDownloadOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Button, MenuProps, MenuTheme } from "antd";
import { Menu, Switch } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  theme?: "light" | "dark"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    theme,
  } as MenuItem;
}

interface Props {
  widthPx: number;
}

export const SideBar: React.FC<Props> = (props: Props) => {
  const [current, setCurrent] = useState("1");
  const nav = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "1":
        nav("/Store", { replace: true });
        break;
      case "2":
        nav("/Downloads", { replace: true });
        break;
      case "3":
        nav("/Installed", { replace: true });
        break;
    }
    setCurrent(e.key);
  };

  const items: MenuItem[] = [
    getItem(<a>Store</a>, "1", <AppstoreOutlined />),
    getItem(<a>Downloads</a>, "2", <CloudDownloadOutlined />),
    getItem(<a>Installed</a>, "3", <DesktopOutlined />),
  ];

  return (
    <Menu
      onClick={onClick}
      defaultOpenKeys={["sub1"]}
      selectedKeys={[current]}
      mode="vertical"
      theme="dark"
      items={items}
      inlineCollapsed={false}
      style={{
        width: props.widthPx.toString() + "px",
        minHeight: "100%",
        paddingTop: "50px",
      }}
    />
  );
};
