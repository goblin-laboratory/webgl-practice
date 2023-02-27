import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import styles from "./index.module.less";

function App() {
  const navigate = useNavigate();
  const onClick = React.useCallback(
    ({ key }) => {
      console.log(`onClick: ${key}`);
      navigate(key);
    },
    [navigate]
  );
  return (
    <Layout className={styles.site}>
      <Layout.Sider collapsible className={styles.siteSider}>
        <div className={styles.siteLogo}>WebGL 练习</div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["/"]}
          mode="inline"
          onClick={onClick}
        >
          <Menu.Item key="/">首页</Menu.Item>
          <Menu.SubMenu key="three" title="Three.js">
            <Menu.Item key="/three/hello-world">Hello World</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="point" title="绘制点">
            <Menu.Item key="/draw-point">绘制点</Menu.Item>
            <Menu.Item key="/multi-point">多个点</Menu.Item>
            <Menu.Item key="/multi-attr-point">共用 Buffer</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="/draw-triangle">三角形</Menu.Item>
          <Menu.SubMenu key="quad" title="矩形">
            <Menu.Item key="/draw-rectangle">绘制矩形</Menu.Item>
            <Menu.Item key="/multi-rectangle">多个矩形</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="/draw-image">图片</Menu.Item>
          <Menu.SubMenu key="video" title="视频">
            <Menu.Item key="/draw-video">绘制视频</Menu.Item>
            <Menu.Item key="/multi-video">多个视频</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Sider>
      <Layout className={styles.siteLayout}>
        <Layout.Content className={styles.siteContent}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default React.memo(App, () => true);
