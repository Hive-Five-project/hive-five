import { Box, Paper, Title } from "@mantine/core";
import classes from '@app/styles/List/Card.module.scss';
import Link from "@app/components/Router/Link";
import { ReactElement, cloneElement } from "react";

interface ApiaryCardProps {
  title?: string
  path: string
  icon: ReactElement
  colorInverted?: boolean
}

export default function ListCard(props: ApiaryCardProps) {
  return <Paper
    component={Link}
    to={props.path}
    px="md"
    ta="center"
    className={classes.card + ' ' + ((props.colorInverted ?? false) ? classes.inverted : '')}
  >
    <Box
      p={{ base: "sm", xs: "lg" }}
      className={classes['icon-container']}
    >
      {cloneElement(props.icon, { className: classes.icon })}
    </Box>
    {props.title &&
      <Title className={classes.title} py="xs" order={3}>{props.title}</Title>
    }
  </Paper>;
}
