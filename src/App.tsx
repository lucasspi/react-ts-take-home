import { useState } from "react";
import { Box, Container, Spinner } from "@chakra-ui/react";

import { VideoBlock } from "./components/VideoBlock";

export default function App() {
  const [isLoading, setLoading] = useState(true);

  return (
    <Box height="100vh" width="100%" bg="#F0EAE5">
      <Container display="flex" flexDir="column" alignItems="center" p={[2, 8]}>
        <Box maxW="720px">
          {isLoading && <Spinner size="xl" />}
          <VideoBlock isLoading={isLoading} setLoading={setLoading} />
        </Box>
      </Container>
    </Box>
  );
}
