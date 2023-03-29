import { useState } from "react";
import { Box, Container } from "@chakra-ui/react";

import { VideoBlock } from "components/organisms/VideoBlock";

export default function App() {
  const [isLoading, setLoading] = useState(true);

  return (
    <Box height="100vh" width="100%" bg="#F0EAE5">
      <Container display="flex" flexDir="column" alignItems="center" p={[2, 8]}>
        <Box maxW="720px">
          {isLoading && (
            <Box display="flex" justifyContent="center">
              Loading...
            </Box>
          )}
          <VideoBlock isLoading={isLoading} setLoading={setLoading} />
        </Box>
      </Container>
    </Box>
  );
}
