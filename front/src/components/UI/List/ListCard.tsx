import { Box, Paper, Title } from "@mantine/core";
import classes from '@app/styles/List/Card.module.scss';
import Link from "@app/components/Router/Link";
import { ReactElement, cloneElement } from "react";

interface ApiaryCardProps {
  title?: string
<<<<<<< HEAD
  link: string
=======
  path: string
>>>>>>> bb86e329af1e40c9175aacf3504b008ffde56f06
  icon: ReactElement
}

export default function ListCard(props: ApiaryCardProps) {
  return <Paper
    component={Link}
<<<<<<< HEAD
    to={props.link}
=======
    to={props.path}
>>>>>>> bb86e329af1e40c9175aacf3504b008ffde56f06
    px="md"
    bg="green"
    c="white"
    ta="center"
    className={classes.card}
  >
    <Box p={{ base: "sm", xs: "lg" }} className={classes['icon-container']}>
      {cloneElement(props.icon, { className: classes.icon })}
    </Box>
    {props.title &&
      <Title className={classes.title} py="xs" order={3}>{props.title}</Title>
    }
  </Paper>;
}
