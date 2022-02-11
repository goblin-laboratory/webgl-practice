import React from "react";
import { Typography, Card } from "antd";
// import styles from "./index.module.less";

function Home() {
  return (
    <Card>
      <Typography>
        <Typography.Title>WebGL 练习</Typography.Title>
        <Typography.Paragraph>
          {/* In the process of internal desktop applications development, many
          different design specs and implementations would be involved, which
          might cause designers and developers difficulties and duplication and
          reduce the efficiency of development. */}
        </Typography.Paragraph>

        <Typography.Paragraph>
          <ul>
            <li>
              <Typography.Link href="https://webglfundamentals.org/">
                WebGL 理论基础 (https://webglfundamentals.org)
              </Typography.Link>
            </li>
            <li>
              <Typography.Link href="https://sites.google.com/site/webglbook/home/">
                WebGL 编程指南 (https://sites.google.com/site/webglbook/home)
              </Typography.Link>
            </li>
          </ul>
        </Typography.Paragraph>
      </Typography>
    </Card>
  );
}

export default React.memo(Home, () => true);
