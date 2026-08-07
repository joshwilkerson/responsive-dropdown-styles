import { Flex } from "@planningcenter/tapestry"

import { Toolbar } from "./Toolbar"
import { Frame } from "./Frame"

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" gap={4} padding={3} style={{ overflow: "auto" }}>
      {children}
    </Flex>
  )
}

const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex gap={3} style={{ minWidth: "min-content" }}>
      {children}
    </Flex>
  )
}

export const App = () => {
  return (
    <>
      <Toolbar title="Tapestry/Dropdown" />

      <Container>
        <Row>
          <Frame label="Default" width={620} component="ActionsMenu" />
          <Frame
            label="Adjusted for mobile"
            width={380}
            component="ActionsMenu"
          />
          <Frame
            label="Mobile + Liquid Glass styles"
            width={380}
            component="ActionsMenu"
            supportsLiquidGlass
          />
        </Row>
        <Row>
          <Frame label="Default" width={620} component="ContactMenu" />
          <Frame
            label="Adjusted for mobile"
            width={380}
            component="ContactMenu"
          />
          <Frame
            label="Mobile + Liquid Glass styles"
            width={380}
            component="ContactMenu"
            supportsLiquidGlass
          />
        </Row>
      </Container>
    </>
  )
}
