import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Label } from './ContactForm.styled';

const schema = yup.object({
  name: yup.string().required('Name is required').trim(),
  phone: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required('A phone number is required'),
});

export const ContactForm = ({ addContact }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    const isExistingContact = addContact(data);
    if (isExistingContact) {
      return;
    }
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        Name
        <input {...register('name')} />
        <p>{errors.name?.message}</p>
      </Label>
      <Label>
        Phone
        <input {...register('phone')} />
        <p>{errors.phone?.message}</p>
      </Label>
      <button type="submit">Add contact</button>
    </Form>
  );
};
