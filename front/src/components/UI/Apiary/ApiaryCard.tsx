import { Apiary } from "@app/models/types/Apiary";
import { Paper, Title } from "@mantine/core";
import classes from '@app/styles/Apiary/ApiaryCard.module.scss';
import Link from "@app/components/Router/Link";
import { APIARY_ROOT_PATH } from "@app/paths";

interface ApiaryCardProps {
  apiary: Apiary
}

export default function ApiaryCard({ apiary }: ApiaryCardProps) {
  return <Paper
    component={Link}
    to={`${APIARY_ROOT_PATH}/${apiary.uid}`}
    px="md"
    bg="green"
    c="white"
    className={classes.card}
  >
    <Title order={3}>{apiary.name}</Title>
  </Paper>;
}
