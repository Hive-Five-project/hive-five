import { Box, Paper, Title } from "@mantine/core";
import classes from '@app/styles/List/Card.module.scss';
import Link from "@app/components/Router/Link";
import { ReactElement, cloneElement } from "react";

interface ApiaryCardProps {
  title?: string
  link: string
  icon: ReactElement
}

export default function ListCard(props: ApiaryCardProps) {
  return <Paper
    component={Link}
    to={props.link}
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
