import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDefinition,
  faArrowLeft,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  previousPath: string
  buttons?: Array<{
    text: string
    icon: IconDefinition
    path: string
    color?: string
  }>
}

export default function TopNavigationMenu({ previousPath, buttons }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const buttonBaseStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  };

  return (
    <Flex
      py="md"
      px={0}
      justify="space-between"
      align="center"
    >
      <Link to={previousPath}>
        <Box bg="green" p="sm" c="white" style={buttonBaseStyle}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Box>
      </Link>
      {buttons != null && buttons.length > 0
        && <>
          <Button onClick={open} bg="green" p="sm" c="white" style={buttonBaseStyle}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </Button>
          <Modal opened={opened} onClose={close} withCloseButton={false} centered>
            {buttons.map(({ text, icon, path, color }, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <Divider my="xs" />}
                <Button
                  leftSection={<FontAwesomeIcon icon={icon} />}
                  variant="subtle"
                  component={Link}
                  to={path}
                  w="100%"
                  color={color ?? "default"}
                >
                  {text}
                </Button>
              </React.Fragment>
            ))}
          </Modal>
        </>
      }
    </Flex>
  );
}
