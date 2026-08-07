import { Flex } from "@planningcenter/tapestry"

import { Toolbar } from "./Toolbar"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
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
      <Toolbar title="Tapestry/Dropdown" rightContent={<ColorModeSwitcher />} />

      <Container>
        <Row>
          <Frame label="Default" width={620} component="ActionsMenu" />
          <Frame
            label="Adjusted for mobile"
            width={380}
            component="ActionsMenu"
          />
        </Row>
        <Row>
          <Frame label="Default" width={620} component="ContactMenu" />
          <Frame
            label="Adjusted for mobile"
            width={380}
            component="ContactMenu"
          />
        </Row>
      </Container>
    </>
  )
}
