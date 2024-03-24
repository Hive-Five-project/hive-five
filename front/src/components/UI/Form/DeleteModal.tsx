import { Button, Group, Modal } from "@mantine/core";
import { UserForAdmin as User } from '@app/models/types/User.ts';
import { trans } from '@app/translations';

interface Props {
  opened: boolean
  close: () => void
  user: User
  onSubmit: () => void
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
            <Modal.Title>{trans('pages.admin.user.form.warning')} <strong>{user.email}</strong></Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <Group>
              <Button color="green" onClick={close}>{trans('common.actions.cancel')}</Button>
              <Button color="red" onClick={
                () => {
                  onSubmit();
                  close();
                }
              }>{trans('common.actions.delete')}</Button>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
