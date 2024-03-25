import { Button, Group, Modal } from "@mantine/core";
import { UserForAdmin as User } from '@app/models/types/User.ts';

interface Props {
  opened: boolean;
  close: () => void;
  user: User;
  onSubmit: () => void;
}

export default function DeleteModal({
  opened,
  close,
  user,
  onSubmit,
}: Props){

  return (
    <>
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>ATTENTION Vous êtes bien sûr de vouloir <strong>SUPPRIMER {user.email}</strong> ?</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <Group>
              <Button color="green" onClick={close}>Annuler</Button>
              <Button color="red" onClick={
                () => {
                  onSubmit();
                  close();
                }
              }>Supprimer</Button>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
