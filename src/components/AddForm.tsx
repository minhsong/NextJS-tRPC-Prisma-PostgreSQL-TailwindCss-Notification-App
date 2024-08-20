import { Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NotificationBaseType,
  NotificationType,
  NotificationTypeSchema,
  typeArray,
} from "../../types";
import { trpc } from "../../src/utils/trpc";

interface AddFormProps {
  onCloseCallback: () => void;
}

export default function AddForm({ onCloseCallback }: AddFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NotificationBaseType>({
    resolver: zodResolver(NotificationTypeSchema),
    defaultValues: {
      type: typeArray[0],
    },
  });
  const onSuccess = (data: NotificationType) => {
    onCloseCallback();
  };
  const createNotification = trpc.notifications.create.useMutation();

  const formSubmit = async (data: NotificationBaseType) => {
    try {
      await createNotification
        .mutateAsync(data)
        .then((data: NotificationType) => {
          onSuccess(data);
        })
        .catch((error: any) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const notiTypeWatch = watch("type");
  return (
    <Dialog.Root defaultOpen={true} open={true}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add notification</Dialog.Title>
        <Flex direction="column" gap="3">
          <form onSubmit={handleSubmit(formSubmit)}>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Type
              </Text>
              <Select.Root
                value={notiTypeWatch}
                onValueChange={(value) => setValue("type", value)}
              >
                <Select.Trigger>{notiTypeWatch}</Select.Trigger>
                <Select.Content>
                  {typeArray.map((type) => (
                    <Select.Item key={type} value={type}>
                      {type}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
              {errors.type && (
                <span className="text-red-500">{errors.type.message}</span>
              )}
            </label>
            {["Platform update"].includes(notiTypeWatch) && (
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Release Number
                </Text>
                <TextField.Root
                  {...register("releaseNumber", {
                    required: "This field is required",
                  })}
                />
                {errors.releaseNumber && (
                  <span className="text-red-500">
                    {errors.releaseNumber.message}
                  </span>
                )}
              </label>
            )}

            {["Join workspace", "Comment Tag", "Access granted"].includes(
              notiTypeWatch
            ) && (
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Sender
                </Text>
                <TextField.Root
                  {...register("sender", {
                    required: "This field is required",
                  })}
                />
                {errors.sender && (
                  <span className="text-red-500">{errors.sender.message}</span>
                )}
              </label>
            )}

            <div className="flex justify-end flex-row mt-4">
              <button
                type="button"
                onClick={onCloseCallback}
                className="bg-secondary-500 p-6 rounded-6 mr-6"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-primary-500 text-white p-6 rounded-6"
              >
                Create
              </button>
            </div>
          </form>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
